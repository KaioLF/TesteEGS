/*Utilizando C# escreva um console application para resolver os exercício
abaixo:
Durante a black-friday uma empresa deu 60% de desconto nos seus
seguintes produtos:
- Notebook dell - 2.834,53
- Teclado microsoft - 148,00
1 - O usuário deve poder informar o valor do produto;
2 - O programa deve listar a saída conforme o exemplo;
1- Entrada:
Valor do produto;
2 - Saída (exemplo):
Produto custava: 2.834,53
Com o desconto: 1.700,71
Valor do desconto: 1.133,82*/

using System;


namespace TesteEGS
{
    class Program
    {
        static void Main(string[] args){

        Console.WriteLine("*************TESTE EGS*************");
        Console.Write("Informe o valor do produto:");
        decimal valorProduto = Convert.ToDecimal(Console.ReadLine());
        string output = CalcularDesconto(valorProduto);
        Console.WriteLine(output);
        }

        static string CalcularDesconto(decimal valorProduto){
            decimal valorComDesconto = valorProduto - (valorProduto * 60) / 100;
            decimal valorDesconto = (valorProduto * 60) / 100;

            string output = 
            "Produto Custava: " + valorProduto.ToString("N2") + Environment.NewLine + 
            "Valor com o desconto: " + valorComDesconto.ToString("N2") + Environment.NewLine +
            "Valor do desconto: " + valorDesconto.ToString("N2");
            return output;
        }

    }
}
