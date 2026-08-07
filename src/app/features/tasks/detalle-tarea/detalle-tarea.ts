import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskStore } from '../task-store';

@Component({
  selector: 'app-detalle-tarea',
  imports: [RouterLink],
  templateUrl: './detalle-tarea.html',
  styleUrl: './detalle-tarea.css',
})
export class DetalleTarea {
private store = inject(TaskStore);

id = input.required<string>();

tarea = computed(() => this.store.tareas().find(t => t.id === Number(this.id())));
}
