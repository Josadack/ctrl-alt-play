import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Between, DeleteResult, ILike, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { Produto } from "../entities/produtos.entity";
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
            throw new HttpException('⚠️ Produto não encontrado! ⛓️‍💥', HttpStatus.NOT_FOUND)
        
        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]>{
        const results = await this.pordutoReposiroy.find({
            where: {
                nome: ILike(`%${nome}%`)
            }, 
             relations: {
                categoria: true}
        })

        if (results.length === 0) {  
            throw new HttpException(`⚠️ Nenhum resultado encontrado com o ${nome}`, HttpStatus.NOT_FOUND);  // Trate o erro conforme necessário  
            }  
        
        return results;
    }


    async findByPrecoMenor(preco: number): Promise<Produto[]>{
        return this.pordutoReposiroy.find({
            where: {  
                preco: LessThanOrEqual(preco) // filtrar preços menores  
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
                preco: MoreThanOrEqual(preco) //  filtrar preços maiores  
            },  
            relations: { categoria: true },  
            order: {  
                preco: "DESC",  
            }  
        })
        
    }

    async findByIntervalo(n: number, n2: number): Promise<Produto[]>{

        const results = await this.pordutoReposiroy.find({
               where: {
                      preco: Between(n, n2)
                  },
                  relations: {categoria: true},
                  order: {  
                      preco: "ASC",  
                  }
              })

         if (! results.length)  
                throw new HttpException(`⚠️ Nenhum intervalo encontrado entre ${n} / ${n2}`, HttpStatus.NOT_FOUND);  // Trate o erro conforme necessário  
             

        return results;
      }

    async countProdutosPorCategoria(genero: string): Promise<{ categoria: string; quantidade: number,  }[]> {  

        const results = await this.pordutoReposiroy.createQueryBuilder('produto')  
          .innerJoin('produto.categoria', 'categoria')  
          .where('categoria.genero LIKE :genero', { genero: `%${genero}%` })  
          .groupBy('categoria.genero')  
          .select(['categoria.genero AS Gênero', 'COUNT(produto.id) AS Quantidade', 'GROUP_CONCAT(produto.nome) AS Jogos'])  
          .getRawMany()  

        if (results.length === 0) {  
            throw new HttpException(`⚠️ Nenhum resultado encontrado com o ${genero} `, HttpStatus.NOT_FOUND);  // Trate o erro conforme necessário  
            }  
        
        return results;
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

