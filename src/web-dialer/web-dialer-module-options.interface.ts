import { ClientSSLSecurity } from 'soap';

export interface WebDialerModuleOptions {
  webDialerWsdlUrl: string;
  soapSecurity?: ClientSSLSecurity;
}
