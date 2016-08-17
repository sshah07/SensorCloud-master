
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


var demo = new Schema({

        name : String,
        desc : String,

    },
    {
        _id : true
    });

var Demo = mongoose.model('Demo', demo);


module.exports = Demo;