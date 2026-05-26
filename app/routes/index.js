const express = require('express');
const productController = require('../controller/product.controller');
const projectImage = require('../utils/cloudinary');
const userController = require('../controller/user.controller');
const authChek = require('../middleware/authCheck');
const roleCheck = require("../middleware/roleCheck");


const router = express.Router();




/**
 * @swagger
 * /api/adminregister:
 *   post:
 *     summary: admin register
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: BAD_REQUEST
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/adminregister", projectImage.single("image"), userController.adminregister);

/**
 * @swagger
 * /api/farmerregister:
 *   post:
 *     summary: farmer register
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Farmer created successfully
 *       400:
 *         description: BAD_REQUEST
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/farmerregister", projectImage.single("image"), userController.farmerregister);

/**
 * @swagger
 * /api/userregister:
 *   post:
 *     summary: user register
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: BAD_REQUEST
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/userregister", projectImage.single("image"), userController.userregister);

/**
 * @swagger
 * /api/userlogin:
 *   post:
 *     summary: user login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged successfully
 *       400:
 *         description: All fields required
 *       401:
 *         description: Invalid Credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/userlogin", userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/users', authChek, roleCheck('admin'), userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get single Users
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/users/:id', authChek, roleCheck('admin'), userController.getUserById);





/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product (Farmer Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum:
 *                   - Vegetables
 *                   - Rice
 *                   - Crops
 *                   - Nuts
 *               inStock:
 *                 type: boolean
 *                 default: true
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only farmer can create product
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/products", authChek, roleCheck('farmer'), projectImage.single("image"), productController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/products', productController.readAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get single product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/products/:id', productController.readSingleProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (Farmer Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum:
 *                   - Vegetables
 *                   - Rice
 *                   - Crops
 *                   - Nuts
 *               inStock:
 *                 type: boolean
 *                 default: true
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only farmer can update product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/api/products/:id", authChek, roleCheck('farmer'), projectImage.single("image"), productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/api/products/:id', authChek, roleCheck('admin'), productController.deleteProduct);

/**
 * @swagger
 * /api/productsvegetable:
 *   get:
 *     summary: Get vegetable products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/productsvegetable', productController.vegetableProduct);

/**
 * @swagger
 * /api/productsrice:
 *   get:
 *     summary: Get rice products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/productsrice', productController.riceProduct);

/**
 * @swagger
 * /api/productscrops:
 *   get:
 *     summary: Get crops products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/productscrops', productController.cropsProduct);

/**
 * @swagger
 * /api/productsnuts:
 *   get:
 *     summary: Get nuts products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/productsnuts', productController.nutsProduct);


module.exports = router;