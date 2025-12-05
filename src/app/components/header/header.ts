import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthStateService } from '../../Services/auth-state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  userName = '';
  token = '';
  isMobileMenuOpen = false;
  dropdownOpen = false;

  constructor(
    private authState: AuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔥 Cuando el usuario cambia → el header se actualiza SOLO
    this.authState.userData$.subscribe(user => {
      if (user) {
        this.userName = user.nombres;
        this.token = localStorage.getItem('token') || '';
      } else {
        this.userName = '';
        this.token = '';
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.authState.logout();  // 🔥 Actualiza al instante
    this.closeMobileMenu();
    this.router.navigate(['/auth/login']);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
