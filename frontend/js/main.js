// eslint-disable-next-line no-undef
const socket = io.connect();

// Products
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const producto = {
    title: productForm[0].value,
    price: productForm[1].value,
    thumbnail: productForm[2].value,
  };

  socket.emit("update", producto);

  productForm.reset();
});

socket.on("productos", (products) => {
  const html = tableRows(products);
  document.getElementById("listaProductos").innerHTML = html;
});

const tableRows = (products) =>
  products
    .map(
      (p) =>
        `
        <tr>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td><img style="width:2rem;" class="img-thumbnail" src=${p.thumbnail}></img></td>                        
        </tr>
      `
    )
    .reverse() // Invierte el orden del map
    .join(" "); // Saca la , que genera

// Mensajes
// Leer valores por ID del DOM:
const user = document.getElementById("user");
const message = document.getElementById("msg");
const send = document.getElementById("send");

const messageForm = document.getElementById("messageForm");

// Agregar evento al formulario
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Construyo objeto mensaje
  const msg = {
    author: user.value,
    text: message.value,
  };

  //Emito nuevo mensaje
  socket.emit("nuevoMensaje", msg);

  //Resetear formulario:
  messageForm.reset();

  message.focus();
});

//Mensajes provenitentes del servidor
socket.on("mensajes", (msg) => {
  //Renderizar mensajes recibidos del servidor con la funcion listaMensajes
  const html = listaMensajes(msg);
  document.getElementById("mensajes").innerHTML = html;
});

const listaMensajes = (mensajes) =>
  mensajes
    .map(
      (msg) =>
        `
      <div>
          <b style="color: blue;">${msg.author}</b>
          [<span style="color: brown;">${msg.fyh}</span>]:
          <i style="color:green;">${msg.text}</i>
      </div>
    `
    )
    .join(" ");

// Evento para deshabilitar campos del usuario

user.addEventListener("input", () => {
  const anyUsers = user.value.length;
  const anyText = message.value.length;
  message.disabled = !anyUsers;
  send.disabled = !anyUsers || !anyText;
});

// Evento para deshabilitar campos de mensajes

message.addEventListener("input", () => {
  const anyText = message.value.length;
  send.disabled = !anyText;
});
