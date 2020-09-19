# SessionMush
Something that helps to manage sessions in server side

## Description
Session here means kind of an state for your application in the server side.

Each session should be accessible by an identification token ( here knows as `sid`  ) so the application can save that token to access and use that session.
A server side state for your application can be use for saving clients auth state or any temporarily data about clients that you want to use them on server side so in your application you will save that **identification token** and then with each request you will send it in **http headers**  then the server will know who you are and what was you did before on the application based on that saved session data in database **(server side state for that id)** so it can serve the needed information for you based on the client identity and it's state on the server.
It created to be used as a express middleware and mongodb as data store.

## Architecture

When your application have no session and it loaded for the first time it sends a request to the server to gain an identity for itself
When the request received to the server, server analyze the request and it'll find out that there is not exist any session id (`sid`) so it will make a new one for this request and add it to response header part so when the server decide to send the response it will send that created session informations too.
The client should save that informations to use that session for its other requests. it can send that id in the request header part to show its identification.
A session can be expire too when it doesn't used for a threshold time. so when the server get wrong or expired session it will behave to it like a request without any session so it will create a session for that request and send its informations like what we explained before.

## Usage ( with express-js )
It created to be use with express js but its functions can be use in other things too however to use it in express js after downloading this and added to your project you can use its wroten express middleware ( but you should remember that it use mongodb as database using mongoose to store sessions so don't forget to connect mongoose to your database first )
```js
const sessionMush_middleware = require('./sessionMush/express');
your_express_server.use(sessionMush_middleware);
```

After that with every request to your server you will have a session object that added to that request. so you can use it to store new states or any data that you want. suppose we have an express middleware like below:
```js
function example_middleware(request, response)
```
session is accessible from the request
```js
request.session; // the session is accessible in this way
```
you can store data and any thing that you want by using data object in the session.
```js
var sessionStoredData = request.session.data; // data is accessible from here
```
after any changes in the data you should save it using save method  `session.save`.
e.g :
```js
request.session.data.viewed = true;
// after each change if you want to save that changes you should call save method
request.session.save(); // it will save all changes in the database
```

## Contribute

This project is made for personal usage so just using it in your projects can help but reporting bugs or any suggestions can help a lot too.

