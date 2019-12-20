import { SoapStringType } from './soap-string-type-response.interface';
import { DeviceInfoLines } from './device-info-lines.interface';

export interface DeviceInfo {
  deviceName: SoapStringType;
  lines: DeviceInfoLines;
  phoneDesc: SoapStringType;
  phoneType: SoapStringType;
}
