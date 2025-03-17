import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import pool from "./db";
pool.connect()
  .then(() => console.log("🟢 Conexión exitosa a PostgreSQL"))
  .catch(err => console.error("🔴 Error al conectar a PostgreSQL", err));

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("src/public"));

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
