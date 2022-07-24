import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import { context } from "./context";
import schema from "./schema";

const port = process.env.PORT || 3000;

const server = new ApolloServer({
  schema,
  context,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault],
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server is ready at ${url}`);
});

export default server;
