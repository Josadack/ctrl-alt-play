import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produtos.entity";
import { ProdutoController } from "./constrollers/produto.controller";
import { ProdutoService } from "./services/produtos.service";
import { CategoriaModule } from "../categoria/categoria.module";



@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: [TypeOrmModule],
})
export class ProdutoModule {}