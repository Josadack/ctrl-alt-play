import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Between, DeleteResult, ILike, In, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaReposiroy: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]>{
        return this.categoriaReposiroy.find({
            relations: {produto: true}
        })
    }

    async findById(id: number): Promise<Categoria>{
        const categoria = await this.categoriaReposiroy.findOne({
            where: {
                id
            }, relations: {produto: true}
        })
        if(!categoria)
            throw new HttpException('Gênero não encontrado! ⛓️‍💥', HttpStatus.NOT_FOUND)
        
        return categoria;
    }


    async findByGenero(genero: string): Promise<{mensagem: string; categoria: Categoria[]}>{

           const categoria = await this.categoriaReposiroy.find({
            where: {
                genero: ILike(`%${genero}%`)
            }, relations: {produto: true}
        })
        
        const mensagem = categoria.length > 0
        ? `✅ Encontramos ${categoria.length} Gêneros(s) contendo '${genero}' no nome.`
        : `⚠️ Nenhum gênero encontrado com o nome ${genero}`

        return {mensagem, categoria}
        }

       

    async create(categoria: Categoria): Promise<Categoria>{

        return await this.categoriaReposiroy.save(categoria)
    }


    async update(categoria: Categoria): Promise<Categoria>{

        await this.findById(categoria.id)

        return await this.categoriaReposiroy.save(categoria)
    }

    
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        return await this.categoriaReposiroy.delete(id)
        }



}

