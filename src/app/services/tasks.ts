import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Tasks {

  base_url = 'http://localhost:8000/api/tasks/';

  private tasksSubject = new BehaviorSubject<{ id: number; title: string; description: string; completed: boolean }[]>([]);
    tasks$: Observable<{ id: number; title: string; description: string; completed: boolean }[]> = this.tasksSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadTasks(filtro_nombre = "", filtro_completed = "Todos"): void {

      let url = `${this.base_url}?`;
      if (filtro_nombre.trim()) {
        url += `title=${filtro_nombre}`
      } if (filtro_completed != 'Todos') {
        url += (filtro_nombre.trim()) ? '&' : '';
        url += `completed=${filtro_completed == 'Finalizada'}`
      }

      this.http.get<{ id: number; title: string; description: string; completed: boolean }[]>(url)
        .subscribe({
          next: (tasks) => {
            this.tasksSubject.next(tasks); // Emitir las nuevas tareas
          },
          error: (error) => {
            console.error('Error fetching tasks:', error);
          }
      });
  }

  getTasks(): Observable<{id: number; title: string; description: string; completed: boolean}[]> {
    const res = fetch(`${this.base_url}`).then(response => response.json());
    return new Observable(subscriber => {
      res.then(data => {
        subscriber.next(data);
        subscriber.complete();
      }).catch(error => {
        subscriber.error(error);
      });
    });
  }

  addTask(task: { title: string; description: string; completed: boolean }): void {
    this.http.post(this.base_url, task).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error adding task:', error),
    });
  }

  editTask(task: { id: number; title: string; description: string; completed: boolean }): void {
    this.http.put(`${this.base_url}${task.id}/`, task).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error editing task:', error),
    });
  }

  toggleTaskComplete(task: { id: number; title: string; description: string; completed: boolean }): void {
    this.http.patch(`${this.base_url}${task.id}/`, {completed: task.completed}).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error editing task:', error),
    });
  }

  deleteTask(taskId: number): void {
    this.http.delete(`${this.base_url}${taskId}/`).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error deleting task:', error),
    });
  }
}
