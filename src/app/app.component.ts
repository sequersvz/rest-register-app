import { Component, OnInit } from '@angular/core';
import { MapService } from './map-service.service';
import { NgForm } from '@angular/forms';

import {FormValues} from './app.model';

import {convertToArray, sanitizeVal} from './app.utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  public manualUbication = false;
  public mapsUbication = false;
  private errorMapsUbication: PositionError;
  public loadingMap = false;
  private coords: {lat: number, lng: number};
  private mapInit = false;

  constructor(private map: MapService) {}

  ngOnInit(): void {}

  public addManualUbication(): void {
    this.manualUbication = true;
    this.mapsUbication = false;
  }

  private _addCoordinates({lng, lat}): void {
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
        this.map.initMap(pos.coords);
        this.map.map.on('load', () => {this.loadingMap = false; });
        this.mapInit = true;
        this.map.marker.on('dragend', () => {this._addCoordinates(this.map.markerLatLng); });
      }, (error => this.errorMapsUbication = error), {enableHighAccuracy: true});
    }
  }

  public onSubmit(form: NgForm): void {

  const valuesFromForm: FormValues = form.value;

  if (valuesFromForm.categories) {valuesFromForm.categories = convertToArray(valuesFromForm.categories, ','); }
  if (valuesFromForm.tags) {valuesFromForm.tags = convertToArray(valuesFromForm.tags, ','); }

  const valuesToSubmit: FormValues = sanitizeVal(valuesFromForm);
  }
}
