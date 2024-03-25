import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent implements OnInit{

  public productForm!: FormGroup;

  constructor(private fb:FormBuilder){

  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      // Add your service call here to save the product
    } else {
      console.log('Form is not valid');
    }
  }
  
}
