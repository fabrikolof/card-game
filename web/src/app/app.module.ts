import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiService} from './shared/services/api.service';
import { ListGameComponent } from './pages/list-game/list-game.component';
import { MisjuegosComponent } from './pages/misjuegos/misjuegos.component';
import { BoardComponent } from './pages/board/board.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './componets/header/header.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input'
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { BackgrounMusicComponent } from './componets/backgroun-music/backgroun-music.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    ListGameComponent,
    BoardComponent,
    HomeComponent,
    HeaderComponent,
    BackgrounMusicComponent,
    MisjuegosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideAuth(()=> getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    LoginModule,
    CoolSocialLoginButtonsModule,
    MatSliderModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
