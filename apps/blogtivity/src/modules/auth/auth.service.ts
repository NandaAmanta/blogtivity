import { TokenDto } from "@app/blogtivity-lib/dtos/token.dto";
import { TransportDto } from "@app/blogtivity-lib/dtos/transport.dto";
import { User } from "@app/blogtivity-lib/models/user.model";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    public async checkToken(token: string): Promise<User> {
        let message = new TransportDto<TokenDto>();
        message.data = { token };
        return await this.client.send('check-access-token', message).toPromise();
    }
}