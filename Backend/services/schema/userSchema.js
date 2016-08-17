
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


var users= new Schema({
        userId : {
            type : String
        },
        fullname : String,
        email : String,
        password : String,
        creditcard : String,
        city : String,
        state : String,
        zipcode : String,
        phone : String,
        subscribedSensors : { type: Array, default: [] }

},
    {
        _id : true
    });

var Users = mongoose.model('Users', users);
users.plugin(autoIncrement.plugin, {
    model: 'Users',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});

module.exports = Users;