import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authMiddleware } from './middleware/authMiddleware';
import { CorsMiddleware } from './middleware/corsMiddleware';

@Module({
  imports: [
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes("*");
    consumer.apply(authMiddleware).forRoutes('*'); 
  }
}
