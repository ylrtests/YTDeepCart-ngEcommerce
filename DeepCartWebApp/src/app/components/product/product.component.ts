import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  private routeSub;
  private product: Product;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.routeSub =  this.route.params.subscribe( params => {
      let id = params['id'];
      let slug = params['slug'];
      this.productService.getProduct(id).subscribe(
        (res) => {
          this.product = res;
          //Product does not exist
          if(!this.product){
            this.router.navigate(['404'])
          }

          //Changes slug in url because it is different from slug given.
          if (slug != this.product.slug){
            console.log("cambiare")
            this.location.go( '/p/'+id+'/'+this.product.slug );
          }
        }
      )
    })
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
