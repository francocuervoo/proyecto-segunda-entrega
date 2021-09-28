import { clog } from "../server.js";
import Services from "./crud.services.js";

// Métodos genéricos y los métidos propipios de los productos
class CartServices extends Services {
  constructor(model) {
    super(model);
  }

  async getCarts() {
    try {
      const carts = await this.getAll();
      return carts;
    } catch (error) {
      {
        clog(error);
      }
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.getById(id);
      return cart;
    } catch (error) {
      {
        clog(error);
      }
    }
  }

  createCart = async (cart) => await this.createDocument(cart);

  /*async createCart(cart) {
    try {
      const document = await this.createDocument(cart);
      return document;
    } catch (error) {
      {
        clog(error);
      }
    }
  }*/

  /*async createCart(cart) {
    try {
      const document = this.createDocument(cart);
      return document;
    } catch (error) {
      {
        clog(error);
      }
    }
  }*/

  async deleteCartById(id) {
    try {
      const deleteCart = await this.deleteById(id);
      return deleteCart;
    } catch (error) {
      {
        clog(error);
      }
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);

      //Métodos de Vnailla JS para borrar el producto del carrito
      const index = cart.products.findIndex(
        (product) => product._id == productId
      );
      cart.products.splice(index, 1);

      //Guardo el documento en MongoDB
      cart.save();
      return productId;
    } catch (error) {
      clog(error);
    }
  }

  async addProduct(cartId, newProduct) {
    try {
      const cart = await this.model.findById(cartId);

      cart.products.push(newProduct);
      cart.save();

      return newProduct;
    } catch (error) {
      clog(error);
    }
  }

  async getProducts(id) {
    try {
      const cart = await this.model.findById(id);
      const productos = await cart.products;
      return productos;
    } catch (error) {
      clog(error);
    }
  }
}
export default CartServices;
