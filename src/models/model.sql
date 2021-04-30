create database buyurtma_app;

create table products (
  product_id serial not null primary key,
  product_name varchar(32) not null,
  product_photo varchar(60) not null,
  product_price int not null
);

create table tables (
  table_id serial not null primary key,
  table_number smallint
);

create table orders(
  order_id serial not null primary key,
  product_id int not null references products(product_id),
  table_id int not null references tables(table_id)
);

insert into products(product_name, product_photo, product_price) values
('Osh', 'osh-img.jpg', 18000),
('Shashlik', 'shashlik-img.jpg', 15000);

insert into tables(table_number) values
(1),
(2),
(3),
(4),
(5),
(6);