import { Client, createClientAsync } from 'soap';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { OPTIONS_TOKEN, SOAP_TOKEN } from './symbols';

import { WebDialerClientService } from './web-dialer-client/web-dialer-client.service';
import { WebDialerModuleOptions } from './web-dialer-module-options.interface';

@Global()
@Module({
  providers: [
    WebDialerClientService,
    {
      provide: SOAP_TOKEN,
      useFactory: async (options: WebDialerModuleOptions) => {
        if (!options.soapSecurity) {
          return await createClientAsync(options.webDialerWsdlUrl);
        }
        const client: Client = await createClientAsync(
          options.webDialerWsdlUrl,
        );
        client.setSecurity(options.soapSecurity);
        return client;
      },
      inject: [OPTIONS_TOKEN],
    },
  ],
  exports: [WebDialerClientService],
})
export class WebDialerModule {
  static forRoot(
    webDialerModuleOptions: WebDialerModuleOptions,
  ): DynamicModule {
    return {
      module: WebDialerModule,
      providers: [
        WebDialerClientService,
        {
          provide: SOAP_TOKEN,
          useFactory: async (options: WebDialerModuleOptions) => {
            return await createClientAsync(options.webDialerWsdlUrl);
          },
          inject: [OPTIONS_TOKEN],
        },
        {
          provide: OPTIONS_TOKEN,
          useValue: webDialerModuleOptions,
        },
      ],
      exports: [WebDialerClientService],
    };
  }
}
