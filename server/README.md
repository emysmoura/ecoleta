<p align="center">
  <img src="/web/src/assets/logo.svg"/>
</p>

# Backend

# Tecnologias Utilizadas 🚀
Typescript</br>
NodeJS<br />
Express<br />
Knex<br />
Cors<br />
SQLite<br />
Entre outras...

# Estrutura de Pastas 🗃️

    ├── src
        ├── controllers    # Controllers das entidades da aplicação
        └── database       # Arquivos que atuam na camada do banco de dados.

Para a pasta database, há a pasta de migrations e seeds.
                 
     ├── database
            ├── migrations  # "Controle de versão do banco de dados", responsável por mantê─lo atualizado entre o time.
            └── seeds       # Arquivos que têm a responsabilidade de popular o banco de dados em na primeira inicialização.

# Rotas 🛣️
<code>post/points</code>: Criação de um novo ponto de coleta. Recebe "name", "email", "whatsapp", "latitude", "longitude",
"city", "uf", "itens" no corpo da requisição. <br />
<code>get/items</code>: Lista todos os tipos de itens disponíveis para reciclagem; <br />
<code>get/points</code>: Lista todos os pontos de coleta dado um filtro. Recebe "city", "uf" e "item" como query params.<br />
<code>get/points/:id</code>: Lista um ponto de coleta específico, recebe o id do ponto como route param.<br />

<br />

# Como utilizar o repositório backend? 🤔
  1. Clone esse repositório utilizando <code>git clone</code>.
  2. Navegue até a pasta 'backend'.
  3. Rode o comando <code> npm install </code> na raíz da pasta para baixar as dependências.
  4. Rode o comando <code> npm start</code> para inicializar o servidor.


Feito com 💜 por <a href="https://github.com/emysmoura/" target="_blank">emysmoura</a>.
