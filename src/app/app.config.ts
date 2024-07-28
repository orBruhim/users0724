import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimations} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatNativeDateModule} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}, provideAnimationsAsync(),
        importProvidersFrom(MatNativeDateModule),
        provideAnimationsAsync(),
    ]
};
