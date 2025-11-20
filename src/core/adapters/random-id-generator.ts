import { v4 } from 'uuid';
import type { IIDGenerator } from '../ports/IIDGenerator';

export class RandomIDGenerator implements IIDGenerator {
  generate(): string {
    return v4();
  }
}
