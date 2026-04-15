import { Body, Controller, Post, Redirect } from '@nestjs/common';
import { Login } from './DTO/login.dto';
import { LoginServices } from './login.services.js';

@Controller('login')
export class LoginController {
    constructor(private login: LoginServices) { }
    @Post()
    @Redirect()
    async LoginCredential(@Body() user: Login) {
        let verifyCredential = await this.login.Login(user.email, user.password);
        if (verifyCredential.statuscode == 302) {
            return { url: '/home', statusCode: 302 };
        } else if (verifyCredential.statuscode == 401) {
            return { url: '/error', statusCode: 401 };
        }
    }

}