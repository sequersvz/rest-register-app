import { Component, OnInit, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import { MapService } from './map-service.service';
import { NgForm, NgModel } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {FormValues, FormSanitizes, CoordinatesModel, modalHtmlInstructions} from './app.model';

import {convertToArray, sanitizeValForAPI} from './app.utils';
import { Store } from '@ngrx/store';
import { AppState } from './store/model';
import { Subscription } from 'rxjs';

import { SendForm } from './store/actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {
  // Manual ubication and maps ubication boolean
  public manualUbication = false;
  public mapsUbication = false;

  // loading map loader boolean
  public loadingMap = false;

  // In case user doesnt permit to use his ubication
  private errorMapsUbication: PositionError;

  // Coordinates for maps and form
  private coords: CoordinatesModel;

  // Maps Facade instance
  private mapInit = false;

  // Boolean to change if user open info modal
  public infoOpened = false;

  // Form Booleans
  public isSendingForm = false;
  public dataFormSended = false;
  private notificationShowed = false;

  // Subscriptions
  private subscriptionStore: Subscription;

  @ViewChild('notificationSuccess', {static: true}) notificationTemplate: TemplateRef<any>;


  constructor(
    private mapService: MapService,
    private modalService: NzModalService,
    private store: Store<AppState>,
    private notification: NzNotificationService
    ) {}

  ngOnInit(): void {
    this.subscriptionStore = this.store.select('formStore').subscribe(val => {
      this.isSendingForm = val.isSendingData;
      if (val.isDataSended) {
        this.manualUbication = false;
        this.mapsUbication = false;
      }
    });


  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }

  // CHANGE TO SET MANUAL UBICATION

  public addManualUbication(): void {
    this.manualUbication = true;
    this.mapsUbication = false;
  }

  // MAPS METHODS

  private _addCoordinates({lng, lat}: CoordinatesModel): void {
    this.coords = {
      lng,
      lat
    };
  }

  public loadActualUbication(): void {
    this.mapsUbication = true;
    if (!this.mapInit) {
      this.loadingMap = true;
      window.navigator.geolocation.getCurrentPosition((pos) => {
        this._addCoordinates({lng: pos.coords.longitude, lat: pos.coords.latitude});
        this.mapService.initMap(pos.coords);
        this.mapService.map.on('load', () => {this.loadingMap = false; });
        this.mapInit = true;
        this.mapService.marker.on('dragend', () => {this._addCoordinates(this.mapService.markerLatLng); });
      }, (error => this.errorMapsUbication = error), {enableHighAccuracy: true});
    }
  }

  // FORM METHODS

  public onSubmit(form: NgForm): void {
    if (this.infoOpened && form.value) {
      if (!this.notificationShowed) {
        this._createBasicNotification(this.notificationTemplate); this.notificationShowed = true;
      }
      const valuesFromForm: FormValues = form.value;

      if (valuesFromForm.hasOwnProperty('Categories')) {valuesFromForm.Categories = convertToArray(valuesFromForm.Categories, ','); }
      if (valuesFromForm.hasOwnProperty('Tags')) {valuesFromForm.Tags = convertToArray(valuesFromForm.Tags, ','); }
      const valuesToSubmit: FormSanitizes = sanitizeValForAPI(valuesFromForm);
      valuesToSubmit.Ubication = {
        Direction: valuesFromForm.Direction ? valuesFromForm.Direction : '',
        Geopoint: this.coords && ('lat' && 'lng') in this.coords ? this.coords : {lat: 1, lng: 1}
      };
      this.store.dispatch(new SendForm(valuesToSubmit));
      form.reset();

    }

  }


  public infoModal(): void {
    this.modalService.info({
      nzTitle: 'Instrucciones para ayudar a la recopilacion de datos',
      nzContent: modalHtmlInstructions,
      nzOnOk: () => {
          this.infoOpened = true;
      },
      nzOkText: 'Entendido',
    });
  }

  private _createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }


}
