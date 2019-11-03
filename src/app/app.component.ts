import {Component, OnInit} from '@angular/core';
import {IPath} from './core/stations.interface';
import {busPatch} from './core/testData/busPath';
import {icon, latLng, marker, polyline, tileLayer, Map, point} from 'leaflet';
import {MapDataService} from './core/services/mapData.service';
import {StandardServerResponse} from './core/serverResponse.model';
import {from, of} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'busroute';

  public lat = 55.7234214;
  public lng = 37.61670738;

  public ready = false;
  public path = [];
  public showBus = false;
  // public path: IPath[] = busPatch;

  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  start = marker([0, 0], {});

  end = marker([0, 0], {});

  bus = marker([0, 0], {});

  route = polyline([]);

  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Старт пути': this.start,
      'Конец пути': this.end,
      'Путь': this.route
    }
  };

  options = {};

  constructor(private dataService: MapDataService) {}

  getPath(): any {
    // return Object.keys(path).map()
    return this.dataService.getPatchArray().then((result: StandardServerResponse<IPath>) => {
      const obj = Object.values(result.data).map(value => {
        return [value.lat, value.lng];
      });
      console.log(obj.slice(-1).pop());
      this.path = obj;
      this.route = polyline(obj);
      this.ready = true;

      this.start = marker(obj[0] as any, {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      });

      this.end = marker(obj.slice(-1).pop() as any, {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      });

      this.options = {
        layers: [ this.streetMaps, this.route, this.start, this.end ],
        zoom: 7,
        center: latLng([ this.lat, this.lng ])
      };
      return obj;
    });
  }

  onMapReady(map: Map) {
    map.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 16,
      animate: true
    });
  }

  onStart() {
    this.showBus = true;

    return from(this.path).pipe(
      concatMap(item => of(item).pipe(
        delay(1000)
      ))
    ).subscribe ( timedItem => {
      this.bus = marker([timedItem[0], timedItem[1]], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      });
    });
  }

  getCoords(event: Event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.getPath();
  }


}
