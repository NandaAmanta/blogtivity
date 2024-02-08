import { User } from "@app/blogtivity-lib/models/user.model";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class GuardService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  /**
   * Check access token
   * @param token 
   * @returns Promise<User>
   */
  async checkAccessToken(token: string): Promise<User> {
    const payload = this.jwtService.decode(token);
    const user = await this.usersRepository.findOne(payload.id);
    return user;
  }

}