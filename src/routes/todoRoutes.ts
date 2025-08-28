import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

const router = Router();

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Lista todas as tarefas (com filtros opcionais).
 *     parameters:
 *       - in: query
 *         name: favorite
 *         schema:
 *           type: boolean
 *         description: Filtra apenas favoritos (true/false).
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filtra pela cor (hexadecimal).
 *     responses:
 *       200:
 *         description: Lista de tarefas.
 */
router.get("/", getTodos);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Cria uma nova tarefa.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               isFavorite:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 */
router.post("/", createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma tarefa (qualquer campo).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               isFavorite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada.
 *       404:
 *         description: Tarefa não encontrada.
 */
router.patch("/:id", updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente (alias de patch).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               isFavorite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada.
 *       404:
 *         description: Tarefa não encontrada.
 */
router.put("/:id", updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Remove uma tarefa existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarefa removida.
 *       404:
 *         description: Tarefa não encontrada.
 */
router.delete("/:id", deleteTodo);

export default router;
