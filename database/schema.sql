DROP DATABASE IF EXISTS open_house;
CREATE DATABASE open_house;

USE open_house;

CREATE TABLE users
(	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    role varchar(50) NOT NULL,
    password varchar(80) NOT NULL,
    createdAt timestamp NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE properties
(	id int NOT NULL AUTO_INCREMENT,
	address varchar(50) NOT NULL,
    landlord_name varchar(50) NOT NULL,
    landlord_contact varchar(50) NOT NULL,
    tenant_name varchar(50) NOT NULL,
    tenant_contact varchar(80) NOT NULL,
    createdAt timestamp NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM open_house.users;
SELECT * FROM open_house.properties;