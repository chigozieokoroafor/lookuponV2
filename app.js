const express = require("express")
const cors = require("cors");
const { router } = require("./routes")
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json({limit:"5mb"}))
app.use(express.json())
app.use(express.urlencoded({ "extended": true }))

app.use(router)


app.listen(1222, () => {
    console.log(`listening on port 1222`)
})


