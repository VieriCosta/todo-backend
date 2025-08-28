Todo Backend (Corelab)

API REST em Node.js + Express + TypeScript com MongoDB (Mongoose) para gerenciar listas de tarefas (todos), incluindo:

CRUD completo

Favoritar/desfavoritar

Cor por tarefa

Filtros por favorito e cor

Swagger (OpenAPI) em /api-docs

Seed automática

Testes (Jest + Supertest)

Docker (API + MongoDB)

ESLint/Prettier

Compatível com Node v20.

📦 Stack

Node.js 20.x + TypeScript

Express

Mongoose (MongoDB)

Jest + Supertest

Swagger UI (OpenAPI)

Docker + docker-compose

ESLint + Prettier

dotenv para variáveis de ambiente

🚀 Como rodar
1) Com Docker (recomendado)
docker compose up --build
# API: http://localhost:4000
# Swagger: http://localhost:4000/api-docs
# Mongo: localhost:27017 (container "todo-mongo")

2) Local (sem Docker)

Pré-requisitos

MongoDB rodando localmente (ex.: mongodb://127.0.0.1:27017)

Node 20.x e npm

Instalação e dev

npm i
npm run dev
# API: http://localhost:4000
# Swagger: http://localhost:4000/api-docs


Em desenvolvimento (NODE_ENV=development) a seed é aplicada automaticamente na subida do servidor.

🔧 Variáveis de Ambiente

Crie um .env na raiz:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/todo
NODE_ENV=development


Em testes, o Jest força NODE_ENV=test e utiliza outro banco (configurado nos testes).

🧭 Endpoints

Base: /api/todos

Método	Rota	Descrição
GET	/api/todos	Lista todos (com filtros opcionais)
POST	/api/todos	Cria uma nova tarefa
PUT	/api/todos/:id	Atualiza campos de uma tarefa
DELETE	/api/todos/:id	Remove uma tarefa
Filtros (GET /api/todos)

favorite=true|false → filtra favoritos

color=#hex → filtra por cor exata

Exemplos

# listar todos
curl http://localhost:4000/api/todos

# listar apenas favoritos
curl "http://localhost:4000/api/todos?favorite=true"

# listar pela cor
curl "http://localhost:4000/api/todos?color=%23ffeeaa"

Payloads
Criar (POST /api/todos)
{
  "title": "Estudar Corelab",
  "description": "CRUD, favoritos e cor",
  "color": "#ffeeaa",
  "favorite": true
}

Atualizar (PUT /api/todos/:id)
{
  "title": "Novo título (opcional)",
  "description": "Nova descrição (opcional)",
  "color": "#aaffee",
  "favorite": false
}


Compatibilidade: a API aceita e retorna o campo favorite, mas persiste internamente como isFavorite. O controller faz o mapeamento automaticamente.

📑 Swagger (OpenAPI)

UI: GET /api-docs

A definição cobre rotas, params e payloads principais.

🧪 Testes

Testes de integração com Jest + Supertest (CRUD completo)

npm test


Os testes sobem o app em memória e conectam num banco de teste, limpando os dados por suíte.

🗂️ Estrutura do projeto
src/
  controllers/
    todoController.ts     # CRUD + alias favorite ↔ isFavorite
  models/
    todo.ts               # schema Mongoose (timestamps e validações)
  routes/
    todoRoutes.ts         # rotas e anotações Swagger
  middleware/
    errorHandler.ts       # tratamento unificado de erros
  db.ts                   # conexão Mongo (log do URI usado)
  seed.ts                 # seed inicial (somente dev)
  swagger.ts              # setup Swagger
  index.ts                # bootstrap do Express
tests/
  tudo.test.ts            # cenários CRUD com Supertest

🧠 Decisões técnicas

Alias favorite: o cliente trabalha com favorite; o banco guarda isFavorite. O controller traduz ambos os sentidos para manter semântica boa no front sem quebrar contratos antigos.

Seed controlada: roda apenas em NODE_ENV !== "production" para evitar poluição em produção.

Atualização total (PUT): aceita campos parciais — ideal para o front fazer toggle de favorito e troca de cor rapidamente.

Error handling: middleware único (errorHandler) padroniza respostas e evita try/catch repetitivo nas rotas.

🧰 Scripts úteis
npm run dev      # ts-node-dev (dev server)
npm run build    # compila TS -> JS
npm start        # inicia a versão compilada
npm test         # testes (jest)
npm run lint     # eslint
npm run format   # prettier

🐳 Docker
Subir
docker compose up --build

Parar e remover
docker compose down -v


O docker-compose.yml sobe API (porta 4000) e MongoDB (porta 27017) em rede interna. A API usa MONGO_URI=mongodb://mongo:27017/todo.

❗ Troubleshooting

ECONNREFUSED 127.0.0.1:27017
Mongo não está rodando. Soluções:

Rode docker compose up ou

Suba seu Mongo local em 127.0.0.1:27017 e confirme MONGO_URI.

OverwriteModelError: Cannot overwrite 'Todo' model once compiled
Evite registrar o mesmo model mais de uma vez. O arquivo src/models/todo.ts exporta com:

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);


Windows/WSL
Se usar WSL2 + Docker Desktop, prefira mongodb://mongo:27017 quando estiver dentro do container, e mongodb://127.0.0.1:27017 ao rodar localmente.

Seed não rodou
Confirme NODE_ENV=development. Em prod, a seed é desabilitada propositalmente.

✅ Checklist de validação manual

POST /api/todos cria uma tarefa

GET /api/todos lista a tarefa criada

PUT /api/todos/:id com { "favorite": true } marca favorito

PUT /api/todos/:id com { "color": "#ffeeaa" } define cor

DELETE /api/todos/:id remove

Swagger acessível em /api-docs