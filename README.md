# ask-suite-crawler

## Descrição

API para extração de informações de reservas do site [LeCanton](https://myreservations.omnibees.com/default.aspx?q=5462&sid=c9b69336-3fbe-43ae-9ec8-338bb64606c0&version=MyReservation)


## Frameworks e libs utilizadas

- [NodeJS - v12.18.2](https://nodejs.org/en/) 
- [Express](https://expressjs.com/pt-br/)
- [Express Validator](https://express-validator.github.io/docs/)
- [Puppeteer](https://pptr.dev/)


## Configuração

- No diretório, \crawler-api, excutar (cmd, terminal): **npm install**


## Execução

- No diretório, \crawler-api, excutar (cmd, terminal): **node app.js**

## Recursos 

- GET: / - Informações sobre os recursos disponíveis
- GET: /rooms - Extração das informações pelo período informado por queryStrings
    - checkIn: 'DD/MM/YYYY'
    - checkOut: 'DD/MM/YYYY'
- [Swaager](https://app.swaggerhub.com/apis/eduardimaa/ask-suite-crawler/1.0.0)


