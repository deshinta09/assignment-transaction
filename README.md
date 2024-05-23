# assignment-transaction

## Prerequisites
- Install npm
## Getting Started
Clone the repo: 
```
clone https://github.com/deshinta09/assignment-transaction.git
cd assignment-transaction
```

Install dependencies:
```
npm install
```

Create Database With Postgres
```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

Start server:
```
node index.js
```

Transaction API Documentation

## Endpoint :
List of available endpoints:

- `POST /login`
- `POST /register`
- `POST /send`
- `GET /send`

## 1. LOGIN /login
Description:
- Post login from database

- body
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_
```json
{
  "access_token": "string"
}
```
&nbsp;

## 2. POST /register
Description:
- Post user to database

Request:
- body
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_
```json
{
  "id": "integer",
  "email": "string"
}
```
&nbsp;

## 3. POST /send
Description:
- Post transaction to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
  "amount": "integer",
  "toAddress": "integer"
}
```

_Response (201 - OK)_
```json
{
    "message": "transaction processing completed for:",
    "processedTransaction": {
        "amount": "20",
        "currency": "USD"
    }
}
```
&nbsp;

## 4. GET /send
Description:
- Get payment account include transaction from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200-OK)_
```json
[
    {
        "id": "integer",
        "UserId": "integer",
        "amount": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "PaymentHistories": [
            {
                "id": "integer",
                "name": "string",
                "amount": "integer",
                "SenderId": "integer",
                "toAddress": "integer",
                "status": "withdraw",
                "createdAt": "date",
                "updatedAt": "date"
            }
        ]
    },...
]
```
&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```