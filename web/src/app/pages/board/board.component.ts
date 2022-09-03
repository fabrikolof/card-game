import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from 'src/app/shared/model/mazo';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

/*export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}*/

//TODO: componente para el tablero de juego
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})


export class BoardComponent implements OnInit, OnDestroy {

  /*tiles: Tile[] = [
    {text: 'Número de jugadores, Tiempo de ronda, Botón de iniciar', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Mazo con cartas', cols: 1, rows: 10, color: 'lightgreen'},
    {text: 'Partida', cols: 3, rows: 9, color: 'lightpink'},
  ];*/
  cartasDeJugadorEnTablero: string[] = [];
  cartasDelJugador: Carta[] = [];
  cartasDelTablero: Carta[] = [];
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  juegoId: string = "";
  uid: string = "";
  roundStarted:boolean = false;

  constructor(
    public api: ApiService,
    public authService: AuthService,
    public ws: WebsocketService,
    private route: ActivatedRoute,
    public router: Router){}

  ngOnInit(): void {

      this.route.params.subscribe((params) => {
        this.juegoId = params['id'];
        this.uid = this.authService.user.uid;
        this.api.getMiMazo(this.uid, this.juegoId).subscribe((element:any) => {
          this.cartasDelJugador = element.cartas;
        });

      this.api.getTablero(this.juegoId).subscribe((element) => {

        this.cartasDelTablero = Object.entries(element.tablero.cartas).flatMap((a: any) => {
          return a[1];
        });
        this.tiempo = element.tiempo;
        this.jugadoresRonda = element.ronda.jugadores.length;
        this.jugadoresTablero = element.tablero.jugadores.length;
        this.numeroRonda = element.ronda.numero;
      });

      this.ws.connect(this.juegoId);
      this.ws.subscribe((event) => {

        console.log(event);

        if (event.type === 'cardgame.ponercartaentablero') {
          this.cartasDelTablero.push({
            cartaId: event.carta.cartaId.uuid,
            poder: event.carta.poder,
            estaOculta: event.carta.estaOculta,
            estaHabilitada: event.carta.estaHabilitada,
          });
          if(this.uid == event.jugadorId.uuid) {
            this.cartasDeJugadorEnTablero.push(
              event.carta.cartaId.uuid
            )
          }
        }
        if (event.type === 'cardgame.cartaquitadadelmazo') {
          this.cartasDelJugador = this.cartasDelJugador
            .filter((item) => item.cartaId !==  event.carta.cartaId.uuid);
        }
        if (event.type === 'cardgame.tiempocambiadodeltablero') {
          this.tiempo = event.tiempo;
        }

        if(event.type === 'cardgame.rondainiciada'){
          this.roundStarted = true;
        }

        if(event.type === 'cardgame.rondaterminada'){
          this.roundStarted = false;
          this.cartasDelTablero = [];
          this.tiempo = 30;
          this.numeroRonda++;
          //this.tiempo = event.tiempo;
          //this.numeroRonda = event.numeroRonda;
        }

        if(event.type === 'cardgame.juegofinalizado'){
          //ALERTA
          if(confirm("El ganador es " + event.alias)){
            this.router.navigate(['home']);
          }
        }

        if(event.type === 'cardgame.cartasasignadasajugador'){

        }

        if(event.type === 'cardgame.rondacreada'){

        }
      })
    });
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

  poner(cartaId: string) {
    if(this.roundStarted) {
      this.api.ponerCarta({
        cartaId: cartaId,
        juegoId: this.juegoId,
        jugadorId: this.uid
      }).subscribe();
    }
    if(!this.roundStarted) {
      alert("La ronda tiene que estar iniciada para apostar.");
    }
  }

  iniciarRonda(){
    this.api.iniciarRonda({
      juegoId: this.juegoId,
    }).subscribe();
  }

  validarVistaCarta(idCarta: string): boolean {
    return this.cartasDeJugadorEnTablero.includes(idCarta);
  }
}
