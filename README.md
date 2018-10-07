#Assignment_1

## Steps
1. Create an http server
1. Server listens on port 3010
1. Inside createServer 
    1. Get URL and parse it
    1. Extract path from URL
    1. Trimm '/' from begining and end
    1. Initialize variable buffer that will accumulate the incoming stream - decoded
    1. Bind to  event 'data' that the request object emmits
        1. In the event callback we collect the incoming payload stream, if any
    1. Bind to  event 'end' that the request object emmits
        1. it's callback is called when the incoming stream compleets. In it we will handle the response and log the activity
1. Define a request router object
    1. In it define path (key) 'hello' with the appropriate hello handler as value
1. Define a handlers object with
    1 hello handler function, returns statusCode 200 and a payload
    1 notFound handler function, returns statusCode 404
1. Write the server response inside request end callback. 
    1. Choose the handler 
    1. Construct the response data
    1. Route accordingly calling the chosen handler
        1. Pass the constructed response data to be used by the handler (just in case)
        1. Use the statusCode if provided by the handler, otherways define some default
        1. Use the payload if provided, otherways define some default
        1. Convert payload to string
        1. Write response object
1       1. In the response header set Content-Type, application/json