const taskRepository = require("./repositories/taskRepository");
const pool = require("./db");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns a list of all tasks.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of tasks.
 */

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskRepository.getAllTasks();
        res.json(tasks);
    } catch (error) {
    console.error(error);

    res.status(500).json({
        error: "Internal Server Error"
    });
}
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Returns a single task based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found successfully.
 *       404:
 *         description: Task not found.
 */

app.get("/tasks/:id", async (req, res) => {

    try {

        const taskId = parseInt(req.params.id);

        const task = await taskRepository.getTaskById(taskId);

        if (!task) {
            return res.status(404).json({
                error: `Task ${taskId} not found`
            });
        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task and adds it to the task list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Title is required.
 */

app.post("/tasks", async (req, res) => {

    try {

        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const newTask = await taskRepository.createTask(title);

        res.status(201).json(newTask);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: Updates the title and/or completion status of a task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Express
 *               done:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       404:
 *         description: Task not found.
 */

app.put("/tasks/:id", async (req, res) => {

    try {

        const taskId = parseInt(req.params.id);

        const { title, done } = req.body;

        const updatedTask = await taskRepository.updateTask(
            taskId,
            title,
            done
        );

        if (!updatedTask) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 */

app.delete("/tasks/:id", async (req, res) => {

    try {

        const taskId = parseInt(req.params.id);

        const deletedTask = await taskRepository.deleteTask(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(204).send();

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

pool.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});