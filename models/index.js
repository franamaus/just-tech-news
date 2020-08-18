//This file will become more important as we create more models,
//but for now it'll just be for collecting and exporting the User model data. 
//For now, the index.js file should look like the following code:

const User = require('./User');
const Post = require('./Post');

// create associations; one-to-many relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// make the reverse association as well
Post.belongsTo(User, {
    foreignKey: 'user-id'
});

module.exports = { User, Post };