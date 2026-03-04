import { Routes } from '@angular/router';
import { SimularComponent } from './features/pages/simular/simular.component';
import { HistoricoComponent } from './features/pages/historico/historico.component';

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
