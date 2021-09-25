import { clog } from "../server.js";

import ProductServices from "../services/products.services.js";

import { productModel } from "../models/product.model.js";

const productServices = new ProductServices(productModel);

export const getProducts = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const product = await productServices.getProductsById(id);

    if (product) {
      res.status(200).send({ product });
    } else {
      res.send("El producto que intenta buscar no existe");
    }
  } else {
    try {
      const products = await productServices.getProducts();
      res.status(200).send(products);
    } catch (error) {
      clog(error);
    }
  }
};
