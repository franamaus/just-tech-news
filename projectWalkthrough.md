As with most applications using Node.js, we'll start with initializing Node.js, adding the packages, and installing the dependencies we need. The following steps walk you through this process:

Use cd to navigate to the root of your cloned repository folder.

Run npm init or npm init -y from the command line to initialize a new Node.js package. Your entry point for the program should be server.js. If you use the npm init -y option, remember to manually update your package.json to "main": "server.js" instead of "main": "index.js".

Once that's done, update package.json with the following script:

  "start": "node server.js"
Create a .gitignore file, and add the following files and folders:

node_modules

.DS_Store

Create a server.js file.

Create folders called models, routes, config, and db.

Lastly, install the dependencies by using the following command:

npm install express sequelize mysql2
Note that in the last step, we installed multiple libraries using npm by putting a space between each library's name.

Notice that we installed a package called mysql2. Why didn't we install mysql? While there is a mysql library that can connect to a MySQL database through the Node.js application, Sequelize prefers to work with the mysql2 library, which appears to be the successor of the native mysql library for Node.js.

Create and Connect to the Database
With Sequelize, we no longer have to bother with creating the entire SQL table schema and running it through the SQL shell. All we need to do is create a database; then when we start the app, Sequelize will create the tables for us!

It's a good practice to keep the database information with the application's code, so let's add it to a file. Create a file in the db directory called schema.sql and add the following code to it:

DROP DATABASE IF EXISTS just_tech_news_db;

CREATE DATABASE just_tech_news_db;
Now that the database setup code is created, let's navigate to the MySQL shell and get the database up and running by following these steps:

IMPORTANT
Remember, if you use a PC, you'll use the Command Prompt application (not GitBash). If you're using macOS, these commands will work right in the Terminal command-line application.

From the root directory of your project, type mysql -u root -p and press Return.

Enter your MySQL password and press Return again to enter the MySQL shell environment.

To create the database, execute the following command:

  source db/schema.sql
To ensure it worked, follow that command with show databases;.

////////////////////////////////////////////

npm install dotenv

Once that's installed, at the root of your application create a file called .env and add the following code:

DB_NAME='just_tech_news_db'
DB_USER='your-mysql-username'
DB_PW='your-mysql-password'
That's all you have to do to set up these environment variables. Next, load them into the connection.js file. Let's update that file to look like the following code:

require('dotenv').config();


dotenv is an npm package for use of the .env file (need to install this package)