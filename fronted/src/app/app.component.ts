import * as tf from '@tensorflow/tfjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'knn-size';
  userDataForm: FormGroup;
  model: tf.LayersModel;

  constructor(private fb: FormBuilder, private ml: tf.LayersModel) {
    this.userDataForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(1)]]
    });

    this.model = this.ml;
  }

  async ngOnInit(): Promise<void> {
    this.model = await tf.loadLayersModel('path/to/your/model.json');
  }

  onSubmit(): void {
    if (this.userDataForm.valid) {
      console.log(this.userDataForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  async predict(weight: number, age: number, height: number): Promise<number> {
    const normalizedWeight = weight / 100;
    const normalizedAge = age / 100;
    const normalizedHeight = height / 100;
  
    const inputData = tf.tensor2d([[normalizedWeight, normalizedAge, normalizedHeight]]);
  
    const prediction = this.model.predict(inputData) as tf.Tensor<tf.Rank>;
  
    return prediction.dataSync()[0];
  }
}