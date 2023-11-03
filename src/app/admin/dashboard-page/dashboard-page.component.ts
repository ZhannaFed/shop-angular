import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  products: any[] = [] 
  pSub!: Subscription
  rSub!: Subscription
  productName = ""

  constructor(
  private productService: ProductService
){}

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe( products => {
        console.log(products)
        this.products = products
      
    })
  }

  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe()
    }

    if (this.rSub){
      this.rSub.unsubscribe()
    }
  }

  remove(id: any){
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter( product => product.id !== id)
    })
  }

}
