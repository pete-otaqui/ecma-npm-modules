import { Component } from '@angular/core';
import { getFirstFormattedDate } from '@ecma-modules/lib-date';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-browser-angular';
  date = getFirstFormattedDate();
}
