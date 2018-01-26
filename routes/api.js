const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cryptowatcherdb');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection error:'));
db.once('open',function(){
   console.log('Connection to mongodb is up');     
});
var userSchema = mongoose.Schema({name: String});
var User = mongoose.model('users',userSchema);

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};
// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};


//TODO: display all users
router.get('/users',function(req,res){
    User.find(function(err,data){
        if(err)sendError(err,res);
        else{
            response.data = data;
            response.message = 'Success';
            response.status = 200;
            res.status(200).json(response);
        }
        });
});

module.exports = router;