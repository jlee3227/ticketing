# ticketing

A StubHub clone to learn and understand microservice architecture. Built with:
* Node
* React
* MongoDB
* Docker
* Kubernetes
* ingress-nginx
* NATS Streaming Server

## Running Locally
**Note**: You must have Docker and Skaffold installed on your local machine. In addition, if you are on Mac or Windows, you will need to add the line `127.0.0.1 ticketing.dev` to your host file.

To run the application locally:
* Change directories to the root of the project
* run `skaffold dev` in your terminal

## Future Improvements
* Add refresh tokens to authentication
* Add database transactions
    * Along with whatever we are saving to the database of the service, we want to save the event being published and wrap both in a database transaction