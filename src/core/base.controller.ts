import { Request, Response, NextFunction } from 'express';
import { sendPayload } from '../utils/response';

export abstract class BaseController<T> {
  protected abstract resourceName: string;
  protected abstract service: {
    findAll: () => Promise<T[]>;
    findById: (id: string) => Promise<T | null>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: string, data: Partial<T>) => Promise<T | null>;
    delete: (id: string) => Promise<T | null>;
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.findAll();
      return sendPayload(res, {
        success: true,
        message: 'Fetched successfully',
        data: items,
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.findById(req.params.id);
      if (!item) {
        return sendPayload(res, {
          success: false,
          message: 'Item not found',
          statusCode: 404,
        });
      }
      return sendPayload(res, {
        success: true,
        message: 'Fetched successfully',
        data: item,
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.create(req.body);
      return sendPayload(res, {
        success: true,
        message: 'Created successfully',
        data: item,
        statusCode: 201,
      });
    } catch (err) {
      next(err);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        return sendPayload(res, {
          success: false,
          message: `${this.resourceName} not found`,
          statusCode: 404,
        });

      }
      return sendPayload(res, {
        success: true,
        message: 'Updated successfully',
        data: item,
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.delete(req.params.id);
      if (!item) {
        return sendPayload(res, {
          success: false,
          message: `${this.resourceName} not found`,
          statusCode: 404,
        });
      }
      return sendPayload(res, {
        success: true,
        message: `${this.resourceName} deleted successfully`,
        data: item,
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  };
}
