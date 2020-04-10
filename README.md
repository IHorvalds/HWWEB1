# Film App

## Tema 1 laborator tehnici web

### Dependente

1. Node.js >= 10

2. Express.js 

3. EJS

   > Pentru template-uri.

4. UUID

   > Pentru a genera id-uri unice pentru datele incarcate

5. Multer

   > Pentru a accesa datele din cererea POST.



### Observatie

"Baza de date" folosita e doar un fisier JSON, citit si scris la fiecare operatiune. Nu ar fi o idee buna pentru scalare. 

Dar o baza de date NoSQL, ca MongoDB sau Cloud Firestore, ar oferi o scalabilitate mult mai buna si ar fi practic un 'drop-in replacement'.



### 1. HTML Validat folosind

- HTML Validator Chrome Extension (http://users.skynet.be/mgueury/mozilla/)

  > Folosind template-uri, n-am putut verifica markup-ul prin copy/paste intr-un validator. 

### 2. CSS Validat folosind

- https://jigsaw.w3.org/css-validator/#validate_by_input

  > Pentru CSS am folosit un preprocesator, anume SCSS, pentru a genera atributele compatibile cu diferite browsere si pentru a crea selectori mai rapid, fara sa scriu acelasi selector de mai multe ori pentru nivele de specificitate diferite. Atributele scrise de mana sunt cele din fisierele `.scss` .

