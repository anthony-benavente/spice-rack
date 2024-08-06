import { Injectable } from "@angular/core";
import { ProtectedService } from "./protectedService.service";
import { map, Observable } from "rxjs";
import { SpiceModel } from "../../../db/spice.model";

interface IGetSpicesResults {
    limit: number;
    page: number;
    results: SpiceModel[];
    totalPages: number;
    totalResults: number;
}

@Injectable()
export class SpicesService extends ProtectedService {

    getSpices(): Observable<SpiceModel[]> {
        return this.get<IGetSpicesResults>('spices', { limit: 100, sortBy: 'name' }).pipe(
            map(data => data.results)
        );
    }

    addSpice(spice: SpiceModel): Observable<SpiceModel> {
        return this.post('spices', spice);
    }

    getBrands(): Observable<string[]> {
        return this.get<string[]>('spices/brands', { sortBy: 'name' });
    }
}