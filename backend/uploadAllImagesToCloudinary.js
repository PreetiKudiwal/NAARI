require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('./config/Cloudinary'); 

// Models
const Product = require('./models/ProductModel');
const Category = require('./models/CategoryModel');

// Folders
const productFolder = path.join(__dirname, 'public/images/product');
const categoryFolder = path.join(__dirname, 'public/images/category');

async function uploadAllImages() {
  try {
    // MongoDB connect
    await mongoose.connect(process.env.MONGODB_KEY, { dbName: 'Ishop' });
    console.log('MongoDB connected');

    // ======================
    // 1️⃣ Upload Product Images
    // ======================
    const products = await Product.find();
    for (const product of products) {
      // main_img upload
      if (product.main_img) {
        const mainPath = path.join(productFolder, product.main_img);
        if (fs.existsSync(mainPath)) {
          const mainResult = await cloudinary.uploader.upload(mainPath, {
            folder: 'shop_images/product',
          });
          product.main_img = mainResult.secure_url;
        }
      }

      // other_img array upload
      if (product.other_img && product.other_img.length > 0) {
        const updatedOtherImgs = [];
        for (const imgName of product.other_img) {
          const imgPath = path.join(productFolder, imgName);
          if (fs.existsSync(imgPath)) {
            const res = await cloudinary.uploader.upload(imgPath, {
              folder: 'shop_images/product',
            });
            updatedOtherImgs.push(res.secure_url);
          }
        }
        product.other_img = updatedOtherImgs;
      }

      await product.save();
      console.log(`Product updated: ${product.name}`);
    }

    // ======================
    // 2️⃣ Upload Category Images
    // ======================
    const categories = await Category.find();
    for (const category of categories) {
      if (category.categoryImageName) {
        const catPath = path.join(categoryFolder, category.categoryImageName);
        if (fs.existsSync(catPath)) {
          const result = await cloudinary.uploader.upload(catPath, {
            folder: 'shop_images/category',
          });
          category.categoryImageName = result.secure_url;
          await category.save();
          console.log(`Category updated: ${category.categoryName}`);
        }
      }
    }

    console.log('All product and category images uploaded successfully!');
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

uploadAllImages();
