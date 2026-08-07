import { Component, inject } from '@angular/core';
import { TaskForm } from '../../../shared/ui/task-form/task-form';
import { TaskItem } from '../../../shared/ui/task-item/task-item';
import { TaskStore } from '../task-store';

@Component({
  selector: 'app-lista-tareas',
  imports: [TaskItem,TaskForm],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareas {
  

  store = inject(TaskStore);
}
