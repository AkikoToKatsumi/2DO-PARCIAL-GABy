import { Request, Response } from "express";
import pool from "./db";

export const getUsuarios = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
};

export const addUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, direccion, telefono, edad, correo } = req.body;
    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, direccion, telefono, edad, correo) VALUES ($1, $2, $3, $4, $5, $6)",
      [nombre, apellido, direccion, telefono, edad, correo]
    );
    res.status(201).json({ message: "Usuario agregado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar usuario" });
  }
};
