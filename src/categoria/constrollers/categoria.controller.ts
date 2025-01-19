import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria,  } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";


@Controller('/categorias')
export class CategoriaController{
    constructor(
        private readonly categoriaService: CategoriaService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param ('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.categoriaService.findById(id)
    }

    @Get('/genero/:genero')
    @HttpCode(HttpStatus.OK)
    findByGenero(@Param ('genero') genero: string): Promise<{mensagem: string; categoria: Categoria[]}>{
        return this.categoriaService.findByGenero(genero)
    }  

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Categoria): Promise<Categoria>{
        return this.categoriaService.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()  genero: Categoria): Promise<Categoria>{
        return this.categoriaService.update(genero)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param ('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id)
    }


}