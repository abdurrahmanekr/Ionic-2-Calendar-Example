import { Storage, SqlStorage } from 'ionic-angular';

export class ActivityService
{
	static storage: Storage = null;
  	constructor() {
  	}

  	static getAllTodo(){
  		this.storage = new Storage(SqlStorage);
  		let sql = "SELECT * FROM Todo WHERE statu='1' ORDER BY id DESC";
  		return this.storage.query(sql);
  	}

  	static getUserList(where:string, data){
  		this.storage = new Storage(SqlStorage);
  		let sql = "SELECT * FROM Todo WHERE " + where;
  		return this.storage.query(sql, data);
  	}

  	static addTodo (data){
  		if (data.name == "" || data.date == "") {
  			return;
  		} else {
	  		this.storage = new Storage(SqlStorage);
	  		let sql = 'INSERT INTO Todo (name, description, tags, date, statu) VALUES (?, ?, ?, ?, ?)';
	    	return this.storage.query(sql, [data.name, data.description, data.tags, data.date, "1"]);
  		}
  	}

  	static deleteTodo(id){
  		if (id == "") {
  			return;
  		} else {
	  		this.storage = new Storage(SqlStorage);
	  		let sql = 'DELETE FROM Todo WHERE id = ?';
	    	return this.storage.query(sql, [id]);
  		}	
  	}

  	static updateTodo(data){
  		if (data.id == "" || data.date == "") {
  			return;
  		} else {
	  		this.storage = new Storage(SqlStorage);
	  		let sql = 'UPDATE Todo SET name = ?, description = ?, tags = ?, date = ?, statu = ?  WHERE id = ?';
	    	return this.storage.query(sql, [data.name, data.description, data.tags, data.date, "1", data.id]);
  		}	
  	}

}