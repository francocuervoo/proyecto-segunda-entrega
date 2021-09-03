/* eslint-disable no-undef */
const express = require("express"); // Import express
const app = express(); // Server app
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = express.Router();
const PORT = 8080;

server.listen(PORT, () => {
  console.log(
    `Servidor express corriendo en el puerto http://localhost:${PORT}`
  );
});

// Contenedor Class - One instance for products and one for messages
const Contenedor = require("./src/contenedor.js");
const Carrito = require("./src/carrito.js");
const contProductos = new Contenedor("./src/data/productos.json"); // Nueva instancia de la clase contenedor
const contMensajes = new Contenedor("./src/data/mensajes.json"); // Nueva instancia de la clase contenedor
const contCarritos = new Carrito("./src/data/carritos.json"); // Nueva instancia de la clase carrito

io.on("connection", async (socket) => {
  // Productos
  const products = await contProductos.getAll();
  socket.emit("productos", products);

  // Guardar productos
  socket.on("update", async (producto) => {
    await contProductos.save(producto);
    io.emit("productos", products);
  });

  // Mensajes
  const messages = await contMensajes.getAll();

  // Emitir desde el servidor la lista de mensajes
  socket.emit("mensajes", messages);

  // Recibir nuevo mensajes y guardar
  socket.on("nuevoMensaje", async (msg) => {
    msg.fyh = new Date().toLocaleString();
    await contMensajes.save(msg); // Save también sirve para guardar mensajes, no necesariamente solo productos
    io.emit("mensajes", messages);
  });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Static file folder
app.use("/api", router); // Router

// Handlebars
const handlebars = require("express-handlebars");

// Seteo le engine que voy a usar y la extensión (hbs)
app.set("view engine", "hbs");
app.engine(
  // Configuración del HBS
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views",
    extname: "hbs",
    defaultLayout: "layoutFrame",
  })
);

// Api paths PRODUCTS
router.get("/home", async (req, res) => {
    const lista = await contProductos.getAll();
    // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'
    res.render("bodyProducts", {
      layout: "layoutFrame",
      lista,
    });
  });

router.get("/productos", async (req, res) => {
  const lista = await contProductos.getAll();
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'
  res.render("bodyProducts", {
    layout: "layoutFrame",
    lista,
  });
});

// Api paths PRODUCTS
router.get("/formulario", async (req, res) => {
    res.render("bodyForm", {
      layout: "layoutFrame"
    });
  });

  router.get("/actualizar", async (req, res) => {
    res.render("bodyRefresh", {
      layout: "layoutFrame"
    });
  });  

router.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const productById = await contProductos.getById(id);
  try {
    if (productById) {
      res.render("bodyProducts", {
        layout: "layoutFrame",
        productById,
      });
    } else {
      res.render("bodyProducts", {
        layout: "layoutFrame",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/productos", async (req, res) => {
  const { body } = req;
  await contProductos.save(body);
  res.redirect('/api/formulario');
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
        console.log("Carrito borrado, borrado")
        res.status(200).send({ borrado });
    } else {
        res
          .status(400)
          .json({ error: "El producto que intenta borrar no existe." });
      }
});

router.get("/carrito/:id/productos", async (req, res) => {
    const { id } = req.params;
    const cartById = await contCarritos.getById(id);
    try {
      if (cartById) {
        res.render("bodyCarts", {
          layout: "layoutFrame",
          cartById,
        });
      } else {
        res.render("bodyCarts", {
          layout: "layoutFrame",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

router.post("/carrito/:id/productos", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let cartExist = await contCarritos.getById(id);
  if (cartExist) {
    await contCarritos.saveProduct(body, id);
    res.status(200).send(body);
  } else {
    res.status(400).json({ error: "No existe un carrito con ese id." });
  }
});

router.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params;
  let cartExist = await contCarritos.getById(id);
  let productExist = await contProductos.getById(id_prod);
  if (cartExist && productExist) {
    //cartExist.product tengo que encontrar el producto que tiene el id ingresado
    //delete cartExist.products.id

    // {
    //     "products": [
    //       {
    //         "title": "Juego de 4 Sillones Skarpo Beige + Mesa Puket",
    //         "price": "29999",
    //         "thumbnail": "https://images.fravega.com/s500/5107f233788db08d12c983a7cf8f0443.jpg",
    //         "id": 1
    //       },
    //       {
    //         "title": "TEST 2/09",
    //         "price": "29999",
    //         "thumbnail": "https://images.fravega.com/s500/5107f233788db08d12c983a7cf8f0443.jpg",
    //         "id": 1
    //       }
    //     ],
    //     "id": 2
    //   },

    const borrado = await contCarritos.deleteById(id);
    console.log("Carrito borrado", borrado);
    res.status(200).send({ borrado });
  } else {
    res.status(400).json({ error: "El carrito que intenta borrar no existe." });
  }
});

