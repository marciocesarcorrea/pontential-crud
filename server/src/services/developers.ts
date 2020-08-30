import { ParsedQs } from "qs";
import { getRepository } from "typeorm";
import { QueryBuilder } from "typeorm-express-query-builder";

import { ErrorHandler } from "../middlewares";
import { Developer } from "../models";

export const developers = {
  find: async (query: ParsedQs) => {
    try {
      const hasFilter = Object.keys(query).length > 0;
      const builder = new QueryBuilder(query);
      const data = await getRepository(Developer).find(builder.build());

      if (hasFilter && data.length === 0) {
        const filterStr = Object.entries(query)
          .map((q) => q.join(": "))
          .join(",");

        throw new ErrorHandler(404, `Not found with filter: ${filterStr}`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: string) => {
    try {
      const data = await getRepository(Developer).findOne(id);

      if (!data) {
        throw new ErrorHandler(404, "Not found.");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  create: async (body: Omit<Developer, "id" | "idade">) => {
    try {
      const repository = getRepository(Developer);
      console.log(body);
      const data = await repository.save(repository.create(body));
      return data;
    } catch (error) {
      throw error;
    }
  },
  update: async (id: number, body: Omit<Developer, "id" | "idade">) => {
    try {
      const repository = getRepository(Developer);
      const data = await repository.save({
        id,
        ...body,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id: number) => {
    try {
      const repository = getRepository(Developer);
      const data = await repository.findOne(id);
      const result = await repository.delete({ id });
      return result.affected > 0 ? data : null;
    } catch (error) {
      throw error;
    }
  },
};
