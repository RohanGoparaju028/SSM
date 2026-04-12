import { Body, Controller, Post } from '@nestjs/common';
import { User } from './DTO/user.dto'

@Controller("SignUp")
export class SignUP {
    @Post()
    signin(@Body() userDetails: User) {

    }
}