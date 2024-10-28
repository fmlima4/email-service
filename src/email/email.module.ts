import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io', // Troque para o seu host SMTP
        port: 587, // Porta do serviço SMTP
        auth: {
          user: 'bd60c61a426890', // Seu usuário SMTP
          pass: '091d39be3fdbd3', // Sua senha SMTP
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // Email padrão do remetente
      },
      template: {
        dir: join(__dirname, 'templates'), // Diretório dos templates de email
        adapter: new HandlebarsAdapter(), // Adaptador de handlebars
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
