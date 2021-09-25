import { clog } from "../server.js";
import Services from "./all.services.js";

// Métodos genéricos y los métidos propipios de los productos
class ProductServices extends Services {
  constructor(model) {
    super(model);
  }

  async getProducts() {
    await this.getAll();
  }

  async getProductById(id) {
    await this.getById(id);
  }

  async createProduct(product) {
    await this.createDocument(product);
  }

  async deleteProductById(id) {
    await this.deleteById(id);
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

      const updated = await productModel.findById(id);

      return updated;
    } catch (error) {
      clog(error);
    }
  }
}

export default ProductServices;
