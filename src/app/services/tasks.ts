import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  base_url = 'http://localhost:8000/api/tasks/';

  private tasksSubject = new BehaviorSubject<{ id: number; title: string; description: string; completed: boolean }[]>([]);
  tasks$: Observable<{ id: number; title: string; description: string; completed: boolean }[]> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadTasks(filtro_nombre = "", filtro_completed = "Todos"): void {
    let params = new HttpParams();

    if (filtro_nombre.trim()) {
      params = params.append('title', filtro_nombre);
    }
    if (filtro_completed !== 'Todos') {
      params = params.append('completed', filtro_completed === 'Finalizada' ? 'true' : 'false');
    }

    this.http.get<{ id: number; title: string; description: string; completed: boolean }[]>(this.base_url, { params })
      .subscribe({
        next: (tasks) => this.tasksSubject.next(tasks),
        error: (error) => this.handleError('Error fetching tasks', error),
      });
  }

  addTask(task: { title: string; description: string; completed: boolean }): void {
    this.http.post<{ id: number }>(this.base_url, task).subscribe({
      next: () => this.loadTasks(),
      error: (error) => this.handleError('Error adding task', error),
    });
  }

  editTask(task: { id: number; title: string; description: string; completed: boolean }): void {
    this.http.put(this.base_url + task.id + '/', task).subscribe({
      next: () => this.loadTasks(),
      error: (error) => this.handleError('Error editing task', error),
    });
  }

  toggleTaskComplete(task: { id: number; completed: boolean }): void {
    this.http.patch(this.base_url + task.id + '/', { completed: task.completed }).subscribe({
      next: () => this.loadTasks(),
      error: (error) => this.handleError('Error toggling task completion', error),
    });
  }

  deleteTask(taskId: number): void {
    this.http.delete(this.base_url + taskId + '/').subscribe({
      next: () => this.loadTasks(),
      error: (error) => this.handleError('Error deleting task', error),
    });
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    // Aquí podrías implementar una lógica más compleja de manejo de errores
  }
}