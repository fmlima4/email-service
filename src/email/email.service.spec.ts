import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: { sendMail: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should send a welcome email', async () => {
    const sendMailSpy = jest.spyOn(mailerService, 'sendMail');
    await service.sendWelcomeEmail('test@example.com', 'Welcome!');
    expect(sendMailSpy).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Welcome!',
      template: './welcome',
      context: { content: 'Welcome!' },
    });
  });
});
