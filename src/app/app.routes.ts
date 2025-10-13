import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
{
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
},
{
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
},
{
    path: 'products',
    loadComponent: () => import('./components/products/products').then(m => m.Products),
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Customer'] } // both admin and customer can access
},
{
    path: 'dashboard',
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] } // only admin can access
},
{
    path: 'cart',
    loadComponent: () => import('./components/cart/cart').then(m => m.Cart),
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Customer'] } // both admin and customer can access
},
{
    path: 'purchase-history',
    loadComponent: () => import('./components/purchase-history/purchase-history').then(m => m.PurchaseHistory),
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Customer'] } // both admin and customer can access
}

];
