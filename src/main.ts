import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Cria o app principal (caso você precise para APIs HTTP também)
  const app = await NestFactory.create(AppModule);

  // Configuração do microserviço usando RabbitMQ
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'emails_queue',
      queueOptions: { durable: true },
    },
  });

  // Iniciar todos os microserviços configurados
  await app.startAllMicroservices();
  console.log('Microservice is listening on RabbitMQ...');

  // Caso você precise expor alguma API HTTP junto do microserviço
  await app.listen(3000);
  console.log('HTTP API is running on http://localhost:3000');
}

bootstrap();
