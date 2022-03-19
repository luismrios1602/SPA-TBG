import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { CardSeleccionP1Component } from './components/cards/cardsSelection/card-seleccion-p1/card-seleccion-p1.component';
import { CardSeleccionP2Component } from './components/cards/cardsSelection/card-seleccion-p2/card-seleccion-p2.component';
import { CardPreviewP1Component } from './components/cards/cardPreview/card-preview-p1/card-preview-p1.component';
import { CardPreviewP2Component } from './components/cards/cardPreview/card-preview-p2/card-preview-p2.component';
import { CardBattleP1Component } from './components/cards/cardBattle/card-battle-p1/card-battle-p1.component';
import { CardBattleP2Component } from './components/cards/cardBattle/card-battle-p2/card-battle-p2.component';
import { BattleComponent } from './pages/battle/battle.component';
import { CardSeleccionCpu2Component } from './components/cards/cardsSelection/card-seleccion-cpu2/card-seleccion-cpu2.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    HomeComponent,
    LoadingComponent,
    CardSeleccionP1Component,
    CardSeleccionP2Component,
    CardPreviewP1Component,
    CardPreviewP2Component,
    CardBattleP1Component,
    CardBattleP2Component,
    BattleComponent,
    CardSeleccionCpu2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
