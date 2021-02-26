const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, './typeDefs'))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './resolvers'))
);

//express server
const app = express();
//rest endpoint
app.get('/test', (req, res) => {
  res.json({ test: 'hello test' });
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
//applyMiddleware method connects ApolloServer to a specific HTTP framework ie:express
apolloServer.applyMiddleware({ app });
//db
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
};
db();
//server
const httpServer = http.createServer(app);
app.listen(process.env.PORT, () => {
  console.log(`Server is runing at https://localhost:${process.env.PORT}`);
  console.log(
    `Apollo server is runing at https://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
