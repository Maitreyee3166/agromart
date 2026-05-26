const Product = require('../models/product');

const path = require("path");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");
const httpStatusCode = require('../utils/httpStatusCode') 


class ProductController {

    async createProduct(req, res){
        try {
            const { name, description, price, category, inStock } = req.body;

            if(!name || !description || !price || !category){
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required"
                })
            }

            const newProduct = await Product({ name, description, price, category });

            if (req.file) {
                newProduct.image = req.file.path;
                newProduct.cloudinaryid = req.file.filename;
            }


            const result = await newProduct.save();

            if(result){
                return res.status(httpStatusCode.CREATED).json({
                    success: true,
                    message: "Product created successfully",
                    data: result
                })
            }

        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async readAllProducts(req, res){

        try {
            
            const allProducts = await Product.find();

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Products get successfully",
                data: allProducts
            })  

        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async readSingleProduct(req, res){

        try {
            
            const id = req.params.id;

            const singleProduct = await Product.findById(id);
            
            if(!singleProduct){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Product gets successfully",
                data: singleProduct
            })
            
        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async updateProduct(req, res){
        try {
             
            const id = req.params.id;

            const existingProduct = await Product.findById(id);

            if(!existingProduct){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            let deletedImage = await cloudinary.uploader.destroy(existingProduct.cloudinaryid);

            const { name, description, price, category, inStock } = req.body;

            if (req.file) {
                existingProduct.image = req.file.path;
                existingProduct.cloudinaryid = req.file.filename;
            }

            existingProduct.name = name ?? existingProduct.name;
            existingProduct.description = description ?? existingProduct.description;
            existingProduct.price = price ?? existingProduct.price;
            existingProduct.category = category ?? existingProduct.category;
            existingProduct.inStock = inStock ?? existingProduct.inStock;

            const updatedProduct = await existingProduct.save();

            if(updatedProduct){
                return res.status(httpStatusCode.OK).json({
                    success: true,
                    message: "Product updated successfully",
                    data: updatedProduct
                })
            }

        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async deleteProduct(req, res){
        try {
             
            const id = req.params.id;

            const existingProduct = await Product.findById(id);

            if(!existingProduct){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            const deletedProduct = await Product.findByIdAndDelete(id);
           
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Product deleted successfully",
               
            });

        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async vegetableProduct(req, res) {
        try {
            
            const searchProduct = await Product.find({category : ['vegetables', 'Vegetables']});

            if(searchProduct.length == 0){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Product get successfully",
                data: searchProduct
               
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })

        }
    }

    async riceProduct(req, res) {
        try {
            
            const searchProduct = await Product.find({category : ['rice', 'Rice']});

            if(searchProduct.length == 0){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Product get successfully",
                data: searchProduct
               
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })

        }
    }

    async cropsProduct(req, res) {
        try {
            
            const searchProduct = await Product.find({category : ['crops', 'Crops']});

            if(searchProduct.length == 0){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Product get successfully",
                data: searchProduct
               
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })

        }
    }

    async nutsProduct(req, res) {
        try {
            
            const searchProduct = await Product.find({category : ['nuts', 'Nuts']});

            if(searchProduct.length == 0){
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                })
            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "Product get successfully",
                data: searchProduct
               
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message
            })

        }
    }
}


module.exports = new ProductController();