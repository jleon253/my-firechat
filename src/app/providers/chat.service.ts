import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';

import { map } from 'rxjs/operators';

import { Message } from '../interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  
  private itemsCollection: AngularFirestoreCollection<Message>;
  chats: Message[] = [];
  usuario: any = {};

  constructor(private afs: AngularFirestore, private fAuth: AngularFireAuth) {
    this.fAuth.authState.subscribe(user => {
      if (!user) {return; }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(socialNet: string) {
    if (socialNet == 'google') {
      this.fAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.fAuth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.fAuth.signOut();
  }

  loadMessage() {
    this.itemsCollection = this.afs.collection<Message>('chats', (ref) =>
      ref.orderBy('fecha', 'asc').limitToLast(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        this.chats = messages;
      })
    );
  }

  sendMessage(texto: string) {
    const message: Message = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
    };
    // Forma de insertar en Firebase (es una promesa)
    return this.itemsCollection.add(message);
  }
}
