var express = require('express');
var router = express.Router();
var multer = require('multer');
var User = require('../models/user');
var flash = require('connect-flash');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

var uploads = multer({dest: './uploads'});

router.post('/register', uploads.single('profileimage'), function (req, res,next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;



// check for image
    if(req.file){
      var profileImageOriginalName = req.file.profileimage.originalname;
      var profileImageName = req.file.profileimage.name;
      var profileImageMime = req.file.profileimage.mimetype;
      var profileImagePath = req.file.profileimage.path;
      var profileImageExt = req.file.profileimage.extension;
      var profileImageSize = req.file.profileimage.size;

    }
    else {
      var profileImageName = 'noimage.png';

    }

    // form validiation
    req.checkBody('name', "Name field is required").notEmpty();
    req.checkBody('email', "Email field is required").notEmpty();
    req.checkBody('email', "Email not valid").isEmail();
    req.checkBody('username', "username field is required").notEmpty();
    req.checkBody('password', "password field is required").notEmpty();
    req.checkBody('password2', "password does not match").equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
      res.render('register', {
          errors:errors,
          name:name,
          email:email,
          username:username,
          password:password,
          password2:password2
      })

    }
    else{
      var newUser = new User({
          name:name,
          email:email,
          username:username,
          password:password,
          profileImageName:profileImageName
      });

      User.createUser(newUser,function (err,user) {
          if(err){
            throw err;
          }
      });

      req.flash("success","you are registered please login")
      res.location('/');
      res.redirect('/');

    }

});

module.exports = router;
