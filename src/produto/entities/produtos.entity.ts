import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NumericTransformer } from "../util/numericTransformer";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_produtos"})
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    nome: string;

  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    console: string;

    @UpdateDateColumn()
    data_compra: Date;


    @IsNotEmpty()
    @Column({length: 5000, nullable:false})
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

    /**
     * Observe que a Classe NumericTransformer foi inserida dentro do decorador @Column,
     * na propriedade transformer, que especifica um transformador de valor, que deve ser 
     * usado nesta coluna ao converter os dados do objeto em um JSON e vice-versa, sempre que for
     * ler ou gravar os dados no Banco de dados.
     * Desta forma, ao efetuar uma consulta, o atributo preco será exibido no JSON como um número decimal,
     * ao invés de ser exibido como uma string (entre aspas).
     */


}