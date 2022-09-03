import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { Jugador } from 'src/app/shared/model/juego';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { v1 as uuidv1 } from 'uuid';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
import {  map, startWith } from "rxjs/operators";

export class User {
  constructor(
    public displayName: string,
    public email: string,
    public uid: string,
    public selected?: boolean
  ) {
    if (selected === undefined) selected = false;
  }
}

  @Component({
    selector: 'app-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.scss']
  })
  export class NewGameComponent implements OnInit, OnDestroy {
    @ViewChild("userInput")
    private _userInput!: ElementRef;

    userControl = new FormControl();
    users: User[] = new Array<User>();
    uuid: any;
    selectedUsers: User[] = new Array<User>();
    filteredUsers: Observable<User[]> | undefined;
    lastFilter: string = "";

    constructor(
      public afs: AngularFirestore,
      public api: ApiService,
      public ws: WebsocketService,
      public router: Router,
      public authService: AuthService) {
    }

    ngOnInit() {
      this.afs.collection<any>(`users`).snapshotChanges().subscribe((actions) => {
        this.users = actions.map((item: any) => {
          const data = item.payload.doc.data();
          const selected = this.authService.user.uid === data.uid;
          const user = new User(data.displayName, data.email, data.uid, selected);
          if (selected) {
            this.selectedUsers.push(user);
          }
          return user;
        });

        //console.log(this.users);

        this.filteredUsers = this.userControl.valueChanges.pipe(
          startWith<string | User[]>(""),
          map(value => (typeof value === "string" ? value : this.lastFilter)),
          map(filter => this.filter(filter))
        );
      });

      this.uuid = uuidv4();
      this.ws.connect(this.uuid).subscribe({
        next: (event: any) => {
          if (event.type === 'cardgame.juegocreado') {
            this.router.navigate(['list']);
          }
        },
        error: (err: any) => console.log(err),
        complete: () => console.log('complete')
      });
    }

    ngOnDestroy(): void {
      this.ws.close();
    }


    crearJuego() {
      const jugadores: any = {};
      this.selectedUsers.forEach(user => {
        jugadores[user.uid] = user.displayName;
      })
      //TODO: tiene que haber más de 2 jugadores para poder crear una partida
      if(Object.keys(jugadores).length < 2) {
        console.log("La cantidad de jugadores es insuficiente... Hay:"
          +Object.keys(jugadores).length)
          +" no son suficientes jugadores para jugar.";
          return alert("Jugadores insuficientes para jugar.");
      }
      if(Object.keys(jugadores).length > 1) {
        console.log("Creación exitosa! Hay: "
          + Object.keys(jugadores).length
          + " jugaores más que suficientes para jugar.");
          return this.api.crearJuego(
            {
              juegoId: this.uuid,
              jugadores,
              jugadorPrincipalId: this.authService.userData.uid
            }
          ).subscribe();
      }
    }

    filter(filter: string): User[] {
      this.lastFilter = filter;
      if (filter) {
        return this.users.filter(option => {
          return (
            option.email.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
            option.displayName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          );
        });
      } else {
        return this.users;
      }
    }

    displayFn(value: User[] | string): string {
      let displayValue: string = "";
      if (Array.isArray(value)) {
        value.forEach((user, index) => {
          if (index === 0) {
            displayValue = user.displayName + " [" + user.email + "]";
          } else {
            displayValue += ", " + user.displayName + " [" + user.email + "]";
          }
        });
      } else {
        displayValue = value;
      }

      return displayValue;
    }

    optionClicked(event: Event, user: User) {
      event.stopPropagation();
      this.toggleSelection(user);
    }

    toggleSelection(user: User) {
      user.selected = !user.selected;
      if (user.selected) {
        this.selectedUsers.push(user);
      } else {
        const i = this.selectedUsers.findIndex(
          value =>
            value.uid === user.uid
        );
        this.selectedUsers.splice(i, 1);
      }
      this._userInput.nativeElement.focus();
    }

  }
