import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) // modified by chatGPT

  // All API routes will live under /api (easier to proxy + deploy)
  app.setGlobalPrefix('api')

  // Allow your frontend to call the API during dev
  // Add your deployed frontend URL(s) here when you deploy
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })

  // Run API on a different port than the frontend
  const port = Number(process.env.PORT) || 4000
  const host = process.env.HOST || '0.0.0.0' // '0.0.0.0' if you want external access
  await app.listen(port, host)

  console.log(`API listening on http://${host}:${port}/api`)
}

void bootstrap();
