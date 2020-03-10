// Angular and firestore modules
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';

// Ant design ng zorro Modules
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzNotificationModule } from 'ng-zorro-antd/notification';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReducerForm } from './store/reducer';
import { FormEffects } from './store/effects';

// env
import { environment } from 'environments/environment';
import { IconsProviderModule } from './icons-provider.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // Ant desing nz-zorro modules
    NzGridModule,
    NzLayoutModule,
    NzInputModule,
    NzAlertModule,
    NzModalModule,
    NzButtonModule,
    NzNotificationModule,
    // Ngrx
    StoreModule.forRoot({formStore: ReducerForm}),
    EffectsModule.forRoot([FormEffects]),
    // AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
