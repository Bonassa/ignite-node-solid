# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Dev
Sobre o desenvolvimento desta API SOLID.

### Prisma ORM
Instalação do prisma em desenvolvimento

```bash
  npm install -D prisma
```

Criação do arquivo de configuração
```bash
  npx prisma init
```

Geração das tipagens das tabelas
```bash
  npx prisma generate
```

Instalação do Prisma Client para acesso ao banco
```bash
  npm install @prisma/client
```

Gerar migrations pro banco
```bash
  npx prisma migrate dev
```

### Docker
Para subir os containers dessa aplicação com o docker

```bash
  # subir os containers
  docker compose up -d 

  # parar a execução dos containers
  docker compose stop
```

## SOLID

### D - Dependency Inversion Principle
Principio da inversão de dependências. Geralmente quando estamos utilizando um recurso de alguma dependência, a classe (ou função) faz a instanciação das dependências no próprio código, porém nesse principio, as dependências são recebidas como parâmetros.