# IGTI - Desafio Final
## Aplicação para controle financeiro pessoal

### Configuração local

    $ sudo mkdir -p /storage/docker/finance-control/mongodb-data

    $ docker run --name docker-financecontrol -v /storage/docker/finance-control/mongodb-data:/data/db -p 27017:27017 -d mongo

    $ cd igti-finance-control && yarn install && cd client && yarn install && cd ..

    $ yarn server

    $ cd client && yarn start