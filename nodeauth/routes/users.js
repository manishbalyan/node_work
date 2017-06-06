var express = require('express');
var router = express.Router();

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

router.post('/users/register', function (req, res,next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;



// check for image
    if(req.files.profileimage){
      var profileImageOriginalName = req.files.profileimage.originalname;
      var profileImageName = req.files.profileimage.name;
      var profileImageMime = req.files.profileimage.mimetype;
      var profileImagePath = req.files.profileimage.path;
      var profileImageExt = req.files.profileimage.extension;
      var profileImageSize = req.files.profileimage.size;

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
    req.checkBody('password2', "password does not match").equal(req.body.password);

    var errors = req.validiationErrors();

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
          req.flash("success","you are registered please login")
          res.location('/');
          res.redirect();

      })

    }

});

module.exports = router;
