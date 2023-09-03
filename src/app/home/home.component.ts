import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Inviter, SessionState, URI, UserAgent } from 'sip.js';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private userAgent!: UserAgent;
  private inviter!: Inviter;

  subUsername = new Subscription()
  subPassword = new Subscription()

  username: any = ''
  password: any = ''

  targetUsername: any = ''

  constructor(
    private appServiceService: AppServiceService,
  ) {
    this.subUsername = this.appServiceService.username$.subscribe(val => {
      console.log(val)
      this.username = val
    })

    this.subPassword = this.appServiceService.password$.subscribe(val => {
      console.log(val)
      this.password = val
    })
  }

  ngOnInit() {
    const uri = new URI('sip', this.username, 'sip.linphone.org');
    const userAgentConfig = {
      uri: uri,
      transportOptions: {
        wsServers: ['wss://sip.linphone.org']
      },
      authorizationUser: this.username,
      password: this.password
    };

    // Create a user agent instance
    this.userAgent = new UserAgent(userAgentConfig);

    // Start the user agent
    this.userAgent.start().then(() => {
      console.log('User agent started');
    }).catch((error) => {
      console.error('Failed to start user agent:', error);
    });

  }

  makeCall() {
    // Create an outgoing invite request
    const targetURI = new URI('sip', this.targetUsername, 'sip.linphone.org');
    const options = { sessionDescriptionHandlerOptions: { constraints: {} } };
    this.inviter = new Inviter(this.userAgent, targetURI, options);

    // Send the invite request
    this.inviter.invite().then(() => {
      console.log('Call initiated');
    }).catch((error) => {
      console.error('Failed to initiate call:', error);
    });

    // Handle call state changes
    this.inviter.stateChange.addListener((newState) => {
      if (newState === SessionState.Terminated) {
        console.log('Call terminated');
      }
    });
  }
}

