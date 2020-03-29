import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-poduct-category-menu',
  templateUrl: './poduct-category-menu.component.html',
  styleUrls: ['./poduct-category-menu.component.css']
})
export class PoductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
    data=>{
      this.productCategories=data;
    })
  }

}
