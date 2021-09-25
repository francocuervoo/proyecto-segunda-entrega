import { clog } from "../server.js";

// Acá van a estar los métods genéricos

class Services {
  constructor(model) {
    this.model = model;
  }
  // Métodos
  async getAll() {
    try {
      const items = await this.model.find();
      return items;
    } catch (error) {
      clog(error);
    }
  }

  async getById(id) {
    try {
      const item = await this.model.findById(id);
      return item;
    } catch (error) {
      clog(error);
    }
  }

  async createDocument(item) {
    try {
      const document = await this.model.create(item);
      return document;
    } catch (error) {
      clog(error);
    }
  }

  async deleteById(id) {
    try {
      const deleted = await this.model.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      clog(error);
    }
  }
}

export default Services;
