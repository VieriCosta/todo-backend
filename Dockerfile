# Usar Node.js 16
FROM node:16

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas package.json e package-lock.json (melhor para cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta do servidor
EXPOSE 4000

# Comando para rodar a API
CMD ["npm", "run", "dev"]
