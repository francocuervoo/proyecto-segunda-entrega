import { clog } from "../server.js";
import Services from "./crud.services.js";

// Métodos genéricos y los métidos propipios de los productos
class CartServices extends Services {
  constructor(model) {
    super(model);
  }

  async getCarts() {
    await this.getAll();
  }

  async getCartById(id) {
    await this.getById(id);
  }

  async createCart(cart) {
    await this.createDocument(cart);
  }

  async deleteCartById(id) {
    await this.deleteById(id);
  }

  async deleteProduct(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);

      //Métodos de Vnailla JS para borrar el producto del carrito
      const index = cart.products.findIndex(
        (product) => (product._id == productId)
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
