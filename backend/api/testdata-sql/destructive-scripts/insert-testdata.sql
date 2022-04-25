DELETE FROM tarina; 
DELETE FROM matkakohde;
DELETE FROM matka;
DELETE FROM matkaaja;
DELETE FROM kuva; 

INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (1, "Marko", "Poikala", "Makeboy87", "Lempäälä", "moi. minä olen marko teen videoita", "1", "markonposti@tpk.fi", "topikissa123");
INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (2, "Teppo", "Tappo", "ppoppo", "Helsinki", "Hei. Heviä kuuntelen. Terve vaan!", "2", "moottorisaha@suomi24.fi", "nightwish666");
INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (3, "Tapio", "Karsta", "Takku", "Tampere", "Terve vaan! Tykkään käydä matkustelemassa. Tällä hetkellä tavoitteenani on käydä jokaisessa Suomen lähiössä!", "3", "tarsta@hotmail.com", "jeesus1");
INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (4, "Ville", "Vihta", "koivu47", "Espoo", "Kovin tykkään saunoa. Varsinkin eri matkakohteissa.", "4", "hajuste4@electricmail.com", "lentavaPuliukko1113");

INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (1, 2, "2016-01-15", "2016-02-09", 0);
INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (2, 4, "2018-02-01", "2018-06-11", 0);
INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (3, 1, "2021-12-20", "2022-01-01", 1);
INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (4, 3, "2020-01-01", "2020-02-01", 0);

INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (1, "Pullonpohja", "Uzbekistan", "Toshkent", "Tervetuloa viihtyisään Pullonpohjaan, ehta suomalainen baarihotelli hyvin eksoottisella alueella!", "5");
INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (2, "Tšernobylin matkakeskus", "Ukraina", "Tšernobyl", "Miltä näyttää tunnetun ydinonnettomuuden jälkeinen Tšernobylin hylätty kaupunki? Tule ja tutustu koulutettujen ohjaajiemme kanssa!", "6");
INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (3, "Porvoon makeistupa", "Suomi", "Porvoo", "Tutustu Porvoon makeiden makujen aatelistoon!", "7");
INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (4, "Le Batonque", "Ranska", "Pariisi", "Tervetuloa Ranskan viihtyisimpään hotelliin jonka kylkeen on avannut ovensa jo moni ranskalainen leipomo- ja konditoriatuoteyrittäjä. Läheltä löydät myös kiinnostavat Pariisin katakombit!", "8");

INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (1, "2016-01-18", "Tänään kävimme Pullonpohjassa. Tästä murjusta ei ole mitään hyvää sanottavaa - pahalta haisee ja juomavalikoima on vaatimaton. Luulin kyseessä olevan hyvin kulinaristinenkin kohde, mutta odotusten tilalla oli karvas pettymys.", 1, 1);
INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (2, "2018-03-05", "Päätimme perheen kanssa lähteä viimein yhdessä kunnon matkaan. Valitsimme kohteeksi kuuluisan Porvoon makeistuvan. Täältä ei saunomispuuhaa löytynyt, mutta kohde oli erittäin miellyttävä. Makeisia lähti mukaan koko suvulle vauvasta vaariin.", 3, 2);
INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (3, "2021-12-25", "jouluaaton jälken lähdin tuonne tsernopiyliin ihan vaan kiviä potkimaan. rakennuksia oli paljon mutta jänä oli kyllä paikka, mukavan harmaa ja ankea.", 2, 3);
INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (4, "2020-01-19", "Patongeille tuli mentyä. Tuotteita löytyi jokaisen makuun ja Pariisin nähtävyydet tuli koluttua. Hieno matka.", 4, 4);

INSERT INTO kuva (kuva, idtarina) VALUES("story_picture1_1", 1); 
INSERT INTO kuva (kuva, idtarina) VALUES("story_picture1_2", 1); 
INSERT INTO kuva (kuva, idtarina) VALUES("story_picture2_1", 2); 
INSERT INTO kuva (kuva, idtarina) VALUES("story_picture2_2", 2);

INSERT INTO kuva (kuva, idtarina) VALUES(1, "profile_picture1"); 
INSERT INTO kuva (kuva, idtarina) VALUES(2, "profile_picture2"); 
INSERT INTO kuva (kuva, idtarina) VALUES(3, "profile_picture3"); 
INSERT INTO kuva (kuva, idtarina) VALUES(4, "profile_picture4");

INSERT INTO kuva (kuva, idtarina) VALUES(5, "matkakohde_picture1"); 
INSERT INTO kuva (kuva, idtarina) VALUES(6, "matkakohde_picture2"); 
INSERT INTO kuva (kuva, idtarina) VALUES(7, "matkakohde_picture3"); 
INSERT INTO kuva (kuva, idtarina) VALUES(8, "matkakohde_picture4");