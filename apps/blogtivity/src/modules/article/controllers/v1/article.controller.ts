import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ArticleService } from "../../services/article.service";
import { AuthGuard } from "../../../auth/auth.guard";


@UseGuards(AuthGuard)
@Controller('v1/my/articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService
  ) { }

  // @Get()
  // public async getArticles(@Query() query: GetArticlesDto): Promise<ApiResponse> {
  //     return this.articleService.findAll(query);
  // }

  // @Get(':id')
  // public async getArticle(@Param('id') id: string): Promise<ApiResponse> {
  //     return this.articleService.detail(id);
  // }

  //@Post()
  //public async create(){
  //     return
  // }

  //@Put()
  //public async edit(){
  //    return
  // }

  //@Delete
  //public async delete(){
    // return
  // }

}
