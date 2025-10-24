import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) // modified by chatGPT

  // All API routes will live under /api (easier to proxy + deploy)
  app.setGlobalPrefix('api')

  // Allow your frontend to call the API during dev
  // Add your deployed frontend URL(s) here when you deploy
  app.enableCors({
    
    origin: [
      'http://localhost:3002',
      'http://localhost:5173',
      'https://474-individual-lms.princeyclarky.workers.dev',
      'https://f25-cisc474-individual-02c9.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  // Run API on a different port than the frontend
  const port = Number(process.env.PORT) || 3001
  const host = process.env.HOST || '0.0.0.0' // '0.0.0.0' if you want external access
  await app.listen(port, host)


  console.log(`🚀 API running at http://localhost:${port}/api`);
}

void bootstrap();
