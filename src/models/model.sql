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

select
  o.order_id,
  t.table_number,
  p.product_name as name,
  p.product_price as price,
  p.product_photo as photo
from
  orders as o
join
  products as p on p.product_id = o.product_id
join
  tables as t on t.table_id = o.table_id
;


create extension "pgcrypto"; -- passwordni shifirlab saqlash uchun

create table users(
  user_id serial not null primary key,
  username varchar(30) not null,
  password varchar(60) not null
);

insert into users(username, password) values
('abdulloh', crypt('1234', gen_salt('bf')));

select user_id, username from users where username = 'abdulloh' and password = crypt('1234', password);
