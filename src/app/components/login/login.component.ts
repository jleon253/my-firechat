import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _cs: ChatService) { }

  ngOnInit() {
  }

  login( socialNet: string ) {
    this._cs.login(socialNet);
  }
}
