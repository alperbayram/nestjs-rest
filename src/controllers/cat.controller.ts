import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Cat } from 'src/interfaces/cat.interface';
import { CatsService } from 'src/services/cat.service';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: Cat) {
    try {
      this.catsService.create(createCatDto);
      return { message: 'Cat created successfully' };
    } catch (error) {
      throw new HttpException(
        'Cat creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      const cats = this.catsService.findAll();
      return cats;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('httpsCats')
  async fetchExternal(): Promise<{
    httpsCats: { img: string; status: string; desc: string }[];
  }> {
    try {
      const response = await axios.get('https://http.cat/');
      const $ = cheerio.load(response.data);

      const elements: { img: string; status: string; desc: string }[] = [];

      $('ul li').each((_, element) => {
        const $li = $(element);
        const imgSrc = $li.find('img').attr('src');
        const status = $li.find('.font-semibold').first().text().trim();
        const desc = $li.find('p').text();

        if (imgSrc && status && desc) {
          elements.push({
            img: 'https://http.cat' + imgSrc,
            status: status,
            desc: desc,
          });
        }
      });

      return { httpsCats: elements };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch external content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
