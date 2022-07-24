import { ApolloServer } from "apollo-server";
import { context } from "./context";
import schema from "./schema";

const port = process.env.PORT || 3000;

const server = new ApolloServer({ schema, context });

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server is ready at http://localhost:${port}/`);
});

export default server;
