import { SoapStringType } from './soap-string-type-response.interface';
import { SoapNumberType } from './soap-number-type.interface';
import { DeviceInfoListDetail } from './device-info-list-detail.interface';

export interface ConfigResponse {
  description: SoapStringType;
  deviceInfoListDetail?: DeviceInfoListDetail;
  deviceInfoList?: DeviceInfoListDetail;
  responseCode: SoapNumberType;
}
