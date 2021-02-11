import { Injectable } from '@nestjs/common'
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer'

@Injectable()
export class MailProvider {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(sendMailOptions: ISendMailOptions) {
        switch (process.env.NODE_ENV) {
            case 'test':
                return
            case 'development':
                sendMailOptions.to = process.env.EMAIL_USER
        }

        await this.mailerService.sendMail(sendMailOptions)
    }
}
