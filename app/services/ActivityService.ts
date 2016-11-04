import { SqlService } from './SqlService';

export class ActivityService {

    constructor() { }

    static getAllTodo() {
        return SqlService.select("Todo");
    }

    static addTodo(data) {
        return SqlService.insert("Todo", ["name", "description", "date", "tags"],
            [data.name, data.description, data.date, data.tags]);
    }

    static updateTodo(data) {
        return SqlService.update("Todo", ["name", "description", "date", "tags"],
            [data.name, data.description, data.date, data.tags],
            "id = ?",
            [data.id]);
    }

    static getUserList(where, data) {
        return SqlService.select("Todo", "*", where, data)
    }

    static deleteTodo(id) {
        return SqlService.delete("Todo", "id = ?", [id]);
    }

}