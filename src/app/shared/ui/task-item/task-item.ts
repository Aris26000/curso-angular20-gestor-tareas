import { Component, input, output } from '@angular/core';
import  { Task } from '../../../features/tasks/task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {

  task = input.required<Task>();

  toggle = output<number>(); //Esto va a emitir un evento al padre para que actualice el estado de la tarea
  removed = output<number>(); //Esto va a emitir un evento al padre para que elimine la tarea
}
