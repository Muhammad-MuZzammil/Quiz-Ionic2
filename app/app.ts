import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home'
import {startQuiz} from './pages/startQuiz/startQuiz'

import {FIREBASE_PROVIDERS, defaultFirebase,firebaseAuthConfig,AuthProviders,AuthMethods} from 'angularfire2';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[
        FIREBASE_PROVIDERS,
          defaultFirebase('https://luminous-torch-4640.firebaseio.com/'),
          firebaseAuthConfig({
    provider: AuthProviders.Custom,
    method: AuthMethods.CustomToken
  })],

  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = startQuiz;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
