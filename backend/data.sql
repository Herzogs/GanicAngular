DROP DATABASE nombreTabla;
CREATE DATABASE nombreTabla;
use nombreTabla;
 
CREATE TABLE `sandwich` (
  `id` double NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `clasificacion` enum('Clásico','Vegetariano','Vegano','Especial') DEFAULT 'Clásico',
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
 
CREATE TABLE `usuario` (
  `id` double NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Administrador','Cliente') DEFAULT 'Cliente',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO sandwich (nombre, descripcion, precio, clasificacion, imagen) VALUES('LA PARRILLERA', 'Queso provoleta con chimichurri, morcilla, morrón a la plancha, cebolla roja y ketchup ahumado', 5000.00, 'Especial', 'laparrillera.png');
INSERT INTO sandwich (nombre, descripcion, precio, clasificacion, imagen) VALUES('LA CLASICA', 'Queso pategrás, tomates marinados, lechuga capuchina y alioli', 4000.00, 'Clásico', 'laclasica.png');
INSERT INTO sandwich (nombre, descripcion, precio, clasificacion, imagen) VALUES('LA CAPRICHOSA', 'Queso ahumado, guacamole, aros de cebolla, rúcula, lechuga capuchina y mostaza dulce', 6000.00, 'Especial', 'lacaprichosa.png');
INSERT INTO sandwich (nombre, descripcion, precio, clasificacion, imagen) VALUES('LA GRAN VEGE', 'Queso provoleta con chimichurri, morcilla, morrón a la plancha, cebolla roja y ketchup ahumado', 4500.00, 'Vegetariano', 'lagranvege.png');
INSERT INTO sandwich (nombre, descripcion, precio, clasificacion, imagen) VALUES('EL BOSQUE', 'Queso ahumado, rúcula, menta, pickle de hongos de pino y mayonesa de merken', 6000.00, 'Vegano', 'delbosque.png');