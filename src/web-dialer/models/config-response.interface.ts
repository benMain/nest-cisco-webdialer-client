import { DeviceInfoListDetail } from './device-info-list-detail.interface';
import { SoapNumberType } from './soap-number-type.interface';
import { SoapStringType } from './soap-string-type-response.interface';

export interface ConfigResponse {
  description: SoapStringType;
  deviceInfoListDetail?: DeviceInfoListDetail;
  deviceInfoList?: DeviceInfoListDetail;
  responseCode: SoapNumberType;
}
