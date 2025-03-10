create database estacionamentoCarros;

use estacionamentoCarros;

create table cadastro(
id int auto_increment primary key,
placa varchar(255) not null,
modelo varchar(255) not null,
infoCarro varchar(255) not null,
dono varchar(255) not null,
cpf varchar(255) not null
);

create table pessoas(
cpf varchar(255) not null,
nome varchar(255) not null
);

select * from cadastroCarros;
