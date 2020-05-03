import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../providers/chat.service';

import { Message } from '../../interface/message.interface';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje = '';
  chatBody: any;

  constructor(public _cs: ChatService) {
    this._cs.loadMessage().subscribe(() => {
      setTimeout(() => {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.chatBody = document.getElementById('chat-body');
  }

  sendMessage() {
    if (this.mensaje.length === 0) {
      return;
    }
    this._cs.sendMessage(this.mensaje)
      .then(() => {
        this.mensaje = '';
      })
      .catch( (err) => console.error('Error al enviar el mensaje', err));
  }

}
