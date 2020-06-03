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
-- Table `Restaurante`.`Adicionales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Adicionales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `tipo` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Adicional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Adicional` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) NULL,
  `precio` DOUBLE NULL,
  `Adicionales_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Adicional_Adicionales_idx` (`Adicionales_id` ASC) VISIBLE,
  CONSTRAINT `fk_Adicional_Adicionales`
    FOREIGN KEY (`Adicionales_id`)
    REFERENCES `Restaurante`.`Adicionales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Plato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Plato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `detalle` VARCHAR(45) NULL,
  `precio` DOUBLE NULL,
  `disponibles` INT NULL,
  `imagen` VARCHAR(45) NULL,
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
  `exacta` VARCHAR(45) NULL,
  `Persona_correo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Direccion_Persona1_idx` (`Persona_correo` ASC) VISIBLE,
  CONSTRAINT `fk_Direccion_Persona1`
    FOREIGN KEY (`Persona_correo`)
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
  `Persona_correo` VARCHAR(45) NOT NULL,
  `Direccion_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Orden_Persona1_idx` (`Persona_correo` ASC) VISIBLE,
  INDEX `fk_Orden_Direccion1_idx` (`Direccion_id` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_Persona1`
    FOREIGN KEY (`Persona_correo`)
    REFERENCES `Restaurante`.`Persona` (`correo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orden_Direccion1`
    FOREIGN KEY (`Direccion_id`)
    REFERENCES `Restaurante`.`Direccion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Plato_Adicionales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Plato_Adicionales` (
  `Plato_id` INT NOT NULL,
  `Adicionales_id` INT NOT NULL,
  PRIMARY KEY (`Plato_id`, `Adicionales_id`),
  INDEX `fk_Plato_has_Adicionales_Adicionales1_idx` (`Adicionales_id` ASC) VISIBLE,
  INDEX `fk_Plato_has_Adicionales_Plato1_idx` (`Plato_id` ASC) VISIBLE,
  CONSTRAINT `fk_Plato_has_Adicionales_Plato1`
    FOREIGN KEY (`Plato_id`)
    REFERENCES `Restaurante`.`Plato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plato_has_Adicionales_Adicionales1`
    FOREIGN KEY (`Adicionales_id`)
    REFERENCES `Restaurante`.`Adicionales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Categoria_Plato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Categoria_Plato` (
  `Categoria_id` INT NOT NULL,
  `Plato_id` INT NOT NULL,
  PRIMARY KEY (`Categoria_id`, `Plato_id`),
  INDEX `fk_Categoria_has_Plato_Plato1_idx` (`Plato_id` ASC) VISIBLE,
  INDEX `fk_Categoria_has_Plato_Categoria1_idx` (`Categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_Categoria_has_Plato_Categoria1`
    FOREIGN KEY (`Categoria_id`)
    REFERENCES `Restaurante`.`Categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Categoria_has_Plato_Plato1`
    FOREIGN KEY (`Plato_id`)
    REFERENCES `Restaurante`.`Plato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Restaurante`.`Orden_Plato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Restaurante`.`Orden_Plato` (
  `Orden_id` INT NOT NULL,
  `Plato_id` INT NOT NULL,
  `cantidad` INT NULL DEFAULT 1,
  PRIMARY KEY (`Orden_id`, `Plato_id`),
  INDEX `fk_Orden_has_Plato_Plato1_idx` (`Plato_id` ASC) VISIBLE,
  INDEX `fk_Orden_has_Plato_Orden1_idx` (`Orden_id` ASC) VISIBLE,
  CONSTRAINT `fk_Orden_has_Plato_Orden1`
    FOREIGN KEY (`Orden_id`)
    REFERENCES `Restaurante`.`Orden` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orden_has_Plato_Plato1`
    FOREIGN KEY (`Plato_id`)
    REFERENCES `Restaurante`.`Plato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
