import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service'

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  private readonly logger = new Logger(EmailController.name);

  // Handler para o evento 'send_email'
  @EventPattern('send_email')
  async handleEmailEvent(@Payload() data: any) {
    this.logger.log('Recebido evento de email');
    await this.emailService.sendWelcomeEmail(data);
  }
}
