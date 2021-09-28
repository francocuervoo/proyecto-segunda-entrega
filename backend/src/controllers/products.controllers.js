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
      res.status(200).send(products);
    } catch (error) {
      clog(error);
    }
  }
};

export const saveProduct = async (req, res) => {
  const { body } = req;
  try {
    await productServices.createProduct(body);
    res.send("El producto fue agregado con éxito");
  } catch (error) {
    clog(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productServices.deleteById(id);
    res.send(`El producto con el id: ${id} fue borrado`);
  } catch (error) {
    clog(error);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const oldProduct = await productServices.getById(id);
    const updateProduct = await productServices.updateProductById(id, body);
    res.send(`El producto ${oldProduct}, fue actualizado por ${updateProduct}`);
  } catch (error) {
    clog(error);
  }
};
