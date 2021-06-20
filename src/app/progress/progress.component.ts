import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent implements OnInit {
  reg= ["As Member", "As User"]
  constructor(private router : Router, private serv : AuthService) { }
  step= 1;
  bar = ["tab-1", "tab-2", "tab-3", "tab-4"];
  photoStyleArr = ["Select Your photography Style","Family Photography","Wedding Photography","Pre-wedding Photography","Baby-Shower","Engagement","Food Photography","Outdoor Photography"]
  stateArr = ["Select Your State","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Jharkhand","Himachal Pradesh","Jammu and Kashmir","Tamil Nadu","Karnataka","Kerala","Maharashtra","Punjab","Rajasthan"]
  cityArr = ["Select Your City","Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad","Chennai","Kolkata","Surat","Pune","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Thane","Bhopal","Pimpri-Chinchwad","Vadodara","Agra","Nashik","Navi Mumbai","Kolhapur","Mangalore"]
  
  photoStyle = "Select Your photography Style";
  city="Select Your City";
  name = ""; address = ""; phone =""; email="";
  state = "Select Your State"
  about = "";
  password = "";
  id = 0;
  ngOnInit() {
    let that =this;
    this.applyForm();
    this.getId();
    setTimeout(()=>{
      if(sessionStorage.getItem('logged')){
          that.fetchMem();
      }
    },500)
  }

  getId(){
    this.serv.getLastId('member').subscribe((data:any)=>{
      this.id = parseInt(data[0].id);
    })
  }

  fetchMem(){
      let id = parseInt(sessionStorage.getItem('id'));
      this.serv.fetchMembers(id).subscribe((data)=>{
          this.name = data[0].name;
          this.address = data[0].address;
          this.email = data[0].email;
          this.phone = data[0].phone;
          this.city = data[0].city;
          this.state = data[0].state;
          this.about = data[0].about;
          this.photoStyle = data[0].photoStyle;

      })
  }

  applyForm(){

  }

  getClass(i){
    if(i<this.step){
      return "active"
    }
  }

  next(){
    this.step += 1;
  }

  prev(){
    this.step -= 1;

  }

  goToReg(reg){
    if(reg == 'As Member'){
      this.router.navigateByUrl('register-member')
    }else{
      this.router.navigateByUrl('register-user')
    }
  }

  goToLogin(){
    this.router.navigateByUrl("login")
  }

  goToHome(){
    this.router.navigateByUrl("home")
  }

  register(){
      let obj = {
          name : this.name,
          email : this.email,
          phone : this.phone,
          city : this.city,
          state : this.state,
          about : this.about,
          photoStyle : this.photoStyle,
          address : this.address,
      }
    console.log(JSON.stringify(obj))
    this.serv.addMemberDetails(obj).subscribe((data)=>{
        if(data == "success"){
            alert("Details added");
        }else{
            alert("Something went wrong....")
        }
    });
    this.serv.newRequest(obj,this.id).subscribe((data)=>{
      if(data == "success"){
        console.log(data);
      }else{
        console.log(data);
      }
    })

    this.serv.insertData(this.email,this.password,'member',this.id).subscribe((data)=>{
      if(data == "success"){
        alert("Registration Successful... ");
        this.router.navigateByUrl('login');
    }else{
        alert("Registration Failed....")
    }
    })
  }

}