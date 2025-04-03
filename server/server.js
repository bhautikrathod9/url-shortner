require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const app = express();

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" })); 

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("the database is connected ")
}).catch((err) => {
    console.log("Database connection error: ", err)
})

const URL = require('./models/Url.js')

app.get('/', (req, res) => {
    res.send("api is working")
})

app.post('/shorten', async(req, res) => {
    const { longUrl } = req.body;
    const shortId = nanoid(7);

    const url = new URL({
        longUrl, 
        ShortUrl: shortId
    })
    await url.save();
    
    res.json({ shortUrl : `${process.env.BASE_URL}/${shortId}`})
})

app.get('/:shortUrl', async(req, res) => {
    const url = await URL.findOne({
        ShortUrl: req.params.shortUrl
    })

    if(url){
        res.redirect(url.longUrl)
    }else{
        res.status(404).json({
            error : "URL not found"
        })
    }
})

app.listen(PORT, () => {
    console.log(`app is listning at port number ${PORT}`)
})