const { voyagerflick } = require("./dist/index");

const app = voyagerflick();
app.get("/", (req, res) => {
  const data = JSON.parse(req.body);
  // res.send({ body: `Hello Voyager ${data.name} ${data.age}`, status: 404 });
  res.status(404).json({
    message: "Hello YASH DLA " + data.name,
    age: "Tour age is " + data.age,
  });
});
app.listen("3000", () => {
  console.log("TCP Created");
});
