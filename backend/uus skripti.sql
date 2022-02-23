-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`matkaaja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matkaaja` (
  `idmatkaaja` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `etunimi` VARCHAR(45) NULL DEFAULT NULL,
  `sukunimi` VARCHAR(45) NULL DEFAULT NULL,
  `nimimerkki` VARCHAR(45) NULL DEFAULT NULL,
  `paikkakunta` VARCHAR(45) NULL DEFAULT NULL,
  `esittely` VARCHAR(500) NULL DEFAULT NULL,
  `kuva` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idmatkaaja`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`matka`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matka` (
  `idmatkaaja` INT(10) UNSIGNED NOT NULL,
  `alkupvm` DATE NULL DEFAULT NULL,
  `loppupvm` DATE NULL DEFAULT NULL,
  `yksityinen` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`idmatkaaja`),
  CONSTRAINT `fk_matkaaja_has_matkakohde_matkaaja`
    FOREIGN KEY (`idmatkaaja`)
    REFERENCES `mydb`.`matkaaja` (`idmatkaaja`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`matkakohde`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matkakohde` (
  `idmatkakohde` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `kohdenimi` VARCHAR(45) NULL DEFAULT NULL,
  `maa` VARCHAR(45) NULL DEFAULT NULL,
  `paikkakunta` VARCHAR(45) NULL DEFAULT NULL,
  `kuvausteksti` VARCHAR(500) NULL DEFAULT NULL,
  `kuva` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idmatkakohde`))
ENGINE = InnoDB
AUTO_INCREMENT = 103
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`tarina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tarina` (
  `idmatkaaja` INT(10) UNSIGNED NOT NULL,
  `idmatkakohde` INT(10) UNSIGNED NOT NULL,
  `pvm` DATE NULL DEFAULT NULL,
  `teksti` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`idmatkaaja`, `idmatkakohde`),
  INDEX `fk_tarina_matkakohde1_idx` (`idmatkakohde` ASC),
  CONSTRAINT `fk_tarina_matka1`
    FOREIGN KEY (`idmatkaaja`)
    REFERENCES `mydb`.`matka` (`idmatkaaja`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarina_matkakohde1`
    FOREIGN KEY (`idmatkakohde`)
    REFERENCES `mydb`.`matkakohde` (`idmatkakohde`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`kuva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`kuva` (
  `idmatkaaja` INT(10) UNSIGNED NOT NULL,
  `idmatkakohde` INT(10) UNSIGNED NOT NULL,
  `kuva` VARCHAR(45) NULL DEFAULT NULL,
  INDEX `fk_kuva_tarina1_idx` (`idmatkaaja` ASC, `idmatkakohde` ASC),
  CONSTRAINT `fk_kuva_tarina1`
    FOREIGN KEY (`idmatkaaja` , `idmatkakohde`)
    REFERENCES `mydb`.`tarina` (`idmatkaaja` , `idmatkakohde`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
