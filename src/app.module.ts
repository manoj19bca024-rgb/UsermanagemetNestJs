import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('Missing required environment variable: MONGO_URI');
}

@Module({
  imports: [MongooseModule.forRoot(mongoUri), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}
