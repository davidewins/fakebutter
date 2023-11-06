const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const bcrypt = require('bcryptjs')
const Place = require('./models/Place')
const Booking = require('./models/Booking')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
const User = require('../api/models/User')
require('dotenv').config()
const app = express()

const jwtSecret = 'g3434g3V$£tg3CewvvdssS'
const photosMiddleware = multer({dest: 'uploads/'})
const bcryptSalt = bcrypt.genSaltSync(12)
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

mongoose.connect(process.env.MONGO_URL)
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) {
                throw err;
            } 
            resolve(userData);
    })
})
}

app.get('/', (req, res) => {
    res.send('heya')
})


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err; // Handle error properly
            } else {
                const { name, email, id } = await User.findById(userData.id);
                res.json({ name, email, _id: id }); // Send the user response
            }
        });
    } else {
        res.json(null); // Send the null response
    }
});


app.get('/test', (req, res) => {
    res.json('poopoo peepee')
})

// REGISTER
app.post('/register' , async (req, res) => {
    const {name, email, password} = req.body

    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        }) 
        res.json(userDoc)
    } 
 
    
    catch (e) {
        res.status(422).json(e);
    }

})

// LOGIN
app.post('/login' , async (req, res) => {
    const {email, password} = req.body
    const userDoc = await User.findOne({email})

    if(userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({email:userDoc.email, id:userDoc._id, name:userDoc.name}, jwtSecret, {}, (err, token) => {
                if(err) { throw err;}
                res.cookie('token', token).json(userDoc)
            })

        } else { res.status(422).json("Wrong password")}

    } else {
        res.json('not found')
    }

});

// LOGOUT
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})


// UPLOAD PHOTOS LINK
app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg'

    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });

    res.json(newName)


})




app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;

        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }

    // Now, send a single response with all the uploaded filenames
    res.json(uploadedFiles);
});


app.put('/places', async (req, res) => {
    const {token} = req.cookies;
    const { id, title,address,addedPhotos,description,price, perks,extraInfo,checkIn,checkOut,maxGuests } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos:addedPhotos, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests, price
            });
            placeDoc.save();
            res.json('ok')
        }
    })

})

app.get('/places', async (req, res) => {
    res.json( await Place.find())
})

app.post('/places', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,price,
      perks,extraInfo,checkIn,checkOut,maxGuests
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,price,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });
      res.json(placeDoc);
    });
  });
  

app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const  {id} = userData;
        res.json( await Place.find({owner:id}) )
    })


})

app.get('/places/:id',async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id))
})


app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price
    } = req.body;

  Booking.create({
    place,checkIn,checkOut,numberOfGuests,name,phone,price, user: userData.id
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
})

 
app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    res.json( await Booking.find({user:userData.id}).populate('place') )
})

app.listen(3000, (req, res) => {
    console.log('Server started on port 3000');
})
