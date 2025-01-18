import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, In, LessThan, MoreThan, Repository } from "typeorm";
import { Produto } from "../entities/produtos.entity";
import { promises } from "dns";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private pordutoReposiroy: Repository<Produto>,
        private categoriaService: CategoriaService
    ){}

    async findAll(): Promise<Produto[]>{
        return this.pordutoReposiroy.find({
            relations: {categoria: true}
        })
    }

    async findById(id: number): Promise<Produto>{
        const produto = await this.pordutoReposiroy.findOne({
            where: {
                id
            },  relations: {categoria: true}
        })
        if(!produto)
            throw new HttpException('Produto não encontrado! ⛓️‍💥', HttpStatus.NOT_FOUND)
        
        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]>{
        return this.pordutoReposiroy.find({
            where: {
                nome: ILike(`%${nome}%`)
            },  relations: {categoria: true}
        })
    }


    async findByPrecoMenor(preco: number): Promise<Produto[]>{
        return this.pordutoReposiroy.find({
            where: {  
                preco: LessThan(preco) // filtrar preços menores  
            },  
            relations: { categoria: true },  
            order: {  
                preco: "ASC",  
            }
        })
    }


    async findByPrecoMaior(preco: number): Promise<Produto[]>{
        return this.pordutoReposiroy.find({
            where: {  
                preco: MoreThan(preco) //  filtrar preços maiores  
            },  
            relations: { categoria: true },  
            order: {  
                preco: "DESC",  
            }  
        })
    }


    async create(produto: Produto): Promise<Produto>{

        await this.categoriaService.findById(produto.categoria.id)

        return await this.pordutoReposiroy.save(produto)
    }


    async update(produto: Produto): Promise<Produto>{

        await this.findById(produto.id)

        await this.categoriaService.findById(produto.categoria.id)

        return await this.pordutoReposiroy.save(produto)
    }

    
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        return await this.pordutoReposiroy.delete(id)
        }



}

