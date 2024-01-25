
# VoyagerFlick express clone

A simple npm package clone of  express.js made with TCP server.

## Installation Guide

install package using npm

```bash
  npm i voyagerflick
```


## Usage

```javascript
const { voyagerflick } = require("voyagerflick");
const app = voyagerflick();

app.get("/getTest", (req, res) => {
  res.send({ body: "hello", status: 200 });
});
app.get("/getJson", (req, res) => {
  res.json({ body: { message: "JSON DEMO" }, status: 200 });
});
app.listen("8080", () => {
  console.log("Sever Running on 8080");
});

```


## Github & Linkedin

 - [Voyagerflick - Github](https://github.com/pjnichal/voyagerflick)
 - [My Github Profile](https://github.com/pjnichal)
 - [Linkedin](https://www.linkedin.com/in/pravin-nichal-93080b1b4/)

