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
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8_unicode_ci;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`matkaaja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matkaaja` (
  `idmatkaaja` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `etunimi` VARCHAR(45) NULL,
  `sukunimi` VARCHAR(45) NULL,
  `nimimerkki` VARCHAR(45) NULL,
  `paikkakunta` VARCHAR(45) NULL,
  `esittely` VARCHAR(500) NULL,
  `kuva` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(450) NULL,
  PRIMARY KEY (`idmatkaaja`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`matkakohde`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matkakohde` (
  `idmatkakohde` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kohdenimi` VARCHAR(45) NULL,
  `maa` VARCHAR(45) NULL,
  `paikkakunta` VARCHAR(45) NULL,
  `kuvausteksti` VARCHAR(500) NULL,
  `kuva` VARCHAR(45) NULL,
  PRIMARY KEY (`idmatkakohde`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`matka`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matka` (
  `idmatkaaja` INT UNSIGNED NOT NULL,
  `alkupvm` DATE NULL,
  `loppupvm` DATE NULL,
  `yksityinen` TINYINT NULL,
  `idmatka` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idmatka`),
  INDEX `fk_matkaaja_has_matkakohde_matkaaja_idx` (`idmatkaaja` ASC),
  CONSTRAINT `fk_matkaaja_has_matkakohde_matkaaja`
    FOREIGN KEY (`idmatkaaja`)
    REFERENCES `mydb`.`matkaaja` (`idmatkaaja`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tarina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tarina` (
  `idmatkakohde` INT UNSIGNED NOT NULL,
  `pvm` DATE NOT NULL,
  `teksti` VARCHAR(500) NULL,
  `idmatka` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idmatkakohde`, `idmatka`),
  INDEX `fk_tarina_matkakohde1_idx` (`idmatkakohde` ASC),
  INDEX `fk_tarina_matka1_idx` (`idmatka` ASC),
  CONSTRAINT `fk_tarina_matkakohde1`
    FOREIGN KEY (`idmatkakohde`)
    REFERENCES `mydb`.`matkakohde` (`idmatkakohde`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarina_matka1`
    FOREIGN KEY (`idmatka`)
    REFERENCES `mydb`.`matka` (`idmatka`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`kuva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`kuva` (
  `idkuva` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `kuva` VARCHAR(45) NULL,
  `tarina_idmatkakohde` INT UNSIGNED NOT NULL,
  `tarina_idmatka` INT UNSIGNED NOT NULL,
  INDEX `fk_kuva_tarina1_idx` (`tarina_idmatkakohde` ASC, `tarina_idmatka` ASC),
  PRIMARY KEY (`idkuva`),
  CONSTRAINT `fk_kuva_tarina1`
    FOREIGN KEY (`tarina_idmatkakohde` , `tarina_idmatka`)
    REFERENCES `mydb`.`tarina` (`idmatkakohde` , `idmatka`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
