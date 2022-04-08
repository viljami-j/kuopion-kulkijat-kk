DELETE FROM kuva; 

/* Replace filepaths with your own images */
INSERT INTO kuva (kuva, idtarina) VALUES(LOAD_FILE('C:/some_image1.jpg'), 1); 
INSERT INTO kuva (kuva, idtarina) VALUES(LOAD_FILE('C:/some_image2.jpg'), 1); 
INSERT INTO kuva (kuva, idtarina) VALUES(LOAD_FILE('C:/some_image3.jpg'), 2); 
INSERT INTO kuva (kuva, idtarina) VALUES(LOAD_FILE('C:/some_image4.jpg'), 2); 

SELECT * FROM kuva;