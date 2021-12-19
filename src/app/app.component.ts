import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mask';

  formattedValue: string = '';
  currentValue: string = '';

  setValue(event: any) {
    this.formattedValue = event;
  }
}
