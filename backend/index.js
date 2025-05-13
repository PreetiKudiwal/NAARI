require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const CategoryRouter = require("./routers/CategoryRouter");
const ColorRouter = require("./routers/ColorRouter");
const ProductRouter = require("./routers/ProductRouter");
const AdminRouter = require("./routers/AdminRouter");
const UserRouter = require('./routers/UserRouter');
const OrderRouter = require('./routers/OrderRouter');
//middleware

server.use(express.json());
server.use(cors(
    {
        origin: ["http://localhost:5173"]
    }
))
server.use(express.static("public"));

server.use("/category", CategoryRouter);
server.use("/color", ColorRouter);
server.use("/product", ProductRouter);
server.use("/admin", AdminRouter);
server.use("/user", UserRouter);
server.use("/order", OrderRouter);

console.log(process.env.MONGODB_KEY);
mongoose.connect(
    process.env.MONGODB_KEY,
    { dbName: 'Ishop' }
).then(
    (success) => {
        server.listen(
            5001,
            () => {
                console.log("server starts at port 5001");
            }
        )
    }
).catch(
    (error) => {
        console.log(error);
    }
)