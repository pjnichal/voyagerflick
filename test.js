const { voyagerflick } = require("./dist/index");

const app = voyagerflick();
app.get("/", (req, res) => {
  const data = JSON.parse(req.body);
  // res.send({ body: `Hello Voyager ${data.name} ${data.age}`, status: 404 });
  res.status(404).json({
    message: "Hello " + data.name,
    age: "Tour age is " + data.age,
  });
});
app.post("/", (req, res) => {
  console.log(req.body + "BODY");
  // const data = JSON.parse(req.body);
  // res.send({ body: `Hello Voyager ${data.name} ${data.age}`, status: 404 });
  res.json({
    age: "Tour age is " + 22,
  });
});
app.listen("3000", () => {
  console.log("TCP Created");
});
