// Método del after para no repetir console.log
export const clog = console.log.bind(console);

import mongoose from "mongoose";
import app from "./express.app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI_LOCAL;

// Express Server
app.listen(port, () => clog(`Servicio activo en el puerto ${port}`));

//  Conecto a MongoDB
try {
  const conectado = await mongoose.connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  if(conectado){
    clog("Conectado a MongoDB")
  } else {
    clog("Error al conectar a MongoDB")
  }
} catch(error){
  { clog(error)}
}
