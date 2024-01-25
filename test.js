const { voyagerflick } = require("./dist/index");

const app = voyagerflick();
app.get("/", (req, res) => {
  console.log(req.getBody());
});
app.listen("3000", () => {
  console.log("TCP Created");
});
