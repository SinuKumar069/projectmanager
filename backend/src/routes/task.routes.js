import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controllers/task.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRole } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

// Task routes
router
  .route("/projects/:projectId/tasks")
  .get(validateProjectPermission(AvailableUserRole), getTasks)
  .post(validateProjectPermission(AvailableUserRole), createTask);

router
  .route("/projects/:projectId/tasks/:taskId")
  .get(validateProjectPermission(AvailableUserRole), getTaskById)
  .put(validateProjectPermission(AvailableUserRole), updateTask)
  .delete(validateProjectPermission(AvailableUserRole), deleteTask);

// Subtask routes
router
  .route("/projects/:projectId/tasks/:taskId/subtasks")
  .post(validateProjectPermission(AvailableUserRole), createSubTask);

router
  .route("/projects/:projectId/tasks/:taskId/subtasks/:subtaskId")
  .put(validateProjectPermission(AvailableUserRole), updateSubTask)
  .delete(validateProjectPermission(AvailableUserRole), deleteSubTask);

export default router;

