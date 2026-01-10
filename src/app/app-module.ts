import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2";

import { SwalComponent, SwalDirective } from "@sweetalert2/ngx-sweetalert2";

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    SwalComponent, SwalDirective
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideSweetAlert2({
        // Optional configuration
        fireOnInit: false,
        dismissOnDestroy: true,
    }),
  ],
  bootstrap: [App]
})
export class AppModule { }
