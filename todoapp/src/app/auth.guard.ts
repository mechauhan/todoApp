import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem('authToken'); // Example check

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
