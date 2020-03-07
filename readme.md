# Boilerplate for NodeJS Express REST API projects using Sequelize ORM

## Boilerplate content
- my folder structure to keep project source code maintainable
- basics settings of Sequelize ORM
- MySQL driver as a dependency
- setupdb npm command for re-generate the database with the migrations and seeders
- NodeJS Express REST API with:
  - CORS settings
  - one default controller including one route
  - one model, migration and seeder for user table

## Setup

- git clone
- rename the express-sql-boilerplate folder to your project name
- remove existing git remote from the repository with git remote remove origin
- add your empty GitHub project as a new origin with git remote add origin [your GitHub project URL]
- push the boilerplate to the master branch: git push -u origin master
- npm i
- modify config/config.json
- .\node_modules\.bin\sequelize db:create
- npm run setupdb

## Folder and file structure

- /config - Sequelize ORM configuration
- /controllers - Contains routing
- /db
  - /config - Database configuration
  - /daos - Data Access Objects for database operations
  - /migrations - Sequelize migrations
  - /models - Sequelize models
  - /seeders - Sequelize seeders
- /services - Business logic without DB operations
- .gitignore
- .sequelizerc - Sequelize ORM settings
- package.json
- readme.md

## Usage

1) setup following the Setup section
2) add your routes to the proper controller (eg.: user related routes to the /controllers/user.js)
3) add your DAO operations like getAll, add, etc. to the proper DAO (e.g.: user related things to the /db/daos/user.js)
4) add your models, migrations, seeders following the official documentation of Sequelize ORM
5) run npm run setupdb command to re-generate the whole database every time you changed something
