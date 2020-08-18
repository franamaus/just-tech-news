const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
    // javascript's static keyword to indicate that the upvote method is one that's based on 
    // the Post model and not an instance method
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                id: body.post_id
                },
                attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                    'vote_count'
                ]
                ]
            });
        });
    }
}

// create fields/columns for Post model
Post.init(
    // define the Post schema
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // configure the metadata, including the naming conventions
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;