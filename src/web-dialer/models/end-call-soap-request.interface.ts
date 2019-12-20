import { Credential } from './credential.interface';
import { UserProfile } from './user-profile.interface';

export interface EndCallSoapRequest {
  in0: Credential;
  in1: UserProfile;
}
