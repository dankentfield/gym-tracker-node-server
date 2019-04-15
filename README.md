# gym-tracker-node-server
Server for the React Native gym tracker app.

### TLDR Description
A Node-Express-Mongo (mongoose) server hosted on AWS EC2. Mongo is hosted on Monog Atlas.

### Description
This is part of a React Native app hosted on AWS. The database is a MongoDB database hosted on Mongo Atlas, accessed through this Node-Express server (running on an AWS EC2 instance). The initial inspiration for this project was to open up my gym data so I can monitor my fitness and gym performance more closely, importing it into a database for trend analysis (which will form another project).

### Technologies Used: 
+ Node
+ Express
+ MongoDB
+ AWS EC2
+ Mongo Atlas

### What I would do differently:
+ Host the Node server on AWS Elastic Beanstalk.
+ Implement unit testing from the beginning. 

### Future plans (in no particular order):
+ User authentication. 
+ Add password hashing.
+ CORS.
+ Enfore HTTPS.
+ Move the Node server from EC2 to AWS Elastic Beanstalk.
+ Google and Facebook authentication.

### Check out the React Native app: <a href="https://github.com/dk03/gym-tracker-react-native/">HERE</a>
