import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyWord: String = null;
  

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {
    console.log("ProductListComponent is CREATED")
              }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const currentSearchKeyword = this.route.snapshot.paramMap.get('keyword');

    if(this.previousKeyWord != currentSearchKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyWord = currentSearchKeyword;

    this.productService.searchProductPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              currentSearchKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId= ${this.currentCategoryId}, previousCategoryId =${this.previousCategoryId}
                                                            , pageNumber=${this.thePageNumber}`);

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                                this.thePageSize,
                                                this.currentCategoryId).subscribe(this.processResult());
  }

  processResult(){
    return data=>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
  updatePageSize(newPageSize: number){
    this.thePageSize = newPageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
  addToCart(addedProduct: Product){
    
    const theCartItem = new CartItem(addedProduct);
    
    this.cartService.addToCart(theCartItem);
  }
}
