
export class NumericTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string): number {
        return parseFloat(data);
    }

    /**
     * to(data: number): number
Este método será chamado quando os dados estiverem sendo enviados PARA o Banco de dados
Ele recebe um número da sua aplicação e retorna o valor que será salvo no Banco de dados
O método apenas retornará o mesmo número sem modificações
from(data: string): number
Este método será chamado quando os dados estiverem vindo DO Banco de dados, ou seja, o resultado de uma consulta
Ele recebe uma string do Banco de dados e converte esta string para um número float, usando o método de conversão parseFloat()
O método retornará a string convertida em um número decimal, que será usado na sua aplicação
     */
}