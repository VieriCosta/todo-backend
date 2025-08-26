# 📝 Todo Backend (Corelab Challenge)

API de gerenciamento de tarefas, desenvolvida em **Node.js + TypeScript + Express + MongoDB**, com suporte a **Docker, Swagger, validação, testes e CI/CD**.

---

## 🚀 Funcionalidades
- Criar, listar, atualizar e deletar tarefas.
- Marcar tarefas como **favoritas**.
- Definir **cor** (hexadecimal) para cada tarefa.
- **Filtros por favorito e cor** (`GET /api/todos?favorite=true&color=#ff0000`).
- **Swagger Docs** em `/docs`.
- **Validação** com `zod`.
- **Testes** com Jest + Supertest + MongoDB Memory Server.
- **CI/CD** com GitHub Actions.

---

## 📂 Estrutura
todo-backend/
├── src/
│ ├── controllers/ # Lógica das rotas
│ ├── middleware/ # Middlewares
│ ├── models/ # Modelos (Mongoose)
│ ├── routes/ # Definição das rotas
│ ├── validators/ # Validações com zod
│ ├── db.ts # Conexão com Mongo
│ ├── index.ts # App principal
│ └── swagger.ts # Configuração do Swagger
├── tests/ # Testes com Jest
├── .github/workflows/ # CI/CD
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md

yaml
Copiar código

---

## ⚙️ Como rodar

### ▶️ Localmente
```bash
# Instalar dependências
npm install

# Rodar em dev
npm run dev
A API sobe em: http://localhost:4000

🐳 Com Docker
bash
Copiar código
docker-compose up -d --build
API: http://localhost:4000/api/todos

Swagger: http://localhost:4000/docs

MongoDB: mongodb://localhost:27017

📌 Exemplos de Rotas
Criar tarefa
h
Copiar código
POST /api/todos
Content-Type: application/json

{
  "title": "Estudar React",
  "description": "Hooks",
  "color": "#ff0000"
}
Listar tarefas (com filtros)
http
Copiar código
GET /api/todos?favorite=true&color=#ff0000
🧪 Testes
Rodar Jest:

bash
Copiar código
npm run test
Usa MongoDB em memória → não precisa de banco rodando.

🚀 CI/CD
Configurado em .github/workflows/ci.yml.

Executa automaticamente:

Lint

Build (TS)

Testes