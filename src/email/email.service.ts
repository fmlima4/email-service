import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(data: any) {
    this.logger.log(`Enviando email de boas-vindas para: ${data.to}`);

    try {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        template: 'welcome',
        context: { name: data.name },
      });

      this.logger.log('Email enviado com sucesso!');
    } catch (error) {
      this.logger.error(`Erro ao enviar email: ${error.message}`, error.stack);
      throw error;
    }
  }
}
