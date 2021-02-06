import { MailerOptions } from '@nestjs-modules/mailer'
import { join } from 'path'
import { ConfigEnum } from '../types/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

export const mailerConfig = (): { [ConfigEnum.mailer]: MailerOptions } => ({
    [ConfigEnum.mailer]: {
        transport: {
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        },
        defaults: {
            from: '"Metal East" <noreply@metaleast.com>',
        },
        template: {
            dir: join(__dirname, '../../templates'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    },
})
