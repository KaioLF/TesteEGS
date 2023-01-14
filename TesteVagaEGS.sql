CREATE database TesteVaga

use TesteVaga

CREATE TABLE tb_Pedidos (
	idPedido INT NOT NULL IDENTITY (1,1) PRIMARY KEY,
	nomeCliente VARCHAR (50) NOT NULL,
	dataHoraPedido DATETIME NOT NULL,
	valorTotalPedido DECIMAL (6,2) NOT NULL,
);

CREATE TABLE tb_Produtos (
	idProduto INT NOT NULL IDENTITY PRIMARY KEY,
	nomeProduto VARCHAR (50) NOT NULL,
	valorProduto DECIMAL (18,2) NOT NULL,
);

CREATE TABLE tb_PedidosProdutos(
	idPedidosProdutos int NOT NULL IDENTITY PRIMARY KEY,
	pedidos_idPedido INT NOT NULL FOREIGN KEY REFERENCES tb_Pedidos,
	produtos_idProduto INT NOT NULL FOREIGN KEY REFERENCES tb_Produtos,
	qtdProdutos INT NOT NULL
);


--Inserir um produto na tabela de produtos
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('MONITOR', 10000.00);

--Modificar o valor do produto na tabela de produtos
UPDATE tb_Produtos
SET valorProduto = 999.90
WHERE idProduto = 1;

--Excluir um produto pelo identificador do produto
DELETE FROM tb_Produtos
WHERE idProduto = 1;

--Inserir um pedido na tabela de pedidos
INSERT INTO tb_Pedidos (nomeCliente, dataHoraPedido, valorTotalPedido)
VALUES ('Kaio', '2023-01-12 15:45:30 PM', 999.90)

--Modificar a data\hora do pedido na tabela de pedidos
UPDATE tb_Pedidos
SET dataHoraPedido = '2023-01-13 13:30:30 PM'
WHERE idPedido = 1;

--Excluir um pedido pelo identificador do pedido
DELETE FROM tb_Pedidos
WHERE idPedido = 1;


--Reinserindo produtos
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('MONITOR', 999.90);
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('GABINETE', 300.00);
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('PROCESSADOR', 599.90);
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('PLACA MAE', 640.00);
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('PLACA DE VIDEO', 1200.00);
INSERT INTO tb_Produtos (nomeProduto, valorProduto)
VALUES ('MEMORIA RAM', 180.00);

--Reinserindo pedidos
INSERT INTO tb_Pedidos (nomeCliente, dataHoraPedido, valorTotalPedido)
VALUES ('Kaio', '2023-01-12 15:45:30 PM', 999.90)
INSERT INTO tb_Pedidos (nomeCliente, dataHoraPedido, valorTotalPedido)
VALUES ('Kaio', '2023-01-12 16:11:30 PM', 1200.00)
INSERT INTO tb_Pedidos (nomeCliente, dataHoraPedido, valorTotalPedido)
VALUES ('Kaio', '2023-01-12 16:12:30 PM', 1239.90)
INSERT INTO tb_Pedidos (nomeCliente, dataHoraPedido, valorTotalPedido)
VALUES ('Kaio', '2023-01-12 16:14:30 PM', 480.00)

--Inserir um produto no pedido com quantidade 5
INSERT INTO tb_PedidosProdutos (pedidos_idPedido, produtos_idProduto, qtdProdutos)
VALUES (2, 2, 5)

--Buscar os pedidos mais recentes ordenado pela data e hora do pedido
SELECT * FROM tb_Pedidos
ORDER BY dataHoraPedido;

--Buscar os produtos com menor valor
SELECT * FROM tb_Produtos
WHERE valorProduto < 999.90
ORDER BY valorProduto;

