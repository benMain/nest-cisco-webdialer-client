# Nest-Cisco-WebDialer-Client

<img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Crank_Yankers.png/250px-Crank_Yankers.png">

## Purpose
To allow applications to interact with the Cisco WebDialer [SOAPService](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cucm/devguide/9_1_1/xmldev-911/wd.pdf)
You can use this library to make and end phone calls on the Cisco System ( eg. dial out to sex hotlines from your co-workers work phone).



## Installation

```bash
$ npm install nest-cisco-webdialer-client
```

## Usage

Register Global Module

```typescript
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WebDialerModule } from 'nest-cisco-webdialer-client';

@Module({
  imports: [WebDialerModule.forRoot({ webDialerWsdlUrl: 'https://cisco.fakeCompany.com/webdialer/services/WebdialerSoapService70?wsdl'})],
  providers: [AppService],
})
export class AppModule {}
```

Use the Globally injected Service to make and end calls! Whoo hoo!

```typescript
import { CanonicalPhoneNumber, WebDialerClientService } from 'nest-cisco-webdialer-client';

export class AppService {

  constructor(private readonly webDialerClient: WebDialerClientService){}

  // You must know the userId and password used by the Cisco System. 
  async makeCall( userId: string, password: string, dialNumber: string) {
    await this.webDialerClient.makeCall(userId, password, dialNumber);
  }

  async makeCallCanonically( userId: string, password: string, canonicalPhoneNumber: CanonicalPhoneNumber) {
    await this.webDialerClient.makeCall(userId, password, canonicalPhoneNumber);
  }

  async endCall(userId: string, password: string) {
    await this.webDialerClient.endCall(userId, password);
  }

}


```




## Support

Pull Requests are welcome, just make sure they follow Angular Changelog Convention.

## Stay in touch

- Author - [Benjamin Main](mailto::bam036036@gmail.com)

## License

  Nest is [MIT licensed](LICENSE).
