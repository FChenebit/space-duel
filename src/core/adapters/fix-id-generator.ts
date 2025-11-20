import type { IIDGenerator } from '../ports/IIDGenerator';

export class FixIDGenerator implements IIDGenerator {
  private count: number;
  private ids: Array<string>;
  constructor() {
    this.count = -1;
    this.ids=['ID-1','ID-2','ID-3','ID-4']
  }
  generate(): string {
    this.count++;
    if (this.count >= this.ids.length) {
      throw new Error('no new fixed id')
    }
    return this.ids[this.count];
  }
}
