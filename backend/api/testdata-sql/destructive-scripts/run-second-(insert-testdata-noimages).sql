DELETE FROM tarina; 
DELETE FROM matkakohde;
DELETE FROM matka;
DELETE FROM matkaaja;

INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (1, "Marko", "Poikala", "Makeboy87", "Lempäälä", "moi. minä olen marko teen videoita", "ei implementoitu", "markonposti@tpk.fi", "topikissa123");
INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (2, "Teppo", "Tappo", "ppoppo", "Helsinki", "Hei. Heviä kuuntelen. Terve vaan!", "ei implementoitu", "moottorisaha@suomi24.fi", "nightwish666");
INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (3, "Tapio", "Karsta", "Takku", "Tampere", "Terve vaan! Tykkään kovin käydä matkustelemassa. Tällä hetkellä tavoitteenani on käydä jokaisessa Suomen lähiössä!", "ei implementoitu", "tarsta@hotmail.com", "jeesus1");
INSERT INTO matkaaja (idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password) VALUES (4, "Ville", "Vihta", "koivu47", "Espoo", "Kovin tykkään saunoa. Varsinkin eri matkakohteissa.", "ei implementoitu", "hajuste4@electricmail.com", "lentavaPuliukko1113");

INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (1, 2, "2016-01-15", "2016-02-09", 0);
INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (2, 4, "2018-02-01", "2018-06-11", 0);
INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (3, 1, "2021-12-20", "2022-01-01", 1);
INSERT INTO matka (idmatka, idmatkaaja, alkupvm, loppupvm, yksityinen) VALUES (4, 3, "2020-01-01", "2020-02-01", 0);

INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (1, "Pullonpohja", "Uzbekistan", "Toshkent", "Tervetuloa viihtyisään Pullonpohjaan, ehta suomalainen baarihotelli hyvin eksoottisella alueella!", "ei implementoitu");
INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (2, "Tšernobylin matkakeskus", "Ukraina", "Tšernobyl", "Miltä näyttää tunnetun ydinonnettomuuden jälkeinen Tšernobylin hylätty kaupunki? Tule ja tutustu koulutettujen ohjaajiemme kanssa!", "ei implementoitu");
INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (3, "Porvoon makeistupa", "Suomi", "Porvoo", "Tutustu Porvoon makeiden makujen aatelistoon!", "ei implementoitu");
INSERT INTO matkakohde (idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (4, "Le Batonque", "Ranska", "Pariisi", "Tervetuloa Ranskan viihtyisimpään hotelliin jonka kylkeen on avannut ovensa jo moni ranskalainen leipomo- ja konditoriatuoteyrittäjä. Läheltä löydät myös kiinnostavat Pariisin katakombit!", "ei implementoitu");

INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (1, "2016-01-18", "Tänään kävimme Pullonpohjassa. Tästä murjusta ei ole mitään hyvää sanottavaa - pahalta haisee ja juomavalikoima on vaatimaton. Luulin kyseessä olevan hyvin kulinaristinenkin kohde, mutta odotusten tilalla oli karvas pettymys.", 1, 1);
INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (2, "2018-03-05", "Päätimme perheen kanssa lähteä viimein yhdessä kunnon matkaan. Valitsimme kohteeksi kuuluisan Porvoon makeistuvan. Täältä ei saunomispuuhaa löytynyt, mutta kohde oli erittäin miellyttävä. Makeisia lähti mukaan koko suvulle vauvasta vaariin.", 3, 2);
INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (3, "2021-12-25", "jouluaaton jälken lähdin tuonne tsernopiyliin ihan vaan kiviä potkimaan. rakennuksia oli paljon mutta jänä oli kyllä paikka, kivinen.", 2, 3);
INSERT INTO tarina (idtarina, pvm, teksti, idmatkakohde, idmatka) VALUES (4, "2020-01-19", "Patongille mentiin lähes patonki nimiseen paikkaan, hahhah. Tuotteita löytyi jokaisen makuun ja Pariisin nähtävyydet tuli koluttua. Hieno matka.", 4, 4);