# Speer Back End Assesment
To create an application similar to Twitter, just as a backend exposing a well-formed API with testing.

## Introduction
Hello! Thank you for taking your time to review my submission. For this app, I used Express for the server, PostgresSQL for the database, and Mocha & Chai for the testing. Please refer to package.json for more libaries used. Any feedback would be greatly appreciated, you can contact me by email at **tammy.n.tran@gmail.com**.


## Setup
1. Install dependencies with `npm install`.

2. Create database and run schema.sql file to create the tables and seeds.

3. Start the server with `npm start`.

4. Perform testing with `npm test`. Please note, that if you would like to run the test again, the database will need to be reset to the original seeds.

### ERD
| user |       |
|:------|:------|
|id | SERIAL PK |
|username| VARCHAR(255)|
|password|VARCHAR(255)|

| message |       |
|:------|:------|
|id | SERIAL PK |
|sender_id| FK(users(id))|
|reciever_id| FK(users(id))|
|message| VARCHAR(255)|
|sent_at|TIMESTAMP|

| tweet |       |
|:------|:------|
|id | SERIAL PK |
|user_id| FK(users(id))|
|content|VARCHAR(255)|
|created_at| TIMESTAMP|

### Routes
|Route | HTTP Verb| Description|
|:-----|:---------:|:---------|
|/     | GET| Homepage|
|/users|GET| Get all users|
|/users|POST| Register new user|
|/users/login|POST| Login as user|
|/users/logout|POST| Logout user and clear session|
|/users/:user_id/messages|GET| Get all messages sent and received from user|
|/users/:user_id/messages|POST| Send a message as a user|
|/users/:user_id/messages/:chat_user_id| GET |all messages sent between two users|
|/tweets|GET|Get all tweets|
|/tweets|POST|Create a new tweet|
|/tweets/:tweet_id|GET|Get specific tweet|
|/tweets/:tweet_id/delete|DELETE| Delete specific tweet|
|/tweets/:tweet_id/edit|PUT| Update specific tweet|


