<h3 align="center">
  <span style="background-color: #312E38">
  <img alt="GoStack" src="assets/Logo.png" style="background-color: #312E38"/>
  </span>
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/J-Keven/gobarber-api?color=blue">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">

  <a href="https://github.com/J-keven/gobarber-api/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/J-Keven/gobarber-api?style=social">
  </a>
</p>


<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-requisios">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-como-usar">Como Usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-contribuir">Como Contribuir</a>&nbsp;&nbsp;&nbsp;
  <!-- <a href="#memo-licença">Licença</a> -->
</p>

## 💈Sobre
O Gobarber é uma aplicação para agendamento de horários em barbearia, onde um cabeleleiro/barbeiro pode cadastrar um horári disponível e o cliente poderá agendar um horário com o cabeleleiro/barbeiro 💈.
## 🔥Requisios
Para ver os requisitos da aplicação [click aqui](https://github.com/J-Keven/Gobarber-api/blob/master/requisitos.md)
## 🔥Como usar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/) v12x** instalado na máquina
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É importante que tenha um **banco Sql** rodando na sua máquina, de preferência postgreSQL.

1. Faça um clone :

```sh
  $ git clone https://github.com/J-Keven/gobarber-api.git
```
2. Entre na pasta da aplicação:
  ```sh
    $ cd gobarber-api
  ```
3. Alterando as informações de conexão com o Banco:
  - Abra o arquivo ``ormconfig.json`` e coloque as informaçõe do seu banco. 
   Ex:
  ```json
  {
    "type": "postgres",//tipo de banco, postgres, mysql
    "host": "localhost",//onde está sedo executando o banco
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "gobarber",//nome do banco
  }
  ```
4. Instale as depedências:
```sh
  # Instale as dependências
  $ yarn
```

5. Executando a Aplicação:
```sh
  # Inicie a API no mode de dev
  $ yarn dev:server

  # Inicie a API no ambiente de produção
  $ yarn start
```

## 🚀 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💜 by [J-keven](github.com/j-keven) :wave: [Entre na nossa comunidade!](https://discordapp.com/invite/gCRAFhc)
