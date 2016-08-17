var sensorSchema = require('./schema/sensorSchema');
var subscribeSensorSchema = require('./schema/subscribeSensorSchema');


exports.loginSensorAdmin = function (msg, callback) {

    var username = msg.username;
    var password = msg.password;
    console.log("into the loginSensorAdmin queue response");

    var json_responses;

        if (username == "admin" && password == "admin") {

            json_responses = {"status" : 200, "data": username};
        }
        else {
            json_responses = {"status" : 400};
        }
        callback(null, json_responses);
    }

exports.addSensorData = function(msg, callback){

    console.log("here I am");

    var name = msg.name;
    var desc = msg.desc;
    var owner = msg.owner;
    var to = msg.to;
    var from = msg.from;
    var type = msg.type;
    var format = msg.format;
    var city = msg.city;
    var state = msg.state;



    console.log(name + " " + desc + " " + owner + " " + to + " " + from + " " + type + " " + format + " " + city + " " + state);
    var sensorData = new sensorSchema({

        name : name,
        desc : desc,
        owner : owner,
        to : to,
        from : from,
        type : type,
        format : format,
        city : city,
        state : state,
        status : false

    });

    sensorData.save(function(err) {
    console.log("Inside the save function");
    var json_responses;
    if (err) {
        console.log(err);
        json_responses = { "status" : 400};
    }

    else {
        console.log('New sensor added !');

        json_responses = {"status" : 200};

    }
        callback(null, json_responses);
});

}



exports.listSensors = function(msg, callback) {


    sensorSchema.find({}, function (err, users) {

        console.log("inside");
        var json_responses;
        if (err) {

            json_responses = {"status": 400};

        }

        else {
            if (users) {
                //console.log(users.name+" "+users.type+" "+users.location);
                json_responses = {"status": 200, "data": users};

            }
            else {
                console.log("No sensors found !");
                json_responses = {"status": 300};

            }
        }
        callback(null, json_responses);
    });
}

exports.activateSensor = function(msg, callback) {

    var name = msg.name;
    console.log("sensor name is "+name);
    sensorSchema.update({name: name}, {$set:{status : true}}, function (err, users) {
        var json_response;
        console.log("-------------updated----------");
        console.log(JSON.stringify(users));
        if (err)
            json_response = {"status": 400};
        else {
            if (users){
                json_response = {"status": 200, "data": users};
                //subscribeSensorSchema.find({}, function (err, user) {


                /*subscribeSensorSchema.insert({"status" : users.status,"state":users.state, "format" : users.format, "from": users.from, "to": users.to, "name" : users.name, "desc" : users.desc, "city":users.city, "owner" : users.owner, "type" : users.type }, function(err, user){
                    if(err){
                        console.log("error");
                    }
                    else
                        console.log("saras");
                });*/

            }

            else
                json_response = {"status": 300};
        }
        callback(null, json_response);
    });
}

exports.deactivateSensor = function(msg, callback) {

    var name = msg.name;
    console.log("sensor name is for deactivate"+name);
    sensorSchema.update({name: name}, {$set:{status : false}}, function (err, users) {
        var json_response;
        console.log(JSON.stringify(users));
        if (err)
            json_response = {"status": 400};
        else {
            if (users)
                json_response = {"status": 200, "data": users};
            else
                json_response = {"status": 300};
        }
        callback(null, json_response);
    });
}



