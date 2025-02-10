import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/loginRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginRequest: LoginRequest) {
    const user = await this.authService.validateUser(loginRequest);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    return this.authService.login(user);
  }

  //     @Post('signup')
  //     async requestOtp(@Body() requestOtpDto: any) {
  //   return this.authService.requestOtp(requestOtpDto.phone);
  //     }
}
