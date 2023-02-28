import express from 'express'
import { addTodoCtrl, allTodoCtrl, changeStatusCtrl, deleteTodoCtrl } from '../controllers/todo.controller'
import { idValidation } from '../middlewares/idValidation';
import { wrapCtrl } from '../middlewares/wrapCtrl'

const router = express.Router()

router.get('/', wrapCtrl(allTodoCtrl));
router.post('/', wrapCtrl(addTodoCtrl));
router.delete('/:todoId', idValidation, wrapCtrl(deleteTodoCtrl));
router.patch('/:todoId', idValidation, wrapCtrl(changeStatusCtrl));

export { router as todoRouter }