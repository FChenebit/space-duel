import type { IIDGenerator } from '../ports/IIDGenerator';

export class FixIDGenerator implements IIDGenerator {
  private count: number;
  constructor() {
    this.count = 0;
  }
  generate(): string {
    this.count++;
    //console.log('next id : ' + 'ID-' + this.count.toString());
    return 'ID-' + this.count.toString();
  }
}
