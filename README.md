# Guest Book Server

This `Express js` server is built to serve this [react app](https://github.com/ELASHMAWYDEV/GuestBook-Coformatique/tree/client) as a server-side.
You can see live demo of the server [here](https://guestbook-coformatique-server.herokuapp.com). **All `GET` routes are not handled, only `POST`**

### Imporant before deploy

**You must include these env variables in deployment**

- `MONGODB`: the url to mongodb server
- `DB_NAME`: the name of the Database to save application data
- `CLIENT_URL`: the url of the react client app. **Very imporant for security**
- `SECRET_TOKEN`: the secret token used in `JWT` and `signed cookies`. **Never share it with any third-party**

## Features

- Login
- Logout **Clear the JWT cookie**
- Check Authentication
- Register
- Reset password, by sending link to email
- Submit new password with reset token
- Add messages
- Delete messages
- Edit messages
- Reply to messages
- Mark messages as read

## Security

To ensure the security of the application, I have implemented these approachs

- `Authentication Middleware`: to check for the JWT token in a signed cookie
- `Signed Cookie`: the `JWT` cookie is signed by the server before sent to client.
- `Client Origin`: the cookie can only be sent back to the server with every request only if the `CLIENT_URL` env variable is set.
- `Private routes check`: on every request, an Authentication check is made to ensure if the user has the right credentails or not.
