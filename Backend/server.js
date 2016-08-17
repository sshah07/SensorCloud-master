var amqp = require('amqp'), util = require('util');

var sensorAdmin = require('./services/sensors');
var endUser = require('./services/endUser');
var bills = require('./services/bills');


var cnn = amqp.createConnection({
    host : '127.0.0.1'
});

var mongoose = require('mongoose');
//var options = {
//	server: { poolSize: 5 }
//};
var connection = mongoose.connect("mongodb://localhost:27017/sensorCloud");

cnn.on('ready', function() {


    cnn.queue('sensorAdmin_queue', function (q) {
        console.log("listening on sensorAdmin_queue");

        q.subscribe(function (message, headers, deliveryInfo, m) {
            console.log("sub");
            util.log("sensorAdmin_queue: ");
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

            switch (message.func) {
                case "loginCheckSensorAdmin":
                    console.log('login sensor admin');
                    sensorAdmin.loginSensorAdmin(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "addSensorData":
                    console.log('add sensor data');
                    sensorAdmin.addSensorData(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;
                case "listSensors":
                    console.log('List sensor data');
                    sensorAdmin.listSensors(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;
                case "activateSensor":
                    console.log('Activate sensor');
                    sensorAdmin.activateSensor(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "deactivateSensor":
                    console.log('login sensor admin');
                    sensorAdmin.deactivateSensor(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;


                case "deleteSensor":
                    sensorAdmin.deleteSensor(message, function (err, res) {
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "approveCustomer":
                    sensorAdmin.approveCustomer(message, function (err, res) {
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
            }
        });
    });
    cnn.queue('endUser_queue', function (q) {

        console.log("listening on endUser_queue");
        q.subscribe(function (message, headers, deliveryInfo, m) {
            console.log("sub");
            util.log("endUser_queue: ");
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

            switch (message.func) {
                case "registerUser":

                    endUser.registerUser(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;
                case "loginCheckUser":

                    endUser.loginCheckUser(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "listActiveSensors":

                    endUser.listActiveSensors(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "subscribeSensor":

                    endUser.subscribeSensor(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;
                case "unsubscribeSensor":

                    endUser.unsubscribeSensor(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "listToSubscribeSensors":

                    endUser.listToSubscribeSensors(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
                    break;

                case "mySensors":

                    endUser.mySensors(message, function (err, res) {

                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });

                case "myBills":

                    console.log("case My bills");
                    bills.myBills(message, function (err, res) {

                        console.log("into mybills function server");
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                        });
                    });
            }

            });
        });
});
