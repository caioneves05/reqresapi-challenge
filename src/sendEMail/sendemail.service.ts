import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class emailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'Caio Neves test',
      subject: 'Sending Email with NestJS.',
      html: 'Test completed successfully.',
    });
  }
}
