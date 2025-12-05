import { Component } from '@angular/core';
import { AuthRoutingModule } from "../auth/auth-routing-module";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [AuthRoutingModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {

}
