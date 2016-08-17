# SensorCloud

(Still in a testing phase !)

Tried to simulate the process, roles of a sensor admin which provides the all the users an access to use his sensors.

**SENSOR ADMIN :** This module activates the sensors from its dashboard and as and when they activate the sensor, the end user can start listening/using the data that the sensor senses !

**END USER :** This is the module from which any end user can sign up and then use the dashboard. From which, they can use the activated sensors.

For an example, I here, used weatherAPI to simulate sensors which will work as the virtual sensor that the sensor admin activated !
Here, end user can get the current weather information and he can possibly forecast the data for next 5 days from the dashboard !

**Technologies used :**

NodeJS, ExpressJS for backend scripting, AngularJS for frontend, MongoDB as a database and RabbitMQ for queue support. 
