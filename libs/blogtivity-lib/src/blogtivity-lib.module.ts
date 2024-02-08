import { Module } from '@nestjs/common';
import { BlogtivityLibService } from './blogtivity-lib.service';
import { User } from './models/user.model';

@Module({
  providers: [BlogtivityLibService],
  exports: [
    BlogtivityLibService,
    User
  ]
})
export class BlogtivityLibModule { }
