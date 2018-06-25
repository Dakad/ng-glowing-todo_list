import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private todos: any[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService
      .getTodos()
      .snapshotChanges()
      .subscribe(item => {
        this.todos = item
          .map(element => ({
            id: element.key,
            ...element.payload.toJSON()
          }))
          .sort((a: any, b: any) => a.done - b.done);
      });
  }

  onAdd(todo) {
    const title = todo.value.trim();
    if (!title) return;
    this.todoService.addTodo({ title });
    todo.value = null;
  }

  onSetTodoDone(id, done) {
    this.todoService.updateTodo(id, !done);
  }

  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }
}
