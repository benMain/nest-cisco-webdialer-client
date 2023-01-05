import { SoapNumberType } from './soap-number-type.interface';
import { SoapStringType } from './soap-string-type-response.interface';

export interface CallResponse {
  responseCode: SoapNumberType;
  responseDescription: SoapStringType;
}
