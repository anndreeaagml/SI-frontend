import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  
  constructor(private http: HttpClient,private storageService: StorageService) {}

  productDetails: any;
  
  getProducts(): Observable<any> {
    let authKey = this.storageService.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', authKey);
    headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post
      ("http://68.219.99.197:8002", {"query": "query getAllProducts {products {id product_name product_sub_title product_description price main_category sub_category  overall_rating}}" }, { headers: headers });

  }

  getProductDetail(id: number): Observable<any> {
    let authKey = this.storageService.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', authKey);
    headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post
      ("http://68.219.99.197:8002",
       {
        "query": "query getProduct($productId: ID!) {product(id: $productId) {id product_name product_description price product_images {product_id image_url alt_text additional_info}}}",
        "variables": {"productId": id} 
      }, { headers: headers });

  }
  /* productDetails = [
    {
      id: 1,
      product_name: 'Laptop',
      product_sub_title: '',
      main_category: 'Electronics',
      sub_category: 'Laptop',
      link: '',
      overall_rating: 4.5,
      price: 1000,
      product_description: 'Laptop description',
      image_url: 'https://picsum.photos/3840/2160?random=1',
      alt_text: 'Laptop',
    },
    {
      id: 2,
      product_name: 'Mobile',
      product_sub_title: '',
      main_category: 'Electronics',
      sub_category: 'Mobile',
      link: '',
      overall_rating: 4.5,
      price: 1000,
      product_description: 'Mobile description',
      image_url: 'https://picsum.photos/3840/2160?random=2',
      alt_text: 'Mobile',
    },
    {
      id: 3,
      product_name: 'TV',
      product_sub_title: '',
      main_category: 'Electronics',
      sub_category: 'TV',
      link: '',
      overall_rating: 4.5,
      price: 1000,
      product_description: 'TV description',
      image_url: 'https://picsum.photos/3840/2160?random=3',
      alt_text: 'TV',
    },
    {
      id: 4,
      product_name: 'Speaker',
      product_sub_title: '',
      main_category: 'Electronics',
      sub_category: 'Speaker',
      link: '',
      overall_rating: 4.5,
      price: 1000,
      product_description: 'Speaker description',
      image_url: 'https://picsum.photos/3840/2160?random=4',
      alt_text: 'Speaker',
    },
    {
      id: 5,
      product_name: 'Tablet',
      product_sub_title: '',
      main_category: 'Electronics',
      sub_category: 'Tablet',
      link: '',
      overall_rating: 4.5,
      price: 1000,
      product_description: 'Tablet description',
      image_url: 'https://picsum.photos/3840/2160?random=5',
      alt_text: 'Tablet',
    },
    {
      id: 6,
      product_name: 'Home Theater',
      product_sub_title: '',
      main_category: 'Electronics',
      sub_category: 'Home Theater',
      link: '',
      overall_rating: 4.5,
      price: 1000,
      product_description: 'Home Theater description',
      image_url: 'https://picsum.photos/3840/2160?random=6',
      alt_text: 'Home Theater',
    },
  ]; */
}
