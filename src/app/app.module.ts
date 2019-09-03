import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './shared-module/components/cms/home/home.component';
import { MetaModule } from '@ngx-meta/core';

/* Angular metrial */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './root-module/material-module';

// import { Ng2UploaderModule } from 'ng2-uploader';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxUploaderModule } from 'ngx-uploader';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,MetaModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Ng2UploaderModule,
    ModalModule.forRoot(),
    NgxUploaderModule,
  ],
  providers: [BsModalRef],
  exports: [
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
