import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem [] = [];

  totalPrice: Subject<number> = new Subject <number>();
  totalQuantity: Subject<number> = new Subject <number>();

  constructor() {
    console.log("Cart Service is CREATED")
  }

  addToCart(theCartItem : CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){

      for(let tempCartItem of this.cartItems){
        if(theCartItem.id === tempCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }
    }

      alreadyExistsInCart = (existingCartItem != undefined);

      if(alreadyExistsInCart){
        existingCartItem.quantity++;
      }
      else{
        this.cartItems.push(theCartItem);
      }
    this.computeCartTotatls();
  }

  computeCartTotatls(){
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let tempCartItem of this.cartItems){
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.localCartData(totalPriceValue, totalQuantityValue);
  }

  localCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`${totalPriceValue} and ${totalQuantityValue}`);
  }
}
