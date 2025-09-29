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
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/Cloudinary");

//middleware

server.use(express.json());
server.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
))

// server.use(fileUpload({ useTempFiles: true }));

server.get('/', (req, res) => {
    res.send('Backend is running!');
});

// server.post("/upload", async (req, res) => {
//   try {
//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ success: false, msg: "No file uploaded" });
//     }

//     const file = req.files.image;

//     // Cloudinary me upload
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "products", // optional: Cloudinary folder ka naam
//     });

//     // temp file delete
//     const fs = require("fs");
//     fs.unlinkSync(file.tempFilePath);

//     res.json({
//       success: true,
//       url: result.secure_url, // ye URL tum frontend me use karogi
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


server.use('/images/product', express.static('public/images/product'));
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