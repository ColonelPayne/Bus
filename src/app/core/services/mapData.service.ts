import {busPatch} from '../testData/busPath';
import {StandardServerResponse} from '../serverResponse.model';

export class MapDataService {

  constructor(){}

  public async getPatchArray(): Promise<StandardServerResponse> {
    return await new Promise<StandardServerResponse>(resolve => {
      setTimeout(() => resolve(busPatch), 1500);
    });
  }

  public async getPatchArrayByCoord(lat: number, lng: number): Promise<StandardServerResponse> {
    return await new Promise<StandardServerResponse>(resolve => {
      setTimeout(() => {
        const patch = busPatch.data.filter(obj => {
          return obj.lat === lat && obj.lng === lng;
        });
        const result = {
          data: patch,
          status: 'success'
        }
        resolve(result);
      }, 1500);
    });
  }
}
