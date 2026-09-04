# Learnings

## Starter Command to setup the server

- npm init -y
- npm i express mongoose
- folder structure src -> app.js, db -> db.js, models -> note.model.js
- npx nodemon server.js : for continuous running of server without restarting it.


## Things to keep in mind

- add a .env files for keeping secrets and passwords.
- add .gitignore file to untrack the node modules and .env and other files that not supposed to be tracked using git.

## Resources
- imagekit : cloude storage provider
- multer : middleware for form data
- dotenv : for using env variables
- cookieparser : for cookie storage
- bcryptjs : for hashing.

## Authentication System

- Validation
- Verification
- Authentication
- Authorization


## Folder structure

src -> routes -> auth.routes.js | controllers -> auth.controller.js | models -> user.model.js | app.js | services -> xyz.services.js
