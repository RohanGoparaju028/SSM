import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

const Organizationemail: string = ''; // This is not created at

@Injectable()
export class ExpiryItems {
    constructor(private mail: MailerService) { }
    expiryEmail(email: string, Item: string): void {
        const message: string = Item + " is going to expire today if you are free today please buy it";
        this.mail.sendMail({
            from: Organizationemail,
            to: email,
            subject: "News about " + Item,
            text: message
        });
    }
}

@Injectable()
export class QuantityThreshold {
    constructor(private mail: MailerService) { }
    AboutToFinish(email: string, Item: string, currentQuantity: number): void {
        const message: string = "Currenty the " + Item + " has " + currentQuantity.toString() + " in the house and about to finish";
        this.mail.sendMail({
            from: Organizationemail,
            to: email,
            subject: "News about " + Item,
            text: message
        });
    }
}