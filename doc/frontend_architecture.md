# Käyttöliittymän arkkitehtuuri

## Hakemistorakenne

### scenes

`/scenes` sisältää sovelluksen näkymät ja näkymäkohtaiset komponentit. Jos komponentti liittyy vain tiettyyn näkymään
eikä sitä ole mahdollista uudelleenkäyttää muissa näkymissä, laita se tänne.

`/scenes`in alla on hakemisto jokaiselle näkymälle, esim. `/scenes/front-page` tai `scenes/destination-search`. Jokainen
näkymä sisältää näkymän pääkomponentin sekä siihen kuuluvat alikomponentit. Tyylitellyt komponentit on hyvä pitää
erillisessä hakemistossa, esim `/scenes/front-page/styled/heroImage.jsx`. Testit puolestaan pidetään hakemistossa
nimeltä `__test__` , esim.`/scenes/front-page/__test__/login.test.js`.

### components

`/components` sisältää sellaisia komponentteja, joita voidaan käyttää useassa eri näkymässä.

### hooks

`/hooks` sisältää itse tehtyjä React-hookkeja.

### util

`/util` sisältää uudelleenkäytettäviä funktioita ja muita tiedostoja, jotka eivät sovi muihin hakemistoihin.