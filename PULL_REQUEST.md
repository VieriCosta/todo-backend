# Corelab Challenge - Backend

## Descrição
Este PR implementa a **API do To-Do App**, utilizando **Node.js + TypeScript + Express + MongoDB**.  
Inclui **validação, documentação, testes, Docker e CI/CD**.

---

## Tecnologias
- Node.js + TypeScript
- Express
- MongoDB (Mongoose)
- Zod (validação)
- Jest + Supertest + MongoDB Memory Server (testes)
- Swagger (documentação)
- Docker + Docker Compose
- ESLint + Prettier
- GitHub Actions (CI/CD)

---

## Funcionalidades
- CRUD de tarefas.
- Marcar/desmarcar como **favorito**.
- Definir **cor** para cada tarefa.
- Filtros por **favoritos** e **cor**.
- Documentação da API via **Swagger** em `/docs`.
- Testes automatizados com Jest + Supertest.
- Pipeline de CI/CD no GitHub.

---

##  Como rodar

### Localmente
```bash
npm install
npm run dev
API em: http://localhost:4000/api/todos
Swagger: http://localhost:4000/docs

Com Docker
bash
Copiar código
docker-compose up -d --build
API → http://localhost:4000/api/todos

Swagger → http://localhost:4000/docs

MongoDB → mongodb://localhost:27017

Testes
bash
Copiar código
npm run test
Os testes usam MongoDB em memória, não precisa de container ativo.
Cobrem:

Criar tarefa

Listar tarefas

Atualizar tarefa (favoritar)

Deletar tarefa

CI/CD
Pipeline configurado em .github/workflows/ci.yml
Roda automaticamente em cada push/PR:

Lint (npm run lint)

Build (TypeScript)

Testes (Jest + Supertest)