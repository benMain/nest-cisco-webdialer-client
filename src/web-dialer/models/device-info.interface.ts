import { DeviceInfoLines } from './device-info-lines.interface';
import { SoapStringType } from './soap-string-type-response.interface';

export interface DeviceInfo {
  deviceName: SoapStringType;
  lines: DeviceInfoLines;
  phoneDesc: SoapStringType;
  phoneType: SoapStringType;
}
