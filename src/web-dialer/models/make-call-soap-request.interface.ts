import { Credential } from './credential.interface';
import { UserProfile } from './user-profile.interface';

export interface MakeCallSoapRequest {
  in0: Credential;
  in1: string;
  in2: UserProfile;
}
