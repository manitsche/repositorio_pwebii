import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
export const router = Router();

// configuração do multer
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		},
	})
});

//List categories
router.get('/categories', listCategories);

//Create category
router.post('/categories', createCategory);

//Delete category
router.delete('/categories/:categoryId', deleteCategory);

//List products
router.get('/products', listProducts);

//Create products and upload a image
router.post('/products', upload.single('imagePath'), createProduct);

// Check the return of the server in product creation
router.get('/products', (req, res) => {
	console.log('Request to /products received');
});
  
//Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

//List orders
router.get('/orders', listOrders);

//Create orders
router.post('/orders', createOrder);

//Change orders status/ patch e nao put por ser uma alteração parcial
router.patch('/orders/:orderId', changeOrderStatus);

//Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);