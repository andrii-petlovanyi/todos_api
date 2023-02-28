import { ObjectId } from "mongodb";
import { CustomError } from "../helpers/errors";
import { Todo } from "../model/todo.model";

interface ITodo {
    task: string,
    title: string
}


const addTodo = async (todo: ITodo) => {
    const newTodo = await Todo.create(todo)

    return newTodo
}

const allTodo = async () => {
    const todoList = await Todo.find()

    return todoList
}

const deleteTodo = async (todoId: ObjectId) => {
    const deleteTodo = await Todo.findOneAndDelete({ _id: todoId })

    if (!deleteTodo) throw new CustomError(`Sorry, but todo with id: ${todoId} not found`)

    return
}

const changeStatus = async (todoId: ObjectId, newStatus: boolean) => {
    const changedTodo = await Todo.findOneAndUpdate({ _id: todoId }, { status: newStatus }, { new: true })

    if (!changedTodo) throw new CustomError(`Sorry, but todo with id: ${todoId} not found`)

    return changedTodo
}

export { addTodo, allTodo, deleteTodo, changeStatus }