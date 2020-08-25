const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: 'Super secret secret',
  // If we wanted to set additional options on the cookie, 
  // like a maximum age, we would add the options to the below object.
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static() method is a built-in Express.js middleware function 
// that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);
// call session middleware by passing through sess object



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
// we use the sequelize.sync() method to establish the connection to the database. 
// The "sync" part means that this is Sequelize taking the models 
// and connecting them to associated database tables. 
// If it doesn't find a table, it'll create it for you!
// if force: false is set to true
// it would drop and re-create all of the database tables on startup.
// which performs similarly to SQL's DROP TABLE IF EXISTS
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});