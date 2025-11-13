import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
