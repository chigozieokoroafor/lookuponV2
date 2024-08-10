const express = require("express")
const cors = require("cors");
const router = require("./controllers/baseController");
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ "extended": true }))

app.use(router)

app.listen(1222, ()=>{
    console.log(`listening on port 1222`)
})


