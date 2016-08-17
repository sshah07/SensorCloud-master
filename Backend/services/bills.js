var billingSchema = require('./schema/billingSchema');
console.log("before func");
exports.myBills = function(msg, callback) {


    var user = msg.email;
    console.log("-------In my bills---------- "+user);
    billingSchema.find({"user": user}, function (err, users) {
        var json_response;
        console.log("In bill response "+JSON.stringify(users));
        if (err)
            json_response = {"status": 400};
        else {
            if (!users)
                json_response = {"status": 300};

            else{
                    json_response = {"status": 200, "data": users};
                }
        }
        callback(null, json_response);
    });
}