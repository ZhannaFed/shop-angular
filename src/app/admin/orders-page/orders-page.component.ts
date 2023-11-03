import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent {

  orders: any[] = [] 
  pSub!: Subscription
  rSub!: Subscription

  constructor(
  private orderService: OrderService
){}

  ngOnInit(): void {
    this.pSub = this.orderService.getAll().subscribe( orders => {
        this.orders = orders
      
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
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter( order => order.id !== id)
    })
  }
}
