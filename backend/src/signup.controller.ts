import { Body, Controller, Post, Redirect } from '@nestjs/common';
import { User } from './DTO/user.dto'
import { SignupServices } from './signup.services.js';
@Controller("SignUp")
export class SignUP {
    constructor(private signupService: SignupServices) { }
    @Post()
    @Redirect()
    async signin(@Body() userDetails: User) {
        let userResult = await this.signupService.SignUp(
            userDetails.FirstName,
            userDetails.LastName,
            userDetails.Email,
            userDetails.Password,
            userDetails.Age,
            userDetails.Gender
        );
        if (userResult.statuscode == 303) {
            return { url: "/home", statusCode: 302 };
        }
        else {
            return { url: "/error", statusCode: 302 };
        }
    }
}