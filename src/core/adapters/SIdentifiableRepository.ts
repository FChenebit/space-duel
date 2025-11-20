import { IIdentifiable } from "../ports/IIdentifiable";

export class SIdentifiableRepository<T extends IIdentifiable> {
  private database: {[id: string]: T} = {};

  add(newT: T) {
    this.database[newT.id] = newT;
  }

  getAll() {
    return Object.values(this.database);
  }

  getById(id: string): T | undefined {
    return this.database[id] ?? undefined;
  }

  remove(id: string) {
    delete this.database[id];
  }

  count() {
    return Object.values(this.database).length;
  }

}