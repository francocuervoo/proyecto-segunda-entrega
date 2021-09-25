import { Router } from "express";

import { productsControllers } from "../controllers/index.js";
//import { validateAdmin } from "./middlewares/validateAdmin.js";

const productsRouter = Router();

productsRouter.get("/:id", productsControllers.getProducts);
productsRouter.post("/", /*validateAdmin,*/ productsControllers.saveProducts);
productsRouter.delete("/:id", /*validateAdmin,*/ productsControllers.deleteProducts);
productsRouter.put("/:id", /*validateAdmin,*/ productsControllers.updateProducts);

export default productsRouter;
