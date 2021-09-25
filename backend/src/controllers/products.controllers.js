import { clog } from "../server.js";

import ProductServices from "../services/products.services.js";

import { productModel } from "../models/product.model.js";

const productServices = new ProductServices(productModel);

export const getProducts = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const product = await productServices.getProductById(id);

      if (product) {
        res.status(200).send({ product });
      } else {
        res.send("El producto que intenta buscar no existe");
      }
    } catch (error) {
      clog(error);
    }
  } else {
    try {
      const products = await productServices.getProducts();
      console.log(products)
      res.status(200).send(products);
    } catch (error) {
      clog(error);
    }
  }
};

export const saveProduct = async (req, res) => {
  const { body } = req;
  await productServices.createProduct(body);

  res.send("El producto fue agregado con éxito");
};

// Faltan otras funciones
