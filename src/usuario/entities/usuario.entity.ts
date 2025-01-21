import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produtos.entity";
import { Transform, TransformFnParams } from "class-transformer";

@Entity({name: "tb_usuarios"})
export class Usuario{

    @PrimaryGeneratedColumn() 
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string;

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string
    
    @IsNotEmpty()
    data_nasc: string;

    @Column({length: 5000 }) 
    foto: string


    @OneToMany(() => Produto, (produto) => produto.usuario )
    produto: Produto[];

    

}