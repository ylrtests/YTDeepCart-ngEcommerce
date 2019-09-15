import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = environment.apiUrl + 'product';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getOffers(): Observable<Product[]>{
    let headers = this.authService.setHeaders();
    return this.http.get<Product[]>(`${this.baseURL}/offers`,  { headers: headers })
      .pipe(map( data => {

        data['offers'].map( d => {
          d.imgUrl = d.images[0].url+"-500-auto?width=500&height=auto&aspect=true";
          delete d.images;
        })

        return data['offers'];
      }));
  }

  
}
