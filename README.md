# Circle
Social network for keeping in touch with groups of friends

## Project Setup: 

First install nodejs: https://nodejs.org/en/ -- This also installs the node package manager! (npm)

Next, install nodemon (This automatically restarts the server every time a change is made)

`npm install -g nodemon`

### Install required modules:

`npm install --save express mongoose passport passport-local bcryptjs express-session body-parser connect-flash path moment method-override`

#### What are these modules?
_express:_ Web framework

_mongoose:_ Object relational mapping (ORM) for node and mongodb

_passport:_ user authentication

_passport-local:_ The strategy we're using for passport

_bcryptjs:_ Encrypting passwords

_express-session:_ keeping track of current user

_body-parser:_ Used for parsing the request body

_express-handlebars:_ Template engine for WEB APP

_connect-flash:_ Enable flash messages from server

_path:_ Loading static files

_moment:_ formatting dates

_method-override:_ put and delete methods in html form
