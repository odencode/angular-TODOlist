import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tasks } from './services/tasks'; // Asegúrate de que el nombre del servicio es correcto
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'] // Corrige a "styleUrls"
})
export class App implements OnInit {
  taskList: { id: number; title: string; description: string; completed: boolean }[] = [];
  newTask = { id: 0, title: '', description: '', completed: false };
  showForm = false;
  showLoading = false;
  filterName = "";
  filterCompleted = "Todos";

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  }); 

  constructor(private tasksService: Tasks) {}

  ngOnInit() {
    console.log('App component initialized');
    this.loadTasks();
  }

  loadTasks() {
    this.showLoading = true;
    
    this.tasksService.loadTasks(this.filterName, this.filterCompleted);
    
    this.tasksService.tasks$.subscribe(tasks => {
      this.taskList = [...tasks];
      this.showLoading = false;
    });
  }

  cleanForm() {
    this.newTask = { id: 0, title: '', description: '', completed: false };
    this.showForm = false;
  }

  addTask() {
    if (this.newTask.title.trim()) {
      if (this.newTask.id === 0) {
        this.tasksService.addTask(this.newTask);
      } else {
        this.tasksService.editTask(this.newTask);
      }

      this.Toast.fire({ title: "Tarea guardada", icon: "success" });
      this.cleanForm();
      this.loadTasks();
    }
  }

  selectTask(task: { id: number; title: string; description: string; completed: boolean }) {
    this.newTask = { ...task };
    this.showHideForm();
  }

  toggleTaskCompletion(task: { id: number; completed: boolean }) {
    task.completed = !task.completed;

    if (task.completed) {
      this.Toast.fire({ title: "Tarea Completada", icon: "success" });
    } else {
      this.Toast.fire({ title: "Tarea Pendiente", icon: "info" });
    }

    this.tasksService.toggleTaskComplete(task);
    this.loadTasks(); // Consider improving efficiency by not reloading all tasks
  }

  deleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId);
    this.Toast.fire({ title: "Tarea eliminada", icon: "warning" });
    this.loadTasks();
  }

  showHideForm() {
    this.showForm = !this.showForm;
  }
}
