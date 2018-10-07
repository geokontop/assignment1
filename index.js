/*
 * 1st assignment
 * 
 */
 

 // Dependencies

 var http = require('http');
 var url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function(req,res){
    
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url,true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    

    // Get the querry string as an object
    var querryStringObject = parsedUrl.query;

    // Get the http method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });
    req.on('end',function(){
        buffer += decoder.end();
        
        // Choose the handler the request should go to. If one is not found, use the notFound handler.
        var chosenHandler = typeof(router[trimmedPath])!= 'undefined'? router[trimmedPath]:handlers.notFound;

        // Construct the data-object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'querryStringObject' : querryStringObject,
            'method': method,
            'headers': headers,
            'payload' : buffer
        };

        // Route the request to the chosen handler  
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler or default to 200
            statusCode= typeof(statusCode) == 'number'? statusCode:200;

            // Use the payload called back by the handler or default to empty object
            payload= typeof(payload) == 'object'? payload:{};

            // Convert the payload to a string
            payloadString = JSON.stringify(payload);

            // Write response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString)

            // Log activity
            console.log('method:', data.method, 'request received on path:', data.trimmedPath)

        })
    })

})

server.listen(3010,function(){
    console.log('The server is listening on port 3010')
})


// Define the handlers
var handlers = {};

// Sample handler
handlers.hello =function(data, callback){
    // Callback a http status code, and a payload object
    callback(200,{'assignment1': 'assignment fulfilled'});
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Define a request router
var router = {
    'hello' : handlers.hello
}