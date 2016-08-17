
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


var subscribeSensor = new Schema({

        name : String,
        desc : String,
        format : String,
        owner : String,
        type : String,
        status : Boolean,
        from : String,
        to : String,
        city : String,
        state : String
    },
    {
        _id : true
    });

var SubscribeSensor = mongoose.model('SubscribeSensor', subscribeSensor);


module.exports = SubscribeSensor;