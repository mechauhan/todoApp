import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class TodoComponent {
  tasks: Task[] = [];
  changeInstatus: string = 'pending';

  task = {
    title: '',
    description: '',
    status: 'pending',
    id: '',
  };

  taskToUpdate: any = { title: '', description: '', status: 'pending', id: '' };
  isModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.getTasks();
  }

  onStatusChange(event: any) {
    console.log('Status changed to:', event);
    this.task.status = event; // Update the task status
    // Additional logic can go here
  }

  addTask() {
    if (this.task.title === '') {
      alert('Please enter a title');
    } else {
      let dataToSend = {
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
      };
      console.log(dataToSend, this.task);

      this.http
        .post('http://localhost:5006/user/todo/insert', dataToSend, {
          headers: { accesstoken: localStorage.getItem('authToken') || '' },
        })
        .subscribe((response: any) => {
          if (response.statusCode === 200) {
            this.getTasks();
            this.task = {
              title: '',
              description: '',
              status: 'pending',
              id: '',
            };
          }
          console.log(response);
        });
    }
  }

  getTasks() {
    this.http
      .get('http://localhost:5006/user/todo/getall', {
        headers: { accesstoken: localStorage.getItem('authToken') || '' },
      })
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response.data);
          console.log(response.data[0]._id);

          this.tasks = response.data;
        }
      });
  }

  deleteTask(id: any) {
    const url = 'http://localhost:5006/user/todo/delete';
    console.log(id);

    // Create HttpParams object with the query parameter
    const params = new HttpParams().set('id', id);

    // Make the HTTP DELETE request with query parameters and headers
    this.http
      .delete(url, {
        params: params,
        headers: {
          accesstoken: localStorage.getItem('authToken') || '',
        },
      })
      .subscribe({
        next: (response: any) => {
          if (response.statusCode === 200) {
            this.getTasks(); // Refresh tasks
          }
          console.log(response);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
  }

  openUpdateModal(task: any) {
    this.taskToUpdate = { ...task };
    this.taskToUpdate.id = task._id;
    this.isModalOpen = true;
  }

  closeUpdateModal() {
    this.isModalOpen = false;
  }

  updateTask() {
    console.log('Updated Task:', this.taskToUpdate);
    this.http
      .put('http://localhost:5006/user/todo/update', this.taskToUpdate, {
        headers: { accesstoken: localStorage.getItem('authToken') || '' },
      })
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.getTasks();
        }
        console.log(response);
      });
    this.closeUpdateModal();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
