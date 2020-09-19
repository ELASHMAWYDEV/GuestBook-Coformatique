# Guest Book

## Description

This React app was built for [Coformatique](https://www.linkedin.com/company/coformatique) as a task
of the recruitment process on the company.

### Live Demo

You can watch a live demo of this app [here](https://suspicious-turing-b08deb.netlify.app/).
The node server is in another branch on the same repo, you can find it [here](https://github.com/ELASHMAWYDEV/GuestBook-Coformatique/tree/server)

## Project Features

- Login
- Register
- Reset password link sent with email
- Add messages
- Reply to messages
- Delete messages
- Mark messages as read

## Security Approches

In order to ensure the security of this react application, I have implemented these approches
in my `Guest Book` app.

- `signed cookie`: To authenticate with the server, the user has to send the signed cookie he
  already recieved on Login
- `secure cookie`: The node js server must be served over HTTPS protocol
- `JWT`: When user logs in, he recieves a cookie containing the JWT token that holds his information
  **The JWT cookie doesn't contain any sensetive data**
- `origin cookie`: In the deployment process, you must set the env `CLIENT_URL`, that points to the react app url
  **This approche adds a high level of security to the react app**
- `Check Auth`: When the app loads for the first time, a request is sent to the server to check if he has credentials
- `Database Token`: The JWT token is saved on the Database on login, and cleared on logout
