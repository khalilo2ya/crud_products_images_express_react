import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

// Get all products product
export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);

    } catch (error) {
        res.json({ msg: error.message })
    }
}

// Get product by id
export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);

    } catch (error) {
        res.status(200).json({ msg: error.message })
    }
}

// Create new product
export const saveProduct = (req, res) => {

    if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });
    const name = req.body.title;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['png', '.jpeg', '.jpg'];
    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "Invalid image" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image too heavy image size must less than 5MB" });
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: "Error while uploading image : " + err.message });
        try {
            await Product.create({
                name: name, image: fileName, url: url, description: description, price: price
            });
            res.status(201).json({ msg: "Product has been created successfuly" });

        } catch (error) {
            res.json({ msg: error.message })
        }
    })

}


// Update product
export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No product found for updating " });
    let fileName = "";
    if (req.files === null) {
        fileName = product.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['png', '.jpeg', '.jpg'];
        if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: "Invalid image" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image too heavy image size must less than 5MB" });
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: "Error while uploading image : " + err.message });
        })
    }
    const name = req.body.title;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Product.update({name:name, image:fileName, url:url, description: description, price: price},{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Product has been updated successfuly" });
    } catch (error) {
        res.json({ msg: error.message })
    }
}

// Delete product
export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No product found for deleting " });
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product removed successfuly" });
    } catch (err) {
        res.json({ msg: err.message })
    }
}