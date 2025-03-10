import { Component } from '@angular/core';
import { StocksService } from '../service/stocks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-stocks',
  templateUrl: './show-stocks.component.html',
  styleUrls: ['./show-stocks.component.scss']
})
export class ShowStocksComponent {

  PRODUCT:any = {};
  product_id:string = '';
  isLoading$:any;  

  constructor(
    public stocksService: StocksService,
    public router: Router,
    public route: ActivatedRoute,
  ) {    
  }

  ngOnInit(): void 
  {    
    this.isLoading$ = this.stocksService.isLoading$;
    this.product_id = this.route.snapshot.params['id'];
    this.stocksService.getDetails(this.product_id).subscribe((resp:any) => {
      console.log(resp);
      this.PRODUCT = resp.product;
    });
  }

  goBack()
  {
    this.router.navigate(['stocks/list']);
  }

}
