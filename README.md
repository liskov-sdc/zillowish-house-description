# Getting Started with sadie's zillowish

This application was developed using node v 10.13.0 and PostgreSQL 11.1
Make sure to have nodemon installed as well.

## Seed Database
1. clone this repo
2. navigate to the repo's directory on your machine and in a terminal run `npm install`
3. at the root level, create a `config.js` file containing the username and password for postgres:

```
let username = 'your_username';
let password = 'your_password';

module.exports = {username, password};
```
4. Create a database named `zillow`

for example:

```
$ psql -U username -p
$ postgres=# create database zillowDescription;
$ postgres=# \q
```
5. navigate back to the repo in the terminal and run `npm run seed-db` to seed the database

## Run the service

1. open two terminals, navigate to the repo and run `npm run build` and `npm start`
2. Open a browser and view the house description services at `http://localhost:3001/houses/1` or `http://localhost:3001/prices/1` (1 is the house id, ids 1-100 are valid)

## CRUD API
> houses endpoint
- ```GET '/houses/:id'``` will return the street, city, state, description, and zipcode data from the zillowDescription database
- ```POST '/houses/:id'``` inserts user inputed house data into the database
- ```PUT '/houses/:id'``` finds the matching id in the database and updates the row data with user inputed data
- ```DELETE '/houses/:id'``` finds the matching id in the database and deletes the row data
> prices endpoint
- ```GET '/prices/:id'``` returns price data from user specified search id. 
- ```PUT '/prices/:id'``` updates the matching row with user inputed data for the specific price listing for a house.
