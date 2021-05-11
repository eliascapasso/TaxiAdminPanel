import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { User } from '../domain/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    public user: User = new User();
    public pass2: string;
    public errorMessage: string = '';
    public success: boolean = false;

    constructor(public authService: AuthService, private router: Router) {}

    companyName: string;

    ngOnInit() {
        this.companyName = environment.CompanyName;
    }

    async onRegistrer(){
        this.errorMessage = "";
        this.success = false;

        if(this.user.pass == this.pass2){
            try{
                const user = await this.authService.onRegistrer(this.user);
                if(user){
                    console.assert("Successfully created user!");
                    this.success = true;
    
                    var $this = this;
                    setTimeout(function(){ $this.router.navigateByUrl('/login'); }, 2000);
                }
            }
            catch(error){
                console.warn(error.message);
                this.errorMessage = error.message;
            }
        }
        else{
            console.warn("Incorrect password");
            this.errorMessage = "Incorrect password";
        }
        
    }
}
