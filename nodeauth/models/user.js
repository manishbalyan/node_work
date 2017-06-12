/**
 * Created by consultadd on 8/6/17.
 */
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/nodeauth")
var db = mongoose.connection;
var bcrypt = require('bcrypt')

var userSchema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    profileimage:{
        type:String
    }

})

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser,callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    })
}