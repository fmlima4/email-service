import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailModule } from './email/email.module'; 

@Module({
  imports: [
    EmailModule,

    // Registro do serviço de mensageria (RabbitMQ)
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@rabbitmq:5672'],
          queue: 'emails_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
})
export class AppModule {}
