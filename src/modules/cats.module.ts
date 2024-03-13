import { Module } from '@nestjs/common';
import { CatsController } from 'src/controllers/cat.controller';
import { CatsService } from 'src/services/cat.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}