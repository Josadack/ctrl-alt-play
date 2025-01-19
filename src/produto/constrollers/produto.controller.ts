import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Produto } from "../entities/produtos.entity";
import { ProdutoService } from "../services/produtos.service";


@Controller('/produtos')
export class ProdutoController{
    constructor(
        private readonly produtoService: ProdutoService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param ('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id)
    }

    @Get('/jogos/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param ('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome)
    }

    @Get('/preco_menor/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoMenor(@Param ('preco', ParseFloatPipe) preco: number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMenor(preco)
    }


    @Get('/preco_maior/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoMaior(@Param ('preco', ParseFloatPipe) preco: number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMaior(preco)
    }

    
    @Get('/preco/:n/:n2')  
    @HttpCode(HttpStatus.OK)  
    findByPrecoBetween(@Param('n') n: number, @Param('n2') n2: number ): Promise<Produto[]> {  
           return this.produtoService.findByIntervalo(n, n2);  
    }


    @Get('/countcategoria/:genero')  
    @HttpCode(HttpStatus.OK)  
    countProdutosPorCategoria(@Param('genero') genero: string): Promise<{ categoria: string; quantidade: number }[]> {  
      return this.produtoService.countProdutosPorCategoria(genero);  
    }  

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param ('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id)
    }


}