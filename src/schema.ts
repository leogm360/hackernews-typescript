import { makeSchema } from "nexus";
import { join } from "path";
import { cwd } from "process";

const workDir = cwd();

const schema = makeSchema({
  types: [],
  outputs: {
    schema: join(workDir, "schema.graphql"),
    typegen: join(workDir, "nexus-typegen.ts"),
  },
});

export default schema;
