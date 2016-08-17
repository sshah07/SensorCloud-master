var userSchema = require('./schema/userSchema');
var sensorSchema = require('./schema/sensorSchema');
var billingSchema = require('./schema/billingSchema');
var subscribeSensorSchema = require('./schema/subscribeSensorSchema');

exports.registerUser = function (msg, callback) {

    var fullname = msg.fullname;
    var email = msg.email;
    var password = msg.password;

    var creditcard = msg.creditcard;
    var city = msg.city;
    var state = msg.state;
    var zipcode = msg.zipcode;
    var phone = msg.phone;

    console.log(fullname+" "+email+" "+password+" "+creditcard+" "+city+" "+state+" "+zipcode+" "+phone);

    var newUser = new userSchema({

        fullname : fullname,
        email : email,
        password : password,
        creditcard : creditcard,
        city : city,
        state : state,
        zipcode : zipcode,
        phone : phone
    });

    newUser.save(function(err) {
        var json_responses;
        if (err) {
            console.log(err);
            json_responses = { "status" : 400};
        }

        else {
            console.log('New User created!');

            json_responses = {"status" : 200};

        }
        callback(null, json_responses);
    });

}


exports.loginCheckUser = function (msg, callback) {
    var email = msg.email;
    var password = msg.password;

    userSchema.findOne({email: email, password: password}, function (err, users) {

        var json_resp;

        if (err) {
            console.log(err);
            json_resp = {"status" : 400};

        }

        else {
            if (users) {

                console.log('Login successful');
                json_resp = {"status": 200, "data":users.email};

            }
            else {
                console.log("No user found !");
                json_resp = {"status": 300};

            }
        }
        callback(null, json_resp);
    });

}

exports.listActiveSensors = function (msg, callback) {

    console.log('Rabbitmq listsensors');
    sensorSchema.find({status:true}, function (err, users) {

        var json_resp;


        if (err) {
            console.log(err);
            json_resp = {"status" : 400};

        }

        else {
            console.log("sensors found"+ JSON.stringify(users));

            json_resp = {"status": 200, "data":users};

        }
        callback(null, json_resp);
    });

}
exports.subscribeSensor = function (msg, callback) {

    var email = msg.email;
    var name = msg.name;
    console.log("jordar data is "+email+" "+name);


    sensorSchema.find({name:name}, function (err, users) {
        var json_resp;

        var result = users;
        console.log("Specific info of sensor "+result);

        if(users) {
            userSchema.update({email: email}, {$push : {subscribedSensors:{$each: result}}}, function (err, users2) {


                if (err) {
                    console.log(err);
                    json_resp = {"status": 400};

                }

                else {
                    var newBill = new billingSchema({

                        user: email,
                        from: new Date(),
                        to: null,
                        sensor: name,
                        amount: null
                    });

                    newBill.save(function(err) {

                        console.log(err)
                        if(!err){
                            sensorSchema.find({"status": true}, function (err, users) {
                                var json_resp;
                                if (users) {

                                    console.log("sensors found" + JSON.stringify(users));

                                    json_resp = {"status": 200, "data": users};
                                }
                                console.log("After starting the bill, sending data "+JSON.stringify(json_resp));
                                callback(null, json_resp);
                            })

                        }
                        else{
                            console.log("error staring bill process");
                        }
                    });
                }

            });
        }

        else{

            console.log("nothing found ! ");

        }

    });

}



exports.unsubscribeSensor = function (msg, callback) {

    var email = msg.email;
    var name = msg.name;
    console.log("Unsubscribing... "+email+" "+name);


    sensorSchema.find({name:name}, function (err, users) {
        var json_resp;

        var d = new Date();
        var result = users;

        var amount;

            var type = users[0].type;
            console.log("Finding the bill"+JSON.stringify(users)+"type is"+ users[0].type);
            if (type == "Free") {
                var amount = 0;
            }
            else if (type == "Starter") {
                var amount = 1;


            }
            else if (type == "Medium") {
                var amount = 5;
            }
            else {
                var amount = 20;
            }


        if(users) {
            userSchema.update({},{$pull:{subscribedSensors:{name  : name}}},{multi:true}, function (err, users2) {


                if (err) {
                    console.log(err);
                    json_resp = {"status": 400};

                }

                else {

                    console.log("updating...where user"+email+" and name is "+name+ "amount is "+amount);
                    billingSchema.update({sensor: name, user: email},{$set: {to: new Date(), amount : amount}},function(err, users){
                        if(users) {
                            console.log("billing schema updated");
                            userSchema.find({"email": email}, function (err, users) {
                                if (users[0].subscribedSensors.length>0) {

                                    console.log("Rest is found " + JSON.stringify(users));

                                    json_resp = {"status": 200, "data": users};
                                }
                                else{
                                    json_resp = {"status" : 400};
                                }
                                callback(null, json_resp);
                            })
                        }
                    })
                }

            });
        }

        else{

            console.log("nothing found ! ");

        }

    });

}



exports.listToSubscribeSensors = function(msg, callback) {

    var email = msg.email;
    console.log("we got the mail " + email);

    sensorSchema.find({"status":true}, function (err, users) {
        var json_resp;

        var result = users;
        console.log("av avaa "+result);

        if(users) {

            json_resp = {"status": 200, "data": users};
        }

        else {
            console.log("not found");

        }
        callback(null, json_resp);
    });
}

exports.mySensors = function(msg, callback) {

    var email = msg.email;
    console.log("-------In my sensor---------- "+email);
    userSchema.find({"email": email}, function (err, users) {
        var json_response;
        console.log("In sensor response "+JSON.stringify(users[0].subscribedSensors));
        if (err)
            json_response = {"status": 400};
        else {
            if (users[0].subscribedSensors == null)
                json_response = {"status": 300};

            else
                json_response = {"status": 200, "data": users[0].subscribedSensors};
        }
        callback(null, json_response);
    });
}

