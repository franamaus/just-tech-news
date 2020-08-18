//This file will become more important as we create more models,
//but for now it'll just be for collecting and exporting the User model data. 
//For now, the index.js file should look like the following code:

const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');


// create associations; one-to-many relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// make the reverse association as well
Post.belongsTo(User, {
    foreignKey: 'user-id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// allowing both the User and Post models to 
// query each other's information in the context of a vote.
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Vote, Comment };