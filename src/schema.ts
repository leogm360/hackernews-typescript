import { makeSchema } from "nexus";
import { join } from "path";
import { cwd } from "process";
import * as types from "./graphql";

const WORKDIR = cwd();

const schema = makeSchema({
  types,
  outputs: {
    schema: join(WORKDIR, "schema.graphql"),
    typegen: join(WORKDIR, "nexus-typegen.ts"),
  },
  contextType: {
    module: join(WORKDIR, "./src/context.ts"),
    export: "Context",
  },
});

export default schema;
