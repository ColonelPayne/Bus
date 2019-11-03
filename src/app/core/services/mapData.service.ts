import {busPatch} from '../testData/busPath';
import {StandardServerResponse} from '../serverResponse.model';

export class MapDataService {

  constructor(){}

  public async getPatchArray(): Promise<StandardServerResponse> {
    return await new Promise<StandardServerResponse>(resolve => {
      setTimeout(() => resolve(busPatch), 1500);
    });
  }
}
