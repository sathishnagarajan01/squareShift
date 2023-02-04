import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	public showCartCount: any;
	public cartAllItem: any;
	public postalStatus: boolean = false;
	public checkoutValue: any;
	public checkoutStatus: boolean = false;
	@ViewChild('postalcode') postalCode!: ElementRef;
	constructor(
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.showCartCount = localStorage.getItem('cartCount');
		this.getAllCart();
	}

	getAllCart() {
		this.showCartCount = localStorage.getItem('cartCount');
		this.cartService.getCartList()
		.subscribe({
			next: (cartList) => {
				this.cartAllItem = cartList;
			},
			error: (err) => {
				console.log(err);
			}, 
			complete: () => {
				console.log('finally cart list');
			}
		});
	}

	deleteAllCart() {
		this.cartService.deleteCartItems()
		.subscribe({
			next: (res) => {
				console.log(res);
				localStorage.removeItem('cartCount');
				this.checkoutStatus = false;
				this.postalCode.nativeElement.value = '';
				this.getAllCart();
			},
			error: (err) => {
				console.log(err);
			}, 
			complete: () => {
				console.log('finally cart list');
			}
		});
	}

	checkout() {
		let postalCode = this.postalCode.nativeElement.value;
		if(postalCode) {
			this.postalStatus = false;
			this.cartService.checkout(postalCode)
			.subscribe({
				next: (checkoutRes) => {
					console.log(checkoutRes);
					this.checkoutValue = checkoutRes;
					this.checkoutStatus = true;
				},
				error: (err) => {
					console.log(err);
				},
				complete: () => {
					console.log('finally checkout');
				}
			});
		} else {
			this.postalStatus = true;
		}
	}
}
