const { gql } = require('apollo-server-express');
const { posts } = require('../temp');
const post = require('../typeDefs/post');
const totalPosts = () => posts.length;
const allPosts = () => posts;
const newPost = (parent, args) => {
  //create new post object
  const { title, description } = args.input;
  const post = {
    id: posts.length + 1,
    title,
    description,
  };
  //push new post object to posts array
  posts.push();
  return post;
};
module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
