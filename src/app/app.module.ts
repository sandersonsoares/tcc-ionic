import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HomePage} from '../pages/home/home';
import {MyApp} from './app.component';
import {AuthProvider} from "../providers/auth.provider";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {IonicStorageModule} from "@ionic/storage";
import {TasksPage} from "../pages/tasks/tasks";
import {ProfilePage} from "../pages/profile/profile";
import {TabsComponent} from "../components/tabs/tabs";
import {UserProvider} from "../providers/user.provider";
import {TaskProvider} from "../providers/task.provider";


@NgModule({
  declarations: [
    MyApp,
    TabsComponent,
    LoginPage,
    RegisterPage,
    HomePage,
    TasksPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsComponent,
    LoginPage,
    RegisterPage,
    HomePage,
    TasksPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    TaskProvider
  ]
})
export class AppModule {
}
