import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WineService } from 'src/app/services/wine.service';
import { wineNameValidator } from "src/app/validators/wine-name.validator";

@Component({
  selector: 'app-wine-new',
  templateUrl: './wine-new.component.html',
  styleUrls: ['./wine-new.component.css']
})
export class WineNewComponent {
  
  @Output() private wineNew: EventEmitter<void> = new EventEmitter();
  public wine: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private wineService: WineService
    ) {
    this.createForm();
  }

  createForm() {
    this.wine = this.formBuilder.group({
      name: ['', [Validators.required, wineNameValidator()]],
      price: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['', [Validators.pattern("^http(s?)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?$")]], // Importante (Validators.required quitado para comprobar el correcto funcionamiento del customPipe creado)
      isOnSale: [false]
    });
  }

  createWine() {
    if (this.wine.valid) {
      console.log("Se han recogido los datos del formulario correctamente");
      let wine = {
        id: null,
        name: this.wine.value.name,
        imageUrl: this.wine.value.imageUrl,
        price: this.wine.value.price,
        foodPairing: [],
        isOnSale: this.wine.value.isOnSale,
        quantityInCart: 0
      }
      this.wineService.create(wine)
        .subscribe((msg) => {
          console.log(msg);
          this.wineNew.next();
        }, (err) => console.error(err));
    } else {
      console.error("Formulario inválido");
    }
  }

}
