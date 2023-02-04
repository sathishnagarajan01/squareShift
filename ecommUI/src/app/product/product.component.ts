import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
	constructor(
		private productService: ProductService,
		private router: Router
	) { }
	public productList: any = [];
	public showCartCount: any;

	ngOnInit() {
		this.showCartCount = localStorage.getItem('cartCount');
		this.getProductById(100);
		this.getProductById(101);
		this.getProductById(102);
		this.getProductById(103);
		this.getProductById(104);
		this.getProductById(105);
		this.getProductById(106);
		this.getProductById(107);
		this.getProductById(110);
	}

	getProductById(id: number) {
		this.productService.getProduct(id)
		.subscribe({
			next: (product: any) => {
				this.productList.push(product);
			},
			error: (err) => {
				console.log(err);
			},
			complete: () => {
				console.log('product finally');
			}
		});
	}

	productDetail(product: any) {
		this.router.navigate(['/productDetail', product.response.id]);
	}
}
