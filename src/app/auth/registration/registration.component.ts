import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersServise} from '../../shared/services/users.servise';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegirstrationComponent implements OnInit {

  form: FormGroup;


  constructor(private usersService: UsersServise,
              private router: Router,
              private title: Title
  ) {
    title.setTitle('Регистрация');
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue ])
    });
  }
  onSubmit(){
    const {email, password, name} =this.form.value;
    const user = new User(email, password, name);
    this.usersService.createNewUsers(user)
      .subscribe(() => {
        this.router.navigate(['/login', {
          queryParams: {
            nowCanLogin: true
          }
        }]);
      })
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if(user){
            resolve({forbiddenEmail: true})
          } else {
            resolve(null);
          }
        });
    });
  }
}
