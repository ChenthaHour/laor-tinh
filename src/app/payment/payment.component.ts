import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllApiService } from '../core/all-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;
  loading = false;
  isSuccess = false;
  dataPayment: any;
  dataImport: any;

  // Static default values
  defaultPaymentData = [
    {
      name: 'Hour Chentha',
      cardNumber: '4242 4082 4232 3542',
      currency: 'USD'
    },    
    {
      name: 'Leng HengLong',
      cardNumber: '4242 4242 4242 4242',
      currency: 'USD'
    }
  ]

  constructor(private fb: FormBuilder, private allApi: AllApiService, private route: ActivatedRoute, ) {
    // Initialize form with static values
    this.paymentForm = this.fb.group({
      name: [null, Validators.required],
      cardNumber: [null, [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expiry: [null,  [Validators.required]],
      cvv: [null, [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      this.dataImport = params['dataPayment'];
      console.log('data:', this.dataImport);
    });
  }

  // processPayment() {
  //   if (this.paymentForm.invalid) return;

  //   this.loading = true;
  //   setTimeout(() => {
  //     this.loading = false;
  //     this.isSuccess = true;
  //     console.log('Paid with:', this.paymentForm.value);
  //   }, 2000);
  // }

  createPayment(){
    this.loading = true
    this.allApi.createPayment(this.dataImport).subscribe(
      (data:any) => {
        console.log('data sucess payment', data)
        this.verifyPayment(data.data.paymentId);
        this.loading = false
      }
    )
  }

  verifyPayment(id:number){
    this.loading = true
    this.allApi.verifyPayment(this.allApi.verifyPaymentUrl , id).subscribe(
      (data:any) =>{
          console.log('payment success');
          this.isSuccess = true;
          this.loading = false
      }
    )
  }

}
