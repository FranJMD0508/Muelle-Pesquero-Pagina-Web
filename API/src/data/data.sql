Create table if not exists Herramientas(
    id serial primary key,
    codigo_herramienta varchar(100) unique not null,
    herramienta varchar(100)  not null,
    cantidad_herramienta int not null default 0
)

Create table if not exists Pescados(
    id serial primary key,
    codigo_pescado varchar(100) unique not null,
    pescado varchar(100)  not null,
    peso_pescado float not null default 0
)