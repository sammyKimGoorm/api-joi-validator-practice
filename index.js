const express = require("express");

const app = express();

app.use(require("./routes"));

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.statusCode).json({
        message: err.message,
        code: err.code,
        asdf: "this is error handler in app",
    });
});

app.listen(3000);
