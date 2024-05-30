import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'knn-size';
  userDataForm: FormGroup;
  http: HttpClient;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.userDataForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(1)]]
    });
    this.http = this.httpClient;
  }

  async ngOnInit(): Promise<void> {
  }

  onSubmit(): void {
    if (this.userDataForm.valid) {
      console.log(this.userDataForm.value);
      this.getPrediction();
    }
  }

  getPrediction(): void {
      this.http.post('http://localhost:5000/predict', this.userDataForm.value)
      .subscribe((data: any) => {
        console.log(data);
        alert("Tall: "+data.size_predicted);
      });
  }

}