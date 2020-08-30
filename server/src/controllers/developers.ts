/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import { developers as service } from "../services";
import { Developer } from "../models";

export const developers = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const devs = await service.find(req.query);
      return res.json(devs);
    } catch (error) {
      next(error);
    }
  },
  getById: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dev = await service.findOne(req.params.id);
      return res.json(dev);
    } catch (error) {
      next(error);
    }
  },
  post: async (
    req: Request<any, any, Omit<Developer, "id" | "idade">>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dev = await service.create(req.body);
      return res.status(201).json(dev);
    } catch (error) {
      next(error);
    }
  },
  put: async (
    req: Request<{ id: string }, any, Omit<Developer, "id" | "idade">>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id);
      const dev = await service.update(id, req.body);
      return res.json(dev);
    } catch (error) {
      next(error);
    }
  },
  delete: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id);
      const dev = await service.delete(id);
      return res.status(204).json(dev);
    } catch (error) {
      next(error);
    }
  },
};
