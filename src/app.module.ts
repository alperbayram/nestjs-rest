import { Module } from '@nestjs/common';
import { TestModule } from './modules/app.module';
import { CatsModule } from './modules/cats.module';

@Module({
  imports: [CatsModule, TestModule],
})
export class AppModule {}
