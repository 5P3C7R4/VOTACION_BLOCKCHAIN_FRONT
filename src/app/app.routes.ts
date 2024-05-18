import { Routes } from '@angular/router';
import { VotingViewComponent } from './components/voting-view/voting-view.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { FingerprintAdminComponent } from './components/fingerprint-admin/fingerprint-admin.component';
import { ScanDocumentComponent } from './components/scan-document/scan-document.component';

export const routes: Routes = [
    { path: "scan", component: ScanDocumentComponent },
    { path: "fingerprint", component: FingerprintAdminComponent },
    { path: "voting", component: VotingViewComponent },
    { path: "**", redirectTo: "/scan", pathMatch: "full" },
];
