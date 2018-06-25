import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private todoList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}

  getTodos(): AngularFireList<any> {
    return this.db.list('todos');
  }

  addTodo(todo) {
    this.getTodos().push({
      ...todo,
      isDone: false
    });
  }

  updateTodo(id, done): void {
    this.getTodos().update(id, { done });
  }

  deleteTodo(id): void {
    this.getTodos().remove(id);
  }
}
