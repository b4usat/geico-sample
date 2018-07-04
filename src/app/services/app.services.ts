import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, pipe } from 'rxjs';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { YearCollection, CarModel } from './model';

@Injectable()
export class DataService {
    constructor(private http: Http) {

    }

    loadyears(): Observable<YearCollection> {
        const collect: YearCollection = new YearCollection();
        return this.http.get('/api/loaddata/year')
            .pipe(map((response: Response) => {
                collect.years = response.json().data ? response.json().data : response.json();
                return collect;
            }));
        // .catchError(this.handleError);

    }

    loadCarManufacturer(): Observable<CarModel> {
        return this.http.get('/api/loaddata/carmanufacturer')
            .pipe(map((response: Response) => {
                return response.json().data ? response.json().data : response.json();
            }));
    }

    loadCarModel(make: string): Observable<CarModel> {
        return this.http.get('/api/loaddata/carmodel/' + make)
            .pipe(map((response: Response) => {
                return response.json().data ? response.json().data : response.json();
            }));
    }

    loadAntiTheftDevice(): Observable<CarModel> {
        return this.http.get('/api/loaddata/antitheft')
            .pipe(map((response: Response) => {
                return response.json().data ? response.json().data : response.json();
            }));
    }

    private handleError(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
