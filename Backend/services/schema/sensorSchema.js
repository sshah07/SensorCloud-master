
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

autoIncrement.initialize(connection);


var sensors= new Schema({
        sensorId : {
            type : String
        },
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

var Sensors = mongoose.model('Sensors', sensors);
sensors.plugin(autoIncrement.plugin, {
    model: 'Sensors',
    field: 'sensorId',
    startAt: 1,
    incrementBy: 1
});

module.exports = Sensors;