import { clog } from "../server.js";
import Services from "./crud.services.js";

// Métodos genéricos y los métidos propipios de los productos
class ProductServices extends Services {
  constructor(model) {
    super(model);
  }

  async getProducts() {
    try {
      const products = await this.getAll();
      return products;
    } catch (error) {
      clog(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.getById(id);
      return product;
    } catch (error) {
      clog(error);
    }
  }

  async createProduct(product) {
    try {
      const newProduct = this.createDocument(product);
      return newProduct;
    } catch (error) {
      clog(error);
    }
  }

  async deleteProductById(id) {
    try {
      await this.deleteById(id);
      return;
    } catch (error) {
      clog(error);
    }
  }

  async updateProductById(id, product) {
    const { title, description, price, stock, thumbnail } = product;

    try {
      await this.model.findByIdAndUpdate(id, {
        title,
        description,
        price,
        stock,
        thumbnail,
      });

      const updated = await this.model.findById(id);

      return updated;
    } catch (error) {
      clog(error);
    }
  }
}

export default ProductServices;
