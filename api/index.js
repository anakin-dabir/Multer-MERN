import express from 'express'
import config from './config/config'
import cors from 'cors'
import connectDb from './db';
import mongoose from 'mongoose';
import multer from 'multer'
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userSchema = new mongoose.Schema({
    name: String,
    img: String
});

const User = mongoose.model('User', userSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './photos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('image')

app.use('/photos', express.static('photos'));

app.post('/addPic', upload, async (req, res) => {
    console.log(req.file);
    const user = new User({
        name: 'jarvis',
        img: req.file.originalname
    })
    try {
        await user.save();
        return res.status(200).json({ msg: `File uploaded ${req.file.originalname}`, file: req.file })
    }
    catch (err) {
        return res.status(500).json({ msg: 'Error' });
    }
})



















connectDb(config.mongoUri, config.options);

app.listen(config.port, () => {
    console.log(`Server on http://localhost:${config.port}`);
})