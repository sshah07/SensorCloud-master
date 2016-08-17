
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/sensorCloud');
var db = mongoose.connection;


db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');


var admin = new Schema({
        username : String,
        password : String
    },
    {
        _id : true
    });

var Admin = mongoose.model('Admin', admin);

module.exports = Admin;