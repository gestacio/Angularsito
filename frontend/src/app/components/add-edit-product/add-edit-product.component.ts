import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operation: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operation = 'Editar';
      this.getProduct(this.id);
    }
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    }

    this.loading = true;
    if (this.id === 0) {
      // Es agregar
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue registrado con éxito`, "Producto registrado")
        this.loading = false;
        this.router.navigate(['/products'])
      })
    } else {
      // Es editar
      product.id = this.id
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fue actualizado con éxito`, "Producto actualizado")
        this.loading = false;
        this.router.navigate(['/products'])
      })
    }
    
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }
}
