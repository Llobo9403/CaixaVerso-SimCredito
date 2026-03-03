import { Routes } from '@angular/router';
import { SimularComponent } from './pages/simular/simular.component';
import { HistoricoComponent } from './pages/historico/historico.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'simular',
        pathMatch: 'full'
    },
    {
        path: 'simular',
        component: SimularComponent
    },
    {
        path: 'historico',
        component: HistoricoComponent
    },
    {
        path: '**',
        redirectTo: 'simular'
    }
];
