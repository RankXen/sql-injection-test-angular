import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  content?: string;
  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
    console.log('inside board'+this.tokenStorage.getFromSession("pizzaPlace"));
    //window.location.reload();
    this.content = this.tokenStorage.getFromSession("pizzaPlace")!;
    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }
}