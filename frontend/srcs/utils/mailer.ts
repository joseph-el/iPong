// verification.service.ts

// import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';

// @Injectable()
// export class VerificationService {
//   constructor(private readonly mailerService: MailerService) {}

//   async sendVerificationCode(email: string): Promise<string> {
//     const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

//     await this.mailerService.sendMail({
//       to: email,
//       subject: 'Verification Code',
//       text: `Your verification code is: ${verificationCode}`,
//     });

//     return verificationCode;
//   }
// }
