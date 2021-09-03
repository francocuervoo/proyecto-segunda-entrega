/* eslint-disable no-undef */
const express = require("express"); // Import express
const app = express(); // Server app
const http = require("http");
const server = http.createServer(app);
const router = express.Router();
const PORT = 8080;

server.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

// Producto Class - One instance for products and one for messages
const Producto = require("./src/producto.js");
const Carrito = require("./src/carrito.js");
const contProductos = new Producto("./src/data/productos.json"); // Nueva instancia de la clase producto
const contCarritos = new Carrito("./src/data/carritos.json"); // Nueva instancia de la clase carrito

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router); // Router

// Api paths PRODUCTS
router.get("/productos", async (req, res) => {
  const lista = await contProductos.getAll();
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'
  if (lista) {
    res.status(200).send({ lista });
  } else {
    res.status(400).json({ error: "No hay productos en este momento." });
  }
});

router.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const productById = await contProductos.getById(id);
  try {
    if (productById) {
      res.status(200).send({ productById });
    } else {
      res.status(400).json({ error: "No exise un producto con ese ID." });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/productos", async (req, res) => {
  const { body } = req;
  await contProductos.save(body);
  res.status(200).json({ mensaje: "Producto agregado con éxito." });
});

router.put("/productos/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const anterior = await contProductos.getById(id);
  const nuevo = await contProductos.updateById(id, body);
  if (anterior) {
    res.status(200).send({ anterior, nuevo });
  } else {
    res.status(400).json({ error: "Producto no encontrado" });
  }
});

router.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const productExist = await contProductos.getById(id);
  if (productExist) {
    const borrado = await contProductos.deleteById(id);
    console.log("Producto borrado", borrado);
    res.status(200).send({ borrado });
  } else {
    res
      .status(400)
      .json({ error: "El producto que intenta borrar no existe." });
  }
});

// Api paths CART
router.get("/carrito/:id/productos", async (req, res) => {
  const { id } = req.params;
  const cartById = await contCarritos.getById(id);
  try {
    if (cartById) {
      res.status(200).send({ cartById });
    } else {
      res.status(400).json({ error: "No existe ningún carrito con ese id." });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/carrito", async (req, res) => {
  const { body } = req;
  await contCarritos.save(body);
  res.status(200).send(body);
});

router.delete("/carrito/:id", async (req, res) => {
  const { id } = req.params;
  const cartExist = await contCarritos.getById(id);
  if (cartExist) {
    const borrado = await contCarritos.deleteById(id);
    res.status(200).send({ borrado });
  } else {
    res
      .status(400)
      .json({ error: "El carrito que intenta borrar no existe." });
  }
});

router.post("/carrito/:id/productos/:id_prod", async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params;
  let cartExist = await contCarritos.getById(id);
  let prodExist = await contProductos.getById(id_prod);
  if (cartExist && prodExist) {
    await contCarritos.saveProduct(id, prodExist);
    res.status(200).send(cartExist);
  } else {
    res.status(400).json({ error: "No existe un carrito con ese id." });
  }
});

router.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params;
  let cartExist = await contCarritos.getById(id);
  let prodExist = await contProductos.getById(id_prod);
  if (cartExist && prodExist) {
    // FALTA CREAR UNA FUNCIÓN QUE ELIMINE EL PRODUCTO DE UN CARRITO
    res.status(200).send({ borrado });
  } else {
    res.status(400).json({ error: "El producto del carrito que intenta borrar no existe." });
  }
});
