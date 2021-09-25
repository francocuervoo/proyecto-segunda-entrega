// Método del after para no repetir console.log
export const clog = console.log.bind(console);

import mongoose from "mongoose";
import app from "./express.app.js";
import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGODB_URI } = process.env;

// Express Server
app.listen(PORT, () => clog(`Servicio activo en el puerto http://localhost:${PORT}`));

//  Conecto a MongoDB
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      clog("Conectado a MongoDB");
    } else {
      clog(error);
    }
  }
);
