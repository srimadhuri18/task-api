const pool = require("../db");

async function getAllTasks() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
}

async function getTaskById(id) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function createTask(title) {
  const result = await pool.query(
    "INSERT INTO tasks (title, done) VALUES ($1, false) RETURNING *",
    [title]
  );
  return result.rows[0];
}

async function updateTask(id, title, done) {
  const result = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($2, title),
         done = COALESCE($3, done)
     WHERE id = $1
     RETURNING *`,
    [id, title, done]
  );

  return result.rows[0];
}

async function deleteTask(id) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};