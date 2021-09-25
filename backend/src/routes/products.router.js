import { Router } from "express";

import { productsControllers } from "../controllers/index.js";
import validateAdmin from "../middlewares/validateAdmin.js";

const productsRouter = Router();

productsRouter.get("/", productsControllers.getProducts);
productsRouter.get("/:id", productsControllers.getProducts);
productsRouter.post("/", validateAdmin, productsControllers.saveProduct);
//productsRouter.delete("/:id", productsControllers.deleteProduct);
//productsRouter.put("/:id", productsControllers.updateProduct);

export default productsRouter;

//productsRouter.delete("/:id", /*validateAdmin,*/ productsControllers.deleteProduct);
//productsRouter.put("/:id", /*validateAdmin,*/ productsControllers.updateProduct);
