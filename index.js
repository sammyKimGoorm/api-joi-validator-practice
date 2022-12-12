const express = require("express");
const { makeResJson } = require("./utils/errors");

const app = express();

app.use(express.json());
app.use(require("./routes"));

app.use((err, req, res, next) => {
    console.log(err);
    // return res.status(err.statusCode).json({
    //     message: err.message,
    //     code: err.code,
    //     asdf: "this is error handler in app",
    // });

    return res
        .status(err.statusCode)
        .json(makeResJson(false, err.code, err.message));
});

app.listen(3000);
