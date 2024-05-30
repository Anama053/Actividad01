import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'knn-size';

  userDataForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userDataForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userDataForm.valid) {
      console.log(this.userDataForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
