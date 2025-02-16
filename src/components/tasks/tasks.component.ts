import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  inputTask: any[] = [];
  loggedIn:any = '';
  inpValue = {
    task: '',
    describe: '',
  };

  tasks:any [] = [];

  ngOnInit(): void {
    const loginUser = localStorage.getItem('logInUser'); // login user
    this.loggedIn = loginUser ? JSON.parse(loginUser) : null;

    let localData = localStorage.getItem('task');
      
    if (localData != null) {
      this.tasks = JSON.parse(localData);
      this.inputTask = this.loggedIn ? this.tasks.filter(task => task.userName === this.loggedIn.name) : [];
    }

    let tl = gsap.timeline();
    tl.from("form",{
      opacity:0,
      duration:0.4,
      delay:1
    })
    tl.from("h2",{
      opacity:0,
      y:-10,
      duration:2,
      delay:1
    })
    tl.from("form input",{
      opacity:0,
      y:-10,
      duration:1,
      delay:1,
      stagger:1
    })
    tl.from("button",{
      opacity:0,
      y:-10,
      duration:0.5,
    })
    tl.from("#box",{
      opacity:0,
      y:-10,
      duration:1,
      delay:1,
      stagger:1
    })
  }

  generateTask() {
    let tasks = JSON.parse(localStorage.getItem('task') || '[]'); // Retrieve existing tasks
    const task = {
      userName: this.loggedIn.name, // Link task to user
      task: this.inpValue.task,
      describe: this.inpValue.describe,
    };
    tasks.push(task); // Add new task
    localStorage.setItem('task', JSON.stringify(tasks)); // Save updated tasks

    // Explicitly define the type of 't'
    this.inputTask = tasks.filter((t: { userName: string }) => t.userName === this.loggedIn.name);

    // this.inputTask.push(this.inpValue)
    this.inpValue = {
      task: '',
      describe: '',
    };
  }
}