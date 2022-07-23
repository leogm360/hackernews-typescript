import { ApolloServer } from "apollo-server";
import schema from "./schema";

const port = process.env.PORT || 3000;

const server = new ApolloServer({ schema });

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server is ready at http://localhost:${port}/`);
});

export default server;
