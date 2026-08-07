import { Routes } from '@angular/router';
import { ListaTareas } from './features/tasks/lista-tareas/lista-tareas';

export const routes: Routes = [
{
    path: '',
    component: ListaTareas,
},
{
    path: 'tarea/:id',
    loadComponent: () => import('./features/tasks/detalle-tarea/detalle-tarea').then((m) => m.DetalleTarea),
}

];
