import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { JuegoModel } from 'src/app/shared/model/juego';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.scss'],
})
export class ListGameComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['alias', 'cantidad', 'iniciado', 'id'];
  dataSource: JuegoModel[] = [];
  constructor(
    public api: ApiService,
    public authService: AuthService,
    public ws: WebsocketService,
    public router: Router) {
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

  ngOnInit(): void {
    this.api.getMisJuegos(this.authService.user.uid).subscribe((elements) => {
      this.dataSource = elements.filter(el => !el.finalizado)
    });
  }

  entrar(id: string) {
    this.router.navigate(['board', id]);
  }

  iniciar(id: string) {
    this.ws.connect(id);
    this.ws.subscribe((event) => {
      console.log(event);
      if (event.type == 'cardgame.tablerocreado') {
        this.api.crearRonda({
          juegoId: id,
          tiempo: 30,
          jugadores: event.jugadorIds.map((it: any) => it.uuid)
        }).subscribe();
      }
      if (event.type == 'cardgame.rondacreada') {
         this.router.navigate(['board', id]);
        }
      });
      this.api.iniciarJuego({ juegoId: id }).subscribe();
    }
}
