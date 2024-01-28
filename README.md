
# VoyagerFlick

VoyagerFlick is a lightweight npm package that provides a simple clone of Express.js but with a TCP server. It allows you to handle basic routing for TCP requests in a manner similar to how Express.js handles HTTP requests.

**THIS PROJECT IS ONLY FOR LEARNING DO NOT USE THIS PACKAGE AT PRODUCTION**
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
  res.status(200).send("YEAHH");
});
app.get("/getJson", (req, res) => {
  res.status(200).json({ message: "JSON WORKING" });
});

app.listen("8080", () => {
  console.log("Sever Running on 8080");
});
```
Currently Supported Methods : GET, POST, DELETE, PUT, PATCH 

## Github & Linkedin

 - [Voyagerflick - Github](https://github.com/pjnichal/voyagerflick)
  - [Voyagerflick - NPM](https://www.npmjs.com/package/voyagerflick)
 - [Portfolio](https://pravinnichal.in/)


## Contributing & Usage

Contributions are always welcome!

Make a pull request or raise an issue.


