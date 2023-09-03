import { Component } from '@angular/core';
import { Inviter, SessionState, URI, UserAgent } from 'sip.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private userAgent!: UserAgent;
  private inviter!: Inviter;

  ngOnInit() {
    const uri = new URI('sip', 'soubky', 'sip.linphone.org');
    const userAgentConfig = {
      uri: uri,
      transportOptions: {
        wsServers: ['wss://sip.linphone.org']
      },
      authorizationUser: 'soubky',
      password: 'omaromar123'
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
    const targetURI = new URI('sip', 'ashrafiko', 'sip.linphone.org');
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

