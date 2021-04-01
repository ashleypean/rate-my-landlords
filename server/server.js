const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose')
require('dotenv').config()
const Landlords = require('./models/Landlords')
const Users = require('./models/Users')
const Properties = require('./models/Properties')
const Reviews = require('./models/Reviews')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

/* DATABASE CONNECTION */
mongoose.connect(
  process.env.DB_CONNECTION_STRING,  
  {useNewUrlParser: true, useUnifiedTopology: true }, 
  () => console.log('connected to db')
)

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context:  {
    Landlords, 
    Users, 
    Properties, 
    Reviews,
  }
});
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
