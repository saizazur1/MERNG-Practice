//Dependencies
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

//Importing Files
const Post = require("./models/Post");

//Our Type Defs
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

//Our Resolvers
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

//Creating Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//connecting Database
const MONGODB =
  "mongodb+srv://Saizazur:rjclp46fDwhWYoec@cluster0.nxkjl.mongodb.net/merng?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => server.listen({ port: 4000 }))
  .then((res) => console.log(`Server is running on port ${res.url}`));
//Server Port
