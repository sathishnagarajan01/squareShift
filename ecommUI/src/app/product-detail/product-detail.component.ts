import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	public productItem: any = {};
	private id!: number
	private sub: any;
	public productStatus: boolean = false;
	public discountPrice!: any;
	public rateBlackStar: any = 0;
	public rateWhiteStar: any = 0;
	public cartCount: any = 0;
	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.cartCount = localStorage.getItem('cartCount');
		this.route.params.subscribe(params => {
			this.id = +params['id'];
		});
		console.log(this.id);
		this.getProductById(this.id);
	}

	addCartItem(cartData: any) {
		this.cartService.addToCart(cartData)
		.subscribe({
			next: (res: any) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			},
			complete: () => {
				console.log('finally cart add');
			}
			
		});
	}

	getProductById(id: number) {
		this.productService.getProduct(id)
		.subscribe({
			next: (product: any) => {
				console.log(product);
				this.productItem = product;
				this.discountPrice = (product.response.price - ((product.response.discount_percentage/100) * product.response.price));
				this.discountPrice = this.discountPrice.toFixed(2);
				let blackStar = Math.ceil(product.response.rating.rate);
				let whiteStar = 5 - blackStar;
				this.rateBlackStar = Array(blackStar).fill('X');
				this.rateWhiteStar = Array(whiteStar).fill('X');
				this.productStatus = true;
				this.addCartItem(product.response);
			},
			error: (err) => {
				console.log(err);
			},
			complete: () => {
				console.log('product finally');
			}
		});
	}

	addToCart() {
		this.cartCount++
		localStorage.setItem('cartCount', this.cartCount.toString());
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
