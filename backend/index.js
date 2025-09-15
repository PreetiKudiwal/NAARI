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
const SizeRouter = require('./routers/SizeRouter');
const PORT = process.env.PORT || 5001;
//middleware

server.use(express.json());
server.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
))

server.get('/', (req, res) => {
    res.send('Backend is running!');
});

server.use('/images', express.static('images'));
server.use(express.static("public"));
server.use("/category", CategoryRouter);
server.use("/color", ColorRouter);
server.use("/product", ProductRouter);
server.use("/admin", AdminRouter);
server.use("/user", UserRouter);
server.use("/order", OrderRouter);
server.use("/size", SizeRouter);

mongoose.connect(
    process.env.MONGODB_KEY,
    { dbName: 'Ishop' }
).then(
    (success) => {
        server.listen(
            PORT,
            () => {
                console.log(`Server running on port ${PORT}`);
            }
        )
    }
).catch(
    (error) => {
        console.log(error);
    }
)