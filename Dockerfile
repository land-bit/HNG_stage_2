# Utiliser une image Node.js comme base
FROM node:latest

# Définir le répertoire de travail dans l'image
WORKDIR /home/landbit/Projects/HNG_State_2/

# Copier les fichiers de l'application dans l'image
COPY . .

# Installer les dépendances avec pnpm
RUN npm install -g pnpm
RUN pnpm install

# Exposer le port sur lequel l'application écoute (si nécessaire)
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "node", "app.js" ]
