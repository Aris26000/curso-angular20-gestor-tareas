import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import  { Task } from '../../../features/tasks/task';

@Component({
  selector: 'app-task-item',
  imports: [RouterLink],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {

  task = input.required<Task>();

  toggle = output<number>(); //Esto va a emitir un evento al padre para que actualice el estado de la tarea
  removed = output<number>(); //Esto va a emitir un evento al padre para que elimine la tarea
}
