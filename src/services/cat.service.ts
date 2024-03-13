import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    if (!cat || typeof cat !== 'object') {
      throw new Error('Invalid Cat object');
    }
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}