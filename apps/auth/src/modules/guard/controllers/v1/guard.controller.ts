import { TokenDto } from "@app/blogtivity-lib/dtos/token.dto";
import { TransportDto } from "@app/blogtivity-lib/dtos/transport.dto";
import { Controller, UnauthorizedException } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { GuardService } from "../../guard.service";
import { User } from "@app/blogtivity-lib/models/user.model";

@Controller()
export class GuardController {

  constructor(private guardService: GuardService) { }

  @MessagePattern('check-access-token')
  async checkAuth(@Payload() data: TransportDto<TokenDto>, @Ctx() context: RmqContext): Promise<User> {
    const token = data.data.token;
    try {
      const user = await this.guardService.checkAccessToken(token);
      return user;
    } catch {
      throw new UnauthorizedException('invalid token');
    }
  }
}
