import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-backgroun-music',
  templateUrl: './backgroun-music.component.html',
  styleUrls: ['./backgroun-music.component.scss']
})
export class BackgrounMusicComponent implements OnInit {
  audio = new Audio("../assets/music/Alan-Silvestri-Portals-From-Avengers-EndgameAudio-Only.mp3");
  volumen: number | any = 50;
  constructor() { }
  ngOnDestroy(): void {
  }
  ngOnInit() {
  }
  playMusic() {
    this.audio.play();
  }
  pauseMusic() {
    this.audio.pause();
  }
  musicVolumen() {
    console.log(this.volumen / 100)
    this.audio.volume = this.volumen / 100;
  }
}
