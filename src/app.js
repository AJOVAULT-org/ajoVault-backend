/*eslint linebreak-style: ["error", "windows"]*/
// node or built-in modules
const express = require("express");

// custom modules
const exampleRoute = require("./routes/exampleRoute");
const OtpRouter = require("./routes/otpRoute");
const userRouter = require("./routes/userRoute");

const app = express();

// whitelisting cors implementation - need details front client
// app.use(cors({
//     origin: '',
// }))

app.use(express.json());
app.use("/example", exampleRoute);
app.use("/api/v1", OtpRouter);
app.use("/api/v1", userRouter);

app.all("*", (req, res) => {
  res.status(400).json({ error: "Wrong method or endpoint, check and try again" });
});

module.exports = app;
