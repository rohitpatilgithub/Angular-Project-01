import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  users :any [] = [];

  routes = inject (Router)


  newUser = {
    name:'',
    email:'',
    password:''
  }
  
  login = { 
    name:'',
    password:''
  }

  createDetails(){
    this.users.push(this.newUser);
    this.newUser = {
      name:'',
      email:'',
      password:''
    }
    localStorage.setItem("userDetails",JSON.stringify(this.users))
  }

  ngOnInit(){
    const localData = localStorage.getItem("userDetails")
    if(localData != null){
      this.users = JSON.parse(localData);
    }
    gsap.registerPlugin(ScrollTrigger);
    
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
    // tl.from("#form2 input",{
    //   opacity:0,
    //   y:-10,
    //   duration:0.5,
    //   stagger:1
    // })
  }

  onLogIn(){
    const loginDetails = this.users.find((e) => 
      e.name === this.login.name && e.password === this.login.password
  )
    if (loginDetails != undefined) {

      localStorage.setItem("logInUser",JSON.stringify(loginDetails))
      alert('Login Successful');
      
      this.routes.navigateByUrl('/app-tasks')
    } else {
      alert('Invalid Details');
    }
    this.login = {
      name:'',
      password:''
    }
  }

  resetLogin(){
    this.login = {
      name : '',
      password : ''
    }
  } 
}

// import { Component, OnInit, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   users: any[] = [];
//   routes = inject(Router);

//   newUser = {
//     name: '',
//     email: '',
//     password: ''
//   };

//   login = { 
//     name: '',
//     password: ''
//   };

//   ngOnInit() {
//     const localData = localStorage.getItem("userDetails");
//     if (localData) {
//       this.users = JSON.parse(localData);
//     }
//   }

//   createDetails() {
//     if (!this.newUser.name.trim() || !this.newUser.email.trim() || !this.newUser.password.trim()) {
//       alert("Please fill in all fields!");
//       return;
//     }

//     const existingUser = this.users.find(user => user.name === this.newUser.name);
//     if (existingUser) {
//       alert("Username already exists! Try another one.");
//       return;
//     }

//     this.users.push({ ...this.newUser });
//     localStorage.setItem("userDetails", JSON.stringify(this.users));

//     this.newUser = { name: '', email: '', password: '' };
//     alert("Account created successfully!");
//   }

//   onLogIn() {
//     const loginDetails = this.users.find(user => 
//       user.name === this.login.name && user.password === this.login.password
//     );

//     if (loginDetails) {
//       localStorage.setItem("loggedInUser", JSON.stringify(loginDetails));
//       alert('Login Successful');
//       this.routes.navigateByUrl('/app-tasks');
//     } else {
//       alert('Invalid Details');
//     }

//     this.login = { name: '', password: '' };
//   }

//   resetLogin() {
//     this.login = { name: '', password: '' };
//   }
// }