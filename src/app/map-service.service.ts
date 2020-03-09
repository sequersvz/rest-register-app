import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapbox = (mapboxgl as typeof mapboxgl);
  public map: mapboxgl.Map;
  public marker: mapboxgl.Marker;


  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  private _addDraggableMarker(lat, lng): void {
    this.marker = new mapboxgl.Marker({draggable: true}).setLngLat([lng, lat]).addTo(this.map);
  }

  private _buildMap(lat: number, lng: number): void {
    this.map = new mapboxgl.Map({
      container: 'Map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 15,
      center: [lng, lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this._addDraggableMarker(lat, lng);
    this.map.on('load', () => console.log('ddd'));
  }

  public initMap(coords: Coordinates): void {
      this._buildMap(coords.latitude, coords.longitude);
  }

  public get markerLatLng(): mapboxgl.LngLat {
    return this.marker.getLngLat();
  }
}
