import express from "express";
import { getUsuarios, addUsuario } from "./controllers";

const router = express.Router();

router.get("/datos", getUsuarios);
router.post("/datos", addUsuario);

export default router;
