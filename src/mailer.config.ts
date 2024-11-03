import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
  transport: {
    host: 'sandbox.smtp.mailtrap.io', // Substitua por SMTP real
    port: 2525,
    auth: {
      user: 'bd60c61a426890',
      pass: '091d39be3fdbd3',
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  }
};
