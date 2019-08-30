import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import {  flatMap, tap, finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  public wrapLoading<T>(source: Observable<T>): Observable<T> {
    let loader: any;

    const obs = from(this.loadingController.create({
        spinner: 'crescent'
    }));

    const wrapper = obs.pipe(
        tap(loader2 => {
            loader = loader2;
            loader2.present();
        }),
        flatMap(() => source),
        finalize(() => {
            loader.dismiss();
        })
    );

    return wrapper;
}
}
