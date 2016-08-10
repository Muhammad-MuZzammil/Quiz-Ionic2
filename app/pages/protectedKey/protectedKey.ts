import {Component} from "@angular/core";

@Component({
    template:   `
      <ion-header>
             <ion-navbar hideBackButton>
                  Welcome to Quiz Page
             </ion-navbar>
    </ion-header>
    <ion-content>
        <ion-item>
          <ion-label floating>Protected Key</ion-label>
          <ion-input type="text" ></ion-input>
          </ion-item>
            <button type="submit" medium seagreen>Submit Protected Key</button>   
    </ion-content>
    `
})

export class ProtectedKeyComponent {
    constructor() {}

}

