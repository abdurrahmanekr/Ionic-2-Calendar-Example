import { Storage, SqlStorage } from 'ionic-angular';

export class ActivityService {
    constructor() {}

    static getAllTodo() {
        let db = new Storage(SqlStorage);
        return db.query("SELECT * FROM Todo");
    }

    static addTodo(data){
        let db = new Storage(SqlStorage);
        return db.query('INSERT INTO Todo(name, description, date, tags) VALUES (?, ?, ?, ?)', 
                        [data.name, data.description, data.date, data.tags]);
    }

    static updateTodo(data){
        let db = new Storage(SqlStorage);
        return db.query('UPDATE Todo SET id = ?, name = ?, description = ?, date = ?, tags = ? WHERE id = ?',
                        [data.name, data.description, data.date, data.tags, data.id]);
    }

    static getUserList(where, data){
        let db = new Storage(SqlStorage);
        let sql = "SELECT * FROM Todo WHERE " + where;
        return db.query(sql, data);
    }

    static deleteTodo(id){
        let db = new Storage(SqlStorage);
        return db.query("DELETE FROM Todo WHERE id = " + id);
    }

}