const fs = require("fs"); // Import module fs

class Carrito {
  constructor(fileName) {
    this.fileName = fileName;
    this.id = 0;
    this.data = [];
    this.time = new Date();
  }

  // Carrito Methods
  async save(cart) {
    // Save cart
    await this.getAll();
    this.id++;
    cart.id = this.id;
    cart.time = this.time;
    this.data.push(cart);
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.data, null, 2)
      );
      console.log("El id del carrito es", this.id);
      return this.id; // Return id
    } catch (error) {
      console.log(error);
    }
  }

  async saveProduct(idCart, product) {
    await this.getAll();
    let cart = await this.getById(idCart);
    cart.products.push(product);
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.data, null, 2)
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async saveList(nuevaLista) {
    // Guardo lista
    try {
      await fs.promises.writeFile(this.fileName, nuevaLista); // Save file JSON
      console.log("El archivo fue guardado con éxito.");
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // Get cart by id
    await this.getAll();
    try {
      const objetoId = this.data.find((dat) => dat.id == id); // Search object id
      if (objetoId) {
        return objetoId;
      }
    } catch (error) {
      return null;
    }
  }

  async getAll() {
    // Get all cart
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      if (data) {
        this.data = JSON.parse(data); // Data to object
        this.data.map((carrito) => {
          if (this.id < carrito.id) this.id = carrito.id; // Nax id in the file
        });
        return this.data;
      }
    } catch (error) {
      return;
    }
  }

  async deleteById(id) {
    //Delete cart by id
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      if (data) {
        this.data = JSON.parse(data); // Data to object
        // New array without the object with the id
        const objetoSinId = this.data.filter((dat) => dat.id != id);
        // Save the new array in the file
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(objetoSinId, null, 2)
        );
        console.log(`El carrito con el id ${id} fue eliminado.`);
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductOnCart(idCart, idProduct) {
    try {
      const carritos = await fs.promises.readFile(this.fileName, "utf-8");
      if (carritos) {
        this.carritos = JSON.parse(carritos); // carritos to object
        const objectWithoutProduct = this.carritos.filter(
          (dat) => dat.products.idCart != idProduct
        );
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(objectWithoutProduct, null, 2)
        );
        console.log(
          `El producto con el id ${idProduct} fue eliminado del carrito con id ${idCart}.`
        );
        return idCart;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Carrito;
