var mq_client = require('../rpc/client');

exports.signupUser = function(req, res){

  res.render('signup');
}

//var userSchema = require('./.././userSchema');

exports.registerUser = function(req, res){

  var fullname = req.param('fullName');
  var email = req.param('email');
  var password = req.param('password');
  var creditcard = req.param('creditcard');
  var city = req.param('city');
  var state = req.param('state');
  var zipcode = req.param('zipcode');
  var phone = req.param('phone');

console.log(fullname+" "+email+" "+password+" "+creditcard+" "+city+" "+state+" "+zipcode+" "+phone);
  var msg_payload = {
    "fullname": fullname,
    "email": email,
    "password": password,
    "creditcard": creditcard,
    "city": city,
    "state": state,
    "zipcode": zipcode,
    "phone": phone,
    "func": "registerUser"
  };

  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {
    console.log("results response "+JSON.stringify(results));
    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if(results.status == 200) {

        json_response = {"status": 200, "data": results.data}
        res.send(json_response);
      }
      else
      {
        json_response = {"status" : 400}
        res.send(json_response);
      }
    }
  });
}

exports.loginUser = function(req, res){

  res.render('loginUser');
}

exports.loginCheckUser = function (req, res) {
  var email = req.param("email");
  var password = req.param("password");


  var msg_payload = {
    "email": email,
    "password": password,
    "func": "loginCheckUser"
  };


  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if(results.status == 200) {
        console.log("Login check results" + JSON.stringify(results.data));
        req.session.email = results.data;
        console.log("login is " + req.session.email);
        json_response = {"status": 200, "data": results.data}
        res.send(json_response);
      }
      else
      {
        json_response = {"status" : 300}
        res.send(json_response);
      }
    }
  });
}
exports.listActiveSensors = function(req, res){

  var msg_payload = {
    "func": "listActiveSensors"
  }
  mq_client.make_request("endUser_queue", msg_payload, function(err, results){
    //console.log(JSON.stringify("aayu "+JSON.stringify(results.data)));
    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {

      //console.log("about results" + JSON.stringify(results));
      json_response = {"status": 200, "data": results.data};
      console.log("sending "+JSON.stringify(json_response));
      res.send(json_response);

    }
  });
}


exports.userDashboard = function(req, res){
  if(req.session.email){
  console.log(req.session.email);
    res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('userDashboard');
  }
  else{

  console.log("no session found !");
    res.redirect('/');
  }

};

exports.subscribeSensor = function(req, res){
  var name = req.param('name');

  var msg_payload = {
    "email": req.session.email,
    "name" : name,
    "func": "subscribeSensor"
  };


  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if(results.status == 200) {
        console.log("about results" + JSON.stringify(results.data));

        json_response = {"status": 200, "data": results.data}
        res.send(json_response);
      }
      else
      {
        json_response = {"status" : 400}
        res.send(json_response);
      }
    }
  });
}


exports.unsubscribeSensor = function(req, res){
  var name = req.param('name');

  var msg_payload = {
    "email": req.session.email,
    "name" : name,
    "func": "unsubscribeSensor"
  };


  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if(results.status == 200) {
        console.log("about results" + JSON.stringify(results.data));

        json_response = {"status": 200, "data": results.data}
        res.send(json_response);
      }
      else if(results.status == 300){
        json_response = {"status":300}
      }
      else
      {
        json_response = {"status" : 400}
        res.send(json_response);
      }
    }
  });
}


exports.listToSubscribeSensors = function(req, res) {


  var msg_payload = {
    "email": req.session.email,
    "func": "listToSubscribeSensors"
  };


  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if (results.status == 200) {
        console.log("List to Subscribe sensors results" + JSON.stringify(results.data));

        //console.log("login " + req.session.adminId);
        json_response = {"status": 200, "data": results.data}
        res.send(json_response);
      }
      else {
        json_response = {"status": 400}
        res.send(json_response);
      }
    }
  });
}


exports.mySesnors = function(req, res) {

  var email = req.session.email;
  console.log("In routes mysensor");
  var msg_payload = {
    "email": email,
    "func": "mySensors"
  };


  mq_client.make_request('endUser_queue', msg_payload, function (err, results) {

    console.log("in makerequest"+ JSON.stringify(results));
    if (err) {
      //console.log(err);
      res.status(500).send(null);
    }
    else {
      if (results.status == 200) {
        console.log("My sensors " + JSON.stringify(results.data));

        //console.log("login " + req.session.adminId);
        json_response = {"status": 200, "data": results.data}
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

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

