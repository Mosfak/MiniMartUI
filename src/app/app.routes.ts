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
    loadComponent: () => import('./components/products/products').then(m => m.Products)
}

];
