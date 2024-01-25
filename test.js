const { voyagerflick } = require("./dist/index");

const app = voyagerflick();
app.get("/", (req, res) => {
  console.log(req.body);
  const data = JSON.parse(req.body);
  console.log(data);
  res.send({ body: `Hello Voyager ${data.name} ${data.age}`, status: 404 });
});
app.listen("3000", () => {
  console.log("TCP Created");
});
