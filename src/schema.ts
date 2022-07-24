import { makeSchema } from "nexus";
import { join } from "path";
import { cwd } from "process";
import * as types from "./graphql";

const WORK_DIR = cwd();

const schema = makeSchema({
  types,
  outputs: {
    schema: join(WORK_DIR, "schema.graphql"),
    typegen: join(WORK_DIR, "nexus-typegen.ts"),
  },
  contextType: {
    module: join(WORK_DIR, "./src/context.ts"),
    export: "Context",
  },
});

export default schema;
