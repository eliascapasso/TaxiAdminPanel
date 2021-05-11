import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../domain/user.model';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    companyName: string;
    public user: User = new User();
    public errorMessage: string = '';

    constructor(public authService: AuthService, public router: Router) {}

    ngOnInit() {
        this.companyName = environment.CompanyName;
        localStorage.clear();
    }

    async onLoggedin() {
        this.errorMessage = '';

        try {
            await this.authService.onLogin(this.user);

            console.assert('Successfully login user!');

            localStorage.setItem('isLoggedin', 'true');
            this.router.navigateByUrl('/dashboard');
        } catch (error) {
            console.warn(error.message);
            this.errorMessage = error.message;
        }
    }
}
