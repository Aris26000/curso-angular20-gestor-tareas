import { computed, effect, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

const STORAGE_KEY = 'tareas';
const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

interface TodoApi {
  id: number;
  title: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class TaskStore {


  private http = inject(HttpClient);

  tareas = signal<Task[]>(this.cargar());
  cargando = signal(false);
  error = signal('');
  pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas()));
    });
  }

  agregar(titulo: string): void {
    const limpio = titulo.trim();
    if (!limpio) {
      return;
    }

    this.tareas.update((lista) => [
      ...lista,
      { id: Date.now(), titulo: limpio, completada: false },
    ]);
  }

  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }
  eliminarCompletadas(): void {
    this.tareas.update((lista) => lista.filter((t) => !t.completada));
  }
  
    cargarEjemplos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.http.get<TodoApi[]>(API_URL).subscribe({
      next: (datos) => {
        const tareas = datos.map((d) => ({
          id: d.id,
          titulo: d.title,
          completada: d.completed,
        }));
        this.tareas.set(tareas);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar las tareas de ejemplo. Intentelo de nuevo');
        this.cargando.set(false);
      },
    });
  }

    private cargar(): Task[] {
    const guardadas = localStorage.getItem(STORAGE_KEY);

    if (guardadas) {
      return JSON.parse(guardadas);
    }

    return [
      { id: 1, titulo: 'Aprender angular', completada: false },
      { id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
      { id: 3, titulo: 'Dominar signals', completada: true },
    ];
  }
}
