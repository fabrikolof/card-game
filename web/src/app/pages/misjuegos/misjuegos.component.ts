import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { JuegoModel, Jugador } from 'src/app/shared/model/juego';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-misjuegos',
  templateUrl: './misjuegos.component.html',
  styleUrls: ['./misjuegos.component.scss']
})
export class MisjuegosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['alias', 'cantidad', 'ganador', 'participantes'];
  dataSource: JuegoModel[] = [];
 //jugadoresDePartida: Map<string, Jugador>[] = [];

  constructor(
    public api: ApiService,
    public authService: AuthService,
    public ws: WebsocketService
    ) {}

    ngOnDestroy(): void {
      this.ws.close();
    }
    ngOnInit(): void {
      this.api.getMisJuegos(this.authService.user.uid).subscribe((elements) => {
        this.dataSource = elements.filter(element => element.finalizado)
        console.log(this.dataSource);
      });
    }

}
