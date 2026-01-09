import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Tasks } from './services/tasks';
import { NgForm } from '@angular/forms';
import { log } from 'node:console';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App implements OnInit {

  constructor(private tasksService: Tasks) {}

  taskList: { id: number; title: string; description: string; completed: boolean }[] = [];
  newTask = { id : 0, title: '', description: '', completed: false };

  async ngOnInit() {
    console.log('App component initialized');
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.tasks$.subscribe(tasks => {
      this.taskList = tasks;
    });

    this.tasksService.loadTasks(); // Carga las tareas inicialmente
  }

  cleanForm() {
    this.newTask = { id : 0, title: '', description: '', completed: false };
  }

  async addTask() {
    if (this.newTask.title.trim()) {
      if (this.newTask.id == 0) {
        this.tasksService.addTask(this.newTask); // Call the service to add the task
      } else {
        this.tasksService.editTask(this.newTask); // Call the service to edit the task
      }

      this.cleanForm();
    }
  }

  async selectTask(task: { id: number; title: string; description: string; completed: boolean }) {
    this.newTask = { ...task };
  }

  async toggleTaskCompletion(task: { id: number; title: string; description: string; completed: boolean }) {
    task.completed = !task.completed;

    this.tasksService.toggleTaskComplete(task);
  }

  async deleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }
}
