import { SoapStringType } from './soap-string-type-response.interface';
import { SoapNumberType } from './soap-number-type.interface';

export interface CallResponse {
  responseCode: SoapNumberType;
  responseDescription: SoapStringType;
}
