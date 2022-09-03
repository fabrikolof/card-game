import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

export interface EventHandle{
  (event:any):void;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject: any

  constructor() {
  }

  connect(juegoId: string){
    this.subject = webSocket(environment.socketBase + juegoId);
    return this.subject;
  }

  subscribe(callback: EventHandle){
    this.subject.subscribe({
      next: (msg: any)=> callback(msg), // Called whenever there is a message from the server.
      error: (err: any) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  close(){
    if(this.subject)
      this.subject.unsubscribe();
  }

}

