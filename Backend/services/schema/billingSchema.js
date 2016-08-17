
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


var bills= new Schema({
        billId : {
            type : String
        },
        user : String,
        to : String,
        from : String,
        sensor : String,
        amount : String
    },
    {
        _id : true
    });

var Bills = mongoose.model('Bills', bills);
bills.plugin(autoIncrement.plugin, {
    model: 'Bills',
    field: 'billId',
    startAt: 1,
    incrementBy: 1
});

module.exports = Bills;