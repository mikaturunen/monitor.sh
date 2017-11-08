create extension if not exists "uuid-ossp";

create table if not exists "monitors" (
    "id" varchar(50) PRIMARY KEY default LOWER(REPLACE(CAST(uuid_generate_v1mc() As varchar(50)), '-','')),
    "name" varchar(150) not null,
    "location" varchar(250) not null,
    "frequency" serial not null
);