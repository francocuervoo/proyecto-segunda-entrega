import { clog } from "../server.js";

// Importo las subclases
import CartServices from "../services/carts.services.js";
import ProductServices from "../services/products.services.js";

// Importo los modelos
import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/product.model.js";


// Instancio las clases pasándole los modelos de Mongoose como parámetros
const productServices = new ProductServices(productModel);
const cartServices = new CartServices(cartModel);

export const newCart = async (req, res) => {
  try {
    const cartId = await cartServices.createCart();
    res.status(200).send(`Carrito creado con el ID: ${cartId}`);
  } catch (error) {
    clog(error);
  }
};

export const getCarts = async (req, res) => {
  const { cartId } = req.params;
  if (cartId) {
    const cart = await cartServices.getCartById(cartId);

    if (cart) {
      res.status(200).send({ cart });
    } else {
      res.send("El carrito que intenta buscar no existe");
    }
  } else {
    try {
      const carts = await cartServices.getCarts();
      res.status(200).send({ carts });
    } catch (error) {
      clog(error);
    }
  }
};

export const deleteCartById = async (req, res) => {
  const { cartId } = req.params;

  try {
    const borrado = await cartServices.deleteCartById(cartId);

    if (borrado) {
      res.status(200).send({ borrado });
    } else {
      res.status("El carrito que intenta borrar no existe");
    }
  } catch (error) {
    clog(error);
  }
};

export const addProductToCart = async (req, res) => {
  const { cartId, productId } = req.params;

  clog(cartId, productId);

  try {
    const newProduct = await productServices.getCartById(productId);

    // Agrega el producto al carrito, luego retorna el producto agregado
    const addedProduct = await cartServices.addProduct(cartId, newProduct);

    if (addedProduct) {
      res.status(200).send(`Producto agregado al carrito: ${addedProduct}`);
    } else {
      res.send("Carrito inexistente");
    }
  } catch (error) {
    clog(error);
  }
};

// Fata getProductsInCart()
// Falta deleteProductFromCart()
