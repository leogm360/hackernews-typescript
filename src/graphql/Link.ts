import {
  extendType,
  idArg,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

let links: NexusGenObjects["Link"][] = [
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return links;
      },
    });
    t.nullable.field("link", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;

        const link = links.find((link) => link.id == Number(id));

        if (!link) {
          throw new Error(`Link with id ${id} was not found.`);
        }

        return link;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { description, url } = args;

        let idCount = links.length + 1;

        const link = {
          id: idCount,
          description: description,
          url: url,
        };

        links.push(link);

        return link;
      },
    });
    t.nonNull.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
        description: nullable(stringArg()),
        url: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        const { id, description, url } = args;

        let linkIndex = 0;

        const linkToUpdate = links.find((link, index) => {
          linkIndex = index;

          return link.id === Number(id);
        });

        if (!linkToUpdate) {
          throw new Error(`Link with id ${id} was not found.`);
        }

        const updatedLink = {
          ...linkToUpdate,
          description: description ? description : linkToUpdate.description,
          url: url ? url : linkToUpdate.url,
        };

        links[linkIndex] = updatedLink;

        return updatedLink;
      },
    });
    t.nonNull.field("deleteLink", {
      type: "Link",
      args: {
        id: nonNull(idArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;

        let linkIndex = 0;

        const linkToDelete = links.find((link, index) => {
          linkIndex = index;

          return link.id === Number(id);
        });

        if (!linkToDelete) {
          throw new Error(`Link with id ${id} was not found.`);
        }

        const deletedLink = links.splice(linkIndex, 1)[0];

        return deletedLink;
      },
    });
  },
});
