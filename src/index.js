const express=require('express');
const helmet=require('helmet');
const cors=require('cors');
const {ApolloServer}=require('apollo-server-express');
      require('dotenv').config();
const models=require('./models');
const typeDefs=require('./schema');
const resolvers=require('./Resolvers');
const db=require('./db');
const port=process.env.PORT||8000;
const DB_HOST=process.env.DB_HOST;
const app=express();
app.use(helmet());
app.use(cors());
const jwt=require('jsonwebtoken');
db.connect(DB_HOST);

const getUser=token=>{
      if(token){
            try{
                  return jwt.verify(token,process.env.JWT_SECRET);
            }catch (err){
                  console.log(err);
                  throw new Error('Session Invalid');
            }
      }
};

/*async function startServer(app) {
      const server = new ApolloServer({
            typeDefs,
            resolvers,
            context:async ({req})=>{
                  const token = req.headers.authorization;
                  const user = getUser(token);
                  return {models,user};
            }
      })
      await server.start();
      server.applyMiddleware({app,path:'/api'});
}
//Express server setup
//const port = process.env.PORT || 000;
//const app = express();
//app.use(helmet());
//app.use(cors());
startServer(app).then(()=>{
      app.listen({port},()=>{
            console.log(
                `GraphQL Server is running successfully at port ${port}`
            );
            console.log(`GraphQL Server running at http://localhost:${port}/api`);
      })
})*/

async function startServer() {
      const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => {
                  const token = req.headers.authorization;
                  //const token = req.headers.authorization.split(' ')[1];
                  const user = getUser(token);
                  console.log(user);
                  return { models, user };
            }
      });
      await server.start();
      server.applyMiddleware({ app, path: '/api' });
      app.listen({ port }, () =>
          console.log(
              `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
          )
      );
}
startServer();
/*const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
            const token = req.headers.authorization;
            const user = getUser(token);
            console.log(user);
            return { models, user };
      }
});
await apolloServer.start();
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);*/
