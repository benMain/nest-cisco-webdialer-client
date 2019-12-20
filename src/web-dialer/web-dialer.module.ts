import { Module, DynamicModule, Global } from '@nestjs/common';
import { WebDialerClientService } from './web-dialer-client/web-dialer-client.service';
import { createClientAsync } from 'soap';
import { SOAP_TOKEN, OPTIONS_TOKEN } from './symbols';
import { WebDialerModuleOptions } from './web-dialer-module-options.interface';

@Global()
@Module({
  providers: [
    WebDialerClientService,
    {
      provide: SOAP_TOKEN,
      useFactory: async (options: WebDialerModuleOptions) => {
        return await createClientAsync(options.webDialerWsdlUrl);
      },
      inject: [OPTIONS_TOKEN],
    },
  ],
  exports: [WebDialerClientService],
})
export class WebDialerModule {
  forRoot(webDialerModuleOptions: WebDialerModuleOptions): DynamicModule {
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
