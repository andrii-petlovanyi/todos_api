import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { addTodo, allTodo, changeStatus, deleteTodo } from '../services/todos.service';

const addTodoCtrl = async (req: Request, res: Response) => {
    const body = req.body
    console.log(body)
    const todo = await addTodo(body)

    res.status(201).json({ message: 'Todo added successfully!', todo })
}

const allTodoCtrl = async (req: Request, res: Response) => {
    const todoList = await allTodo()

    res.status(200).json({ todoList })
}

const deleteTodoCtrl = async (req: Request, res: Response) => {
    const todoId: ObjectId = new ObjectId(req.params.todoId)
    await deleteTodo(todoId)

    res.status(200).json({ message: 'Todo deleted successfully!' })
}

const changeStatusCtrl = async (req: Request, res: Response) => {
    const todoId: ObjectId = new ObjectId(req.params.todoId)
    const { status } = req.body
    const updatedTodo = await changeStatus(todoId, status)

    res.status(200).json({ message: 'Todo status updated successfully!', updatedTodo })
}



export { addTodoCtrl, allTodoCtrl, deleteTodoCtrl, changeStatusCtrl }