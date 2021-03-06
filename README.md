# MyDiary app

[![Build Status](https://travis-ci.org/T2Wil/MyDiary.svg?branch=develop)](https://travis-ci.org/T2Wil/MyDiary) 
[![Coverage Status](https://coveralls.io/repos/github/T2Wil/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/T2Wil/MyDiary?branch=develop) 
[![Maintainability](https://api.codeclimate.com/v1/badges/8daa67094b7106d4219c/maintainability)](https://codeclimate.com/github/T2Wil/MyDiary/maintainability)

# Description

MyDiary is an online journal where users can pen down their thoughts and feelings.

# Setup

- Install `Git` locally
- Install `NodeJS` locally
- Clone the repo with `git clone` command
- run `npm install` to install all the dependencies locally

# Scripts to use

- run `npm run start:server` to start server
- run `npm run start:test` to run tests
- run `npm run start:coverage` to run and view test coverages

# API endpoints

- POST `api/v2/auth/signup` Create user account.
- POST  `api/v2/auth/signin` Login a user.

   **API endpoints with authentication requirements**

- POST `api/v2/entries` Create an entry
- PATCH `api/v2/entries/:entryId` Modify an entry
- DELETE `api/v2/entries/:entryId` Users can delete an entry
- GET `api/v2/entries` Users can view their entries
- GET `api/v2/entries/:entryId` Users can view specific entry
  
# Github pages
  link: [MyDiary web](https://t2wil.github.io/MyDiary/UI/pages/)

# HEROKU APP AND ITS DOCUMENTATION  
  link: [API documentation with Swagger-UI](https://mydiary-app-api.herokuapp.com/api/v2/)
