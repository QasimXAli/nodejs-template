export abstract class BaseService<T> {
    abstract findAll(): Promise<T[]>;
    abstract findById(id: string): Promise<T | null>;
    abstract create(data: Partial<T>): Promise<T>;
    abstract update(id: string, data: Partial<T>): Promise<T | null>;
    abstract delete(id: string): Promise<T | null>;
  }
  