import Mailjet from 'node-mailjet'
export class Maljetprovider {
    client;
    fromEmail;
    fromname;

    constructor(config) {
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
        })
        this.fromEmail = config.fromemail;
        this.fromname = config.fromname;
    }

    async sendemail(email, subject, html) {
        this.client.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: {
                        Email: this.fromEmail,
                        Name: this.fromname,
                    },
                    To: [
                        {
                            Email: email,

                        },
                    ],
                    Subject: subject,
                    TextPart: 'Greetings from Mailjet!',
                    HTMLPart:
                    html
                },
            ],
        })
    }


}

