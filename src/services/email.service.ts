import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private from: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!apiKey) {
      throw new Error('RESEND_API_KEY is missing');
    }

    this.resend = new Resend(apiKey);
    this.from =
      this.configService.get<string>('EMAIL_FROM') ||
      'Acme <onboarding@resend.dev>';
  }

  async sendTeacherWelcomeEmail(to: string, name: string) {
    const { data, error } = await this.resend.emails.send({
      from: this.from,
      to: ['sivalakshmanan31@gmail.com'],
      subject: 'Welcome to School 🎓',
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Your teacher account has been created successfully.</p>
        <p>You can now login and access your dashboard.</p>
      `,
      text: `Welcome ${name}! Your teacher account has been created.`,
    });

    if (error) {
      throw new Error('Failed to send email');
    }

    return data;
  }
}
