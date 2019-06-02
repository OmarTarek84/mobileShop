const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const graphQlHttp = require("express-graphql");
const rootSchema = require('./graphql/schema/schema');
const allResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const multer = require('multer');
const path = require('path');
const compression = require('compression');
// const passport = require('passport');
// const passportSetup = require('./passport');
const morgan = require('morgan');
// const jwt = require('jsonwebtoken');

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    cb(null, name + '-' + Math.floor(Math.random() * 100000000000) + '.' + extension);
  }
});

app.use(compression());
app.use(morgan('common'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(multer({storage: fileStorage}).single('pic'));
app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
}
  next();
});

app.put('/post-image', (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  return res
    .status(201)
    .json({ message: 'File stored.', filePath: req.protocol + '://' + req.get('host') + '/' + req.file.path });
});

app.use(isAuth);

// app.post('/oauth/google', passport.authenticate('googleToken', {session: false}), (req, res, next) => {
//   const token = jwt.sign({
//     userId: req.user._id,
//   }, process.env.JWT_SECRET, {
//     expiresIn: '1h'
//   });
//   return res.status(201).json({token: token, firstname: req.user.firstname, userId: req.user.googleId});
// });

app.use('/graphql', graphQlHttp({
  schema: rootSchema,
  rootValue: allResolvers,
  graphiql: true
}));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PASS +
      "@cluster1-tmn4p.mongodb.net/" +
      process.env.DATABASE
  )
  .then(result => {
    const server = app.listen(process.env.PORT || 8080);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('connected');
    });
  })
  .catch(err => {
    console.log(err);
  });