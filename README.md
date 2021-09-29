# Gekiron（仮）

部屋にいる人に対してお題を提示し，各々が答えを考える．出た答えの中から「正解」を議論する．

## Build Environment
### Requirements
- Docker
	- https://docs.docker.com/get-docker/

- VSCode(Option)
    - https://code.visualstudio.com/download
    - Extentions - Remote Development

### Intall Dependent Packages
コンテナ内で依存パッケージのインストール．
```sh
docker-compose run --rm app npm install
```
### Start docker
Dockerを立ち上げる．
```sh
docker-compose up -d
```
ブラウザで"localhost:3000"を開くと，アプリに接続できる．

## VSCode Setup
### Enter a container in VSCode
コマンドパレットを開き，"Remote-Containers: Open Folder in Container..."を選ぶ．".devcontainer"を含むディレクトリで"open"を押す．

### Build
VSCode上でDockerコンテナに接続したあと，Terminalを開き，Webpackのビルド．
```sh
npm run build
```

### Start App
フロントエンド側でwebpack-dev-server（localhost:8080）を起動したい場合は
```sh
npm run client
```
バックエンド側でサーバー（localhost:3000）を起動したい場合は
```sh
npm run server
```
どちらも起動したい場合は
```sh
npm run dev
```

## Setup MySQL
### Initialize database
既にデータベースを生成していた場合，以下のコマンドで初期化する．
```sh
docker-compose run --rm app npx sequelize-cli db:migrate:undo:all
```

### Run DB migration
DBマイグレーションを実行
```sh
docker-compose run --rm app npx sequelize-cli db:migrate
```

### Insert data
次に，データベースに初期データを挿入
```sh
docker-compose run --rm app npx sequelize-cli db:seed:all
```

### Run MySQL
データベースの中身を確認したい場合は
```sh
docker-compose up -d
```
でコンテナを起動し，以下のコマンドを入力すると，mysqlを起動できる．パスワードは"password1234"．
```sh
docker-compose exec mysql mysql -uroot -p
```

## References
- https://qiita.com/ohs30359-nobuhara/items/bdc06b2db1bef7af2439
- https://ishida-it.com/blog/post/2019-11-21-docker-nodejs/
- https://ishida-it.com/blog/post/2019-11-22-docker-nodejs-vscode/
- https://ishida-it.com/blog/post/2019-11-23-docker-nodejs-mysql/
