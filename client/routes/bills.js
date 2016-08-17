var mq_client = require('../rpc/client');

exports.myBills = function(req, res) {

    var email = req.session.email;
    console.log("In routes bills");
    var msg_payload = {
        "email": email,
        "func": "myBills"
    };


    mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

        console.log("Queue "+ JSON.stringify(results));
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        }
        else {
            if (results.status == 200) {

                var arr = new Array();
                console.log("My Bills " + JSON.stringify(results.data));
                for(i = 0; i<results.data.length; i++){
                    if(results.data[i].amount==null){
                        console.log("AMount "+results.data[i].amount);
                    }
                    else {

                        arr.push(results.data[i]);
                    }
                }
                console.log(JSON.stringify(arr));
                json_response = {"status": 200, "data": arr}
                res.send(json_response);
            }

            else if(results.status==300){
                json_response = {"status": 300}
                res.send(json_response);
            }
            else {
                json_response = {"status" : 400}
                res.send(json_response);
            }
        }

    });
}
