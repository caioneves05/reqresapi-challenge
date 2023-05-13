# Reqres API Challenge

The project is a user management system with the basic functionalities of a CRUD. In addition, the system has some additional features, such as notification via email of the creation of new users, use of RabbitMQ to send notifications and automatic download of the avatar when adding it to the database.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js and npm
- RabbitMQ
- Docker
- Gmail account with two-step authentication enabled

## Installation

1. Clone the repository on your local machine:

```
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

2. Install the dependencies:
```
npm install
```

## Configuration

### Environment variables

Create a `.env and a .env.development` file at the root of the project and define the following environment variables:

# Gmail SMTP settings
- EMAIL_GMAIL=[seu-email-do-gmail]
- PASSWORD_GMAIL=[sua-senha-do-gmail]

# RabbitMQ settings
- RABBITMQ_URI=[url-do-rabbitmq]
- RABBITMQ_DEFAULT_USER=[user-do-rabbitmq]
- RABBITMQ_DEFAULT_PASS=[passwrod-do-rabbitmq]

## Use
To start the development server, run the following command:

```
npm run start:dev

The server will start on the default port 3000. You can access it at http://localhost:3000.
```
The server will start on the default port 3000. You can access it at `http://localhost:3000`.

## Docker 

To run the project on docker and have access to RabbitMQ use this command to install the prepared images in `docker-compose.yml`.
```
Docker compose up
```

# API Routes

## Create a new user
Creates a new user based on the provided information.

- URL: `POST /users`
- Body: JSON object containing user information to be created.

example:

```json
{
  "name": "João",
  "email": "joao@example.com",
  "password": "senha123",
  "avatar": "https://example.com/avatar.png"
} 
```

Automatically when the user is created, his avatar will be downloaded in the `/assets` folder.
## List all users

Return a list all the users registered in the database.

- URL: `GET/USERS`

## Search user for ID
- URL: `GET/users/:id`
- Parameter: ID the user to be serached

## Update user information

Updates user information based on the entered ID.

- URL: `PUT /users/:id`
- Parameter: ID of the user to be updated.
- Body: JSON object containing updated user information.

Example:

```json
PUT /users/123456
{
  "email": "joao.silva@example.com",
}
```

## Add avatar to user

Adds an avatar to the user based on the entered ID.

- URL: `PUT /users/avatar/:id`
- Parameter: ID of the user to be updated.
- Body: JSON object containing the URL of the avatar to be added.

Example:

```json
PUT /users/avatar/123456
{
  "avatar": "https://example.com/avatar2.png"
}

```


Automatically when the user adds his avatar, the image will be downloaded in the `/assets` folder.

## Remove user
Removes the user based on the entered ID.

- URL: `DELETE /users/:id`
- Parameter: ID of the user to be removed.

Example:

```json
DELETE /users/123456
```