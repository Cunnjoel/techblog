const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'userId'
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
