import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/component/app.layout';
import { Notfound } from '@/pages/notfound/notfound';
import { NdtDashboard } from '@/pages/ndt-dashboard/ndt-dashboard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: NdtDashboard },
            { path: 'ndt-dashboard', component: NdtDashboard }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
