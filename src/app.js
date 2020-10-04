const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();

require('./database');

// Settings
app.set('port', process.env.PORT | 3300);
const corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
}

// Middlewares
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

// Routes
app.use(require('./routes/recipes.routes'));
app.use(require('./routes/products.routes'));


module.exports = app;