const { voyagerflick } = require("./dist/index");
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
