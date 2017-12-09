import {Component} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router){ }

    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                ( data ) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('hasPayed', data.hasPayed);
                    this.router.navigateByUrl('/');

                },
                ( error ) => {
                    console.error(error)
                }
            )
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$")
            ]),
            password: new FormControl(null, Validators.required),
        });
    }
}