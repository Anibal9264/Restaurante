-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Restaurante
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Restaurante
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Restaurante` DEFAULT CHARACTER SET utf8 ;
USE `Restaurante` ;

-- -----------------------------------------------------
-- Table `Restaurante`.`Adicional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Adicional` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) NULL,
  `precio` DOUBLE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Adicionales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Adicionales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `tipo` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Plato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Plato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `detalle` VARCHAR(100) NULL,
  `precio` DOUBLE NULL,
  `disponibles` INT NULL,
  `imagen` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Persona` (
  `correo` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `apellidos` VARCHAR(45) NULL,
  `contraseña` VARCHAR(45) NULL,
  `telefono` VARCHAR(45) NULL,
  `isAdmin` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`correo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Direccion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provincia` VARCHAR(45) NULL,
  `canton` VARCHAR(45) NULL,
  `distrito` VARCHAR(45) NULL,
  `exacta` VARCHAR(100) NULL,
  `Persona` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Direccion_Persona1_idx` (`Persona` ASC) VISIBLE,
  CONSTRAINT `fk_Direccion_Persona1`
    FOREIGN KEY (`Persona`)
    REFERENCES `Restaurante`.`Persona` (`correo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Orden` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` DOUBLE NULL,
  `entrega_recoge` TINYINT NULL,
  `fecha` DATETIME NULL DEFAULT "1999-01-01 01:00:00",
  `estado` INT NULL,
  `Persona` VARCHAR(45) NOT NULL,
  `Direccion` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Orden_Persona1_idx` (`Persona` ASC) VISIBLE,
  INDEX `fk_Orden_Direccion1_idx` (`Direccion` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_Persona1`
    FOREIGN KEY (`Persona`)
    REFERENCES `Restaurante`.`Persona` (`correo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orden_Direccion1`
    FOREIGN KEY (`Direccion`)
    REFERENCES `Restaurante`.`Direccion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Plato_Adicionales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Plato_Adicionales` (
  `Plato` INT NOT NULL,
  `Adicionales` INT NOT NULL,
  PRIMARY KEY (`Plato`, `Adicionales`),
  INDEX `fk_Plato_has_Adicionales_Adicionales1_idx` (`Adicionales` ASC) VISIBLE,
  INDEX `fk_Plato_has_Adicionales_Plato1_idx` (`Plato` ASC) VISIBLE,
  CONSTRAINT `fk_Plato_has_Adicionales_Plato1`
    FOREIGN KEY (`Plato`)
    REFERENCES `Restaurante`.`Plato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plato_has_Adicionales_Adicionales1`
    FOREIGN KEY (`Adicionales`)
    REFERENCES `Restaurante`.`Adicionales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Categoria_Plato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Categoria_Plato` (
  `Categoria` INT NOT NULL,
  `Plato` INT NOT NULL,
  PRIMARY KEY (`Categoria`, `Plato`),
  INDEX `fk_Categoria_has_Plato_Plato1_idx` (`Plato` ASC) VISIBLE,
  INDEX `fk_Categoria_has_Plato_Categoria1_idx` (`Categoria` ASC) VISIBLE,
  CONSTRAINT `fk_Categoria_has_Plato_Categoria1`
    FOREIGN KEY (`Categoria`)
    REFERENCES `Restaurante`.`Categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Categoria_has_Plato_Plato1`
    FOREIGN KEY (`Plato`)
    REFERENCES `Restaurante`.`Plato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Orden_Plato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Orden_Plato` (
  `Orden` INT NOT NULL,
  `Plato` INT NOT NULL,
  `cantidad` INT NULL DEFAULT 1,
  `Detalle` VARCHAR(100) NULL DEFAULT 'No',
  PRIMARY KEY (`Orden`, `Plato`),
  INDEX `fk_Orden_has_Plato_Plato1_idx` (`Plato` ASC) VISIBLE,
  INDEX `fk_Orden_has_Plato_Orden1_idx` (`Orden` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_has_Plato_Orden1`
    FOREIGN KEY (`Orden`)
    REFERENCES `Restaurante`.`Orden` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orden_has_Plato_Plato1`
    FOREIGN KEY (`Plato`)
    REFERENCES `Restaurante`.`Plato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Adicionales_has_Adicional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Adicionales_has_Adicional` (
  `Adicionales` INT NOT NULL,
  `Adicional` INT NOT NULL,
  PRIMARY KEY (`Adicionales`, `Adicional`),
  INDEX `fk_Adicionales_has_Adicional_Adicional1_idx` (`Adicional` ASC) VISIBLE,
  INDEX `fk_Adicionales_has_Adicional_Adicionales1_idx` (`Adicionales` ASC) VISIBLE,
  CONSTRAINT `fk_Adicionales_has_Adicional_Adicionales1`
    FOREIGN KEY (`Adicionales`)
    REFERENCES `Restaurante`.`Adicionales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Adicionales_has_Adicional_Adicional1`
    FOREIGN KEY (`Adicional`)
    REFERENCES `Restaurante`.`Adicional` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
