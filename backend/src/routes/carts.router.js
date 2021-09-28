import { Router } from "express";

import { cartsControllers } from "../controllers/index.js";

const cartsRouter = Router();

cartsRouter.get("/", cartsControllers.getCarts);
cartsRouter.get("/:cartId", cartsControllers.getCarts);
cartsRouter.get("/products/:cartId", cartsControllers.getProductsInCart);
cartsRouter.post("/", cartsControllers.newCart);
cartsRouter.delete("/:cartId", cartsControllers.deleteCartById);
cartsRouter.post("/products/:cartId/:productId", cartsControllers.addProductToCart);
cartsRouter.delete("/products/:cartId/:productId", cartsControllers.deleteProductFromCart);

export default cartsRouter;
