import { Module } from "@nestjs/common";
import { PublicArticleController } from "./controllers/v1/public-article.controller";
import { PublicArticleService } from "./services/public-article.service";
import { ArticleController } from "./controllers/v1/article.controller";
import { ArticleService } from "./services/article.service";

@Module({
    imports: [
    ],
    providers: [
        PublicArticleService,
        ArticleService
    ],
    controllers: [
        PublicArticleController,
        ArticleController
    ],
})
export class ArticleModule { }