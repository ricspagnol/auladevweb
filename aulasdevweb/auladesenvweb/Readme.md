Inicialmente para rodar o sistema existe uma série de dependências:
docker
npm
nvm
node

Para instalar o docker no ubuntu é necessário adicionar os repositórios abaixo:

```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Para instalar o docker

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Depois disso é importante entrar no projeto na pasta ```desenvwebback``` e rodar o comando ```docker compose up -d``` isso fará o docker iniciar uma instância de uma imagem postgres e expor a porta 5432.

Também é importante instalar as dependências do projeto já que a pasta node_modules não existe:

```
npm i
```

Depois é necessário entrar na pasta blog e fazer a migration para criar as tabelas do banco de dados:

```
cd src/module/blog/
npx sequelize-cli db:migrate
```

Após criar as tabelas no banco, pode-se iniciar o projeto com na pasta raíz do projeto:

```
node index.js
```

Depois de inicilizar o projeto do back-end na porta 8080 é necessário rodar o front.
Antes disso instale uma extensão que resolva o problema do CORS do navegador com a easycors ou outra de sua prefência, mas que funcione :D.

Dentro da pasta front:

```
npm i

npm start
```

Pronto :)
