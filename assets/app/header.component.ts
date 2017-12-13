import {Component} from "@angular/core";
@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/videos']">Videos</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/payment']">Payment</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/auth']">Login/Register</a></li>
                </ul>    
            </nav>
        </header>
    `
})
export class HeaderComponent {

}
