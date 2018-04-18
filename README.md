<img src="/static/images/User-2.png" align="right" />

# Instafake
[Raymond Ajax Metrulis](https://github.com/reizeismith) and [Sean McNeeley](https://github.com/sean21mcn) collaborated on this project.
A clone of Instagram for desktop that allows users to sign up for a profile, upload pictures with description, comment and like everyone's
posts, and edit and delete your own posts.

## Deployment
Check out the live site on [Heroku](instafake-mk2.herokuapp.com/api)

[Demo](https://s3.amazonaws.com/instafake/gifs/Instafake-Google-Chrome-3_29_2018-3_41_35-AM.gif)

## Installation
Requirements: Node v.6 and up
In Node CLI, cd to the main folder:
`npm install`
`nodemon server.js`

Replace all instances of process.env with your own links, keys and passwords.

## Data Models
### 'users'

| Column                | Type                	          |
|-----------------------|---------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)           |
|`username`             | STRING(100) (NOT NULL)(UNIQUE)  |
|`password`             | STRING(1000) (NOT NULL)         |

* ONE to MANY: posts
* ONE to MANY: likes
* ONE to MANY: comments

### 'posts'

| Column                | Type                	          |
|-----------------------|---------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)           |
|`user_id`              | INTEGER (NOT NULL)              |
|`img_name`             | STRING (NOT NULL)               |
|`description`          | STRING (NOT NULL)               |

* ONE to MANY: comments
* ONE to MANY: likes
* MANY to ONE: users

### 'comments'

| Column                | Type                	          |
|-----------------------|---------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)           |
|`username`             | STRING (NOT NULL)               |
|`post_id`              | INTEGER (NOT NULL)              |
|`comment`              | STRING (NOT NULL)               |

* MANY to ONE: users
* MANY to ONE: posts

### 'likes'

| Column                | Type                	          |
|-----------------------|---------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)           |
|`username`             | STRING (NOT NULL)               |
|`post_id`              | INTEGER (NOT NULL)              |
|`thumbs_up`            | BOOLEAN (NOT NULL)              |

* MANY to ONE: users
* MANY to ONE: posts

## Routes

* /api : login
* /api/signup : signup
* /api/protected :home page, like and comment on all posts
* /api/protected/profile : profile page, upload, edit, and delete your own posts
* /logout : logout

## Technology 

Node, Express, EJS, PostgreSQL, AWS

## Inspiration
* [Instagram](https://instagram.com)
