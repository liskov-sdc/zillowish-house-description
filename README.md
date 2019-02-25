# Getting Started with sadie's zillowish

1. clone this repo
2. navigate to the repo's directory on you machine and in a terminal run `npm install`
3. at the root level, create a `config.js` file containing:

```
let username = 'your_username';
let password = 'your_password';

module.exports = {username, password};
```
4. Create a database named `zillow`

for example:

```
$ psql -U username -p
$ postgres=# create database zillow;
$ postgres=# \q
```
5. navigate back to the repo in the terminal and run `npm run seed-db` to seed the database
6. To run the app: open two terminals, navigate to the repo and run `npm run build` and `npm start`
7. Open a browser and view the service at localhost:3001