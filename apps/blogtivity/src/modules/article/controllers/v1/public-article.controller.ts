import { Controller, Get, Param, Query } from "@nestjs/common";
import { PublicArticleService } from "../../services/public-article.service";


@Controller('v1/articles')
export class PublicArticleController {
  constructor(
    private publicArticleService : PublicArticleService
  ) { }

    // @Get()
    // public async getArticles(@Query() query: GetArticlesDto): Promise<ApiResponse> {
    //     return this.publicArticleService.findAll(query);
    // }

    // @Get(':id')
    // public async getArticle(@Param('id') id: string): Promise<ApiResponse> {
    //     return this.publicArticleService.detail(id);
    // }

}
