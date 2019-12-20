import { Client } from 'soap';
import { MakeCallSoapRequest } from './make-call-soap-request.interface';
import { MakeCallSoapResponse } from './make-call-soap-response.interface';
import { EndCallSoapRequest } from './end-call-soap-request.interface';
import { EndCallSoapResponse } from './end-call-soap-response.interface';
import { GetProfileSoapRequest } from './get-profile-soap-request.interface';
import { GetProfileSoapResponse } from './get-profile-soap-response.interface';
import { IsClusterUserRequest } from './is-cluster-user-request.interface';
import { IsClusterUserResponse } from './is-cluster-user-response.interface';
import { GetProfileDetailResponse } from './get-profile-detail-response.interface';
import { GetProfileDetailRequest } from './get-profile-detail-request.interface';
import { GetPrimaryLineRequest } from './get-primary-line-request.interface';
import { GetPrimaryLineResponse } from './get-primary-line-response.interface';

export interface WebDialerClient extends Client {
  makeCallSoapAsync: (
    input: MakeCallSoapRequest,
  ) => Promise<MakeCallSoapResponse[]>;
  endCallSoapAsync: (
    input: EndCallSoapRequest,
  ) => Promise<EndCallSoapResponse[]>;
  getProfileSoapAsync: (
    input: GetProfileSoapRequest,
  ) => Promise<GetProfileSoapResponse[]>;
  isClusterUserSoapAsync: (
    input: IsClusterUserRequest,
  ) => Promise<IsClusterUserResponse[]>;
  getProfileDetailSoapAsync: (
    input: GetProfileDetailRequest,
  ) => Promise<GetProfileDetailResponse[]>;
  getPrimaryLineAsync: (
    input: GetPrimaryLineRequest,
  ) => Promise<GetPrimaryLineResponse[]>;
}
