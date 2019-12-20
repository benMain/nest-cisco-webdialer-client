import { Test, TestingModule } from '@nestjs/testing';
import { WebDialerClientService } from './web-dialer-client.service';
import { SOAP_TOKEN } from '../symbols';
import {
  CanonicalPhoneNumber,
  WebDialerClient,
  GetProfileDetailResponse,
  GetProfileDetailRequest,
  MakeCallSoapResponse,
  MakeCallSoapRequest,
  EndCallSoapResponse,
  EndCallSoapRequest,
  GetProfileSoapRequest,
  GetProfileSoapResponse,
  IsClusterUserRequest,
  IsClusterUserResponse,
  GetPrimaryLineRequest,
  GetPrimaryLineResponse,
  CallResponse,
} from '../models';
import { v4 } from 'uuid';

describe('WebDialerClientService', () => {
  let service: WebDialerClientService;
  let webDialerClient: WebDialerClient;
  let getProfileDetailsSpy: jest.SpyInstance<
    Promise<GetProfileDetailResponse[]>,
    [GetProfileDetailRequest]
  >;
  let makeCallSpy: jest.SpyInstance<
    Promise<MakeCallSoapResponse[]>,
    [MakeCallSoapRequest]
  >;
  let endCallSpy: jest.SpyInstance<
    Promise<EndCallSoapResponse[]>,
    [EndCallSoapRequest]
  >;
  let getProfileSpy: jest.SpyInstance<
    Promise<GetProfileSoapResponse[]>,
    [GetProfileSoapRequest]
  >;
  let isClusterUserSpy: jest.SpyInstance<
    Promise<IsClusterUserResponse[]>,
    [IsClusterUserRequest]
  >;
  let getPrimaryLineSpy: jest.SpyInstance<
    Promise<GetPrimaryLineResponse[]>,
    [GetPrimaryLineRequest]
  >;
  const phoneExtension = '5814';
  const deviceInfoList = {
    item: {
      deviceName: {
        $value: v4(),
      },
      lines: {
        item: {
          $value: `${phoneExtension}; null`,
        },
      },
      phoneDesc: {
        $value: 'Fake Corporate Phone',
      },
      phoneType: {
        $value: 'CiscoPhone',
      },
    },
  };
  const profileDetailResponse: GetProfileDetailResponse[] = [
    {
      getProfileDetailSoapReturn: {
        description: {
          $value: 'Success',
        },
        responseCode: {
          $value: 0,
        },
        deviceInfoListDetail: deviceInfoList,
      },
    },
  ];
  const profileResponse: GetProfileSoapResponse[] = [
    {
      getProfileSoapReturn: {
        description: {
          $value: 'Success',
        },
        responseCode: {
          $value: 0,
        },
        deviceInfoList,
      },
    },
  ];

  const callResponse: CallResponse = {
    responseCode: {
      $value: 0,
    },
    responseDescription: {
      $value: 'Success',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebDialerClientService,
        {
          provide: SOAP_TOKEN,
          useFactory: () => {
            const client = {
              makeCallSoapAsync: () => null,
              endCallSoapAsync: () => null,
              getProfileSoapAsync: () => null,
              isClusterUserSoapAsync: () => null,
              getProfileDetailSoapAsync: () => null,
              getPrimaryLineAsync: () => null,
            };
            return client;
          },
        },
      ],
    }).compile();

    service = module.get<WebDialerClientService>(WebDialerClientService);
    webDialerClient = module.get<WebDialerClient>(SOAP_TOKEN);
    makeCallSpy = jest.spyOn(webDialerClient, 'makeCallSoapAsync');
    endCallSpy = jest.spyOn(webDialerClient, 'endCallSoapAsync');
    getProfileSpy = jest.spyOn(webDialerClient, 'getProfileSoapAsync');
    getProfileDetailsSpy = jest.spyOn(
      webDialerClient,
      'getProfileDetailSoapAsync',
    );
    isClusterUserSpy = jest.spyOn(webDialerClient, 'isClusterUserSoapAsync');
    getPrimaryLineSpy = jest.spyOn(webDialerClient, 'getPrimaryLineAsync');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getProfileDetails(): should get profile details', async () => {
    getProfileDetailsSpy.mockReturnValue(Promise.resolve(profileDetailResponse));
    const response = await service.getProfileDetails('jdoe', 'superSecret');
    expect(response).toBeTruthy();
    expect(response.deviceInfoListDetail.item.lines.item.$value).toContain(
      phoneExtension,
    );
    expect(getProfileDetailsSpy).toHaveBeenCalledTimes(1);
  });
  it('getProfile(): should get profile', async () => {
    getProfileSpy.mockReturnValue(Promise.resolve(profileResponse));
    const response = await service.getProfile('jdoe', 'superSecret');
    expect(response).toBeTruthy();
    expect(response.deviceInfoList.item.lines.item.$value).toContain(phoneExtension);
    expect(getProfileSpy).toHaveBeenCalledTimes(1);
  });
  it('getPrimaryLine(): should get getPrimaryLine', async () => {
    const primaryLine = v4();
    getPrimaryLineSpy.mockReturnValue(Promise.resolve([{ getPrimaryLineReturn: { $value: primaryLine}}]));
    const response = await service.getPrimaryLine('jdoe', 'superSecret');
    expect(response).toBeTruthy();
    expect(response).toEqual(primaryLine);
    expect(getPrimaryLineSpy).toHaveBeenCalledTimes(1);
  });
  it('isClusterUser(): should say isClusterUser', async () => {
    isClusterUserSpy.mockReturnValue(Promise.resolve([{ isClusterUserSoapReturn: {$value : true}}]));
    const response = await service.isClusterUser('jdoe');
    expect(response).toBeTruthy();
    expect(response).toEqual(true);
    expect(isClusterUserSpy).toHaveBeenCalledTimes(1);
  });
  it('makeCall(): should make call', async () => {
    getProfileDetailsSpy.mockReturnValue(Promise.resolve(profileDetailResponse));
    makeCallSpy.mockReturnValue(Promise.resolve([{makeCallSoapReturn: callResponse }]));
    const makeCallResponse = await service.makeCall('jdoe', 'superSecret',
      new CanonicalPhoneNumber(1, 314, 8675309),
    );
    expect(makeCallResponse.responseCode.$value).toEqual(0);
    expect(makeCallSpy).toHaveBeenCalledTimes(1);
    expect(getProfileDetailsSpy).toHaveBeenCalledTimes(1);
  });
  it('endCall(): should end call', async () => {
    getProfileDetailsSpy.mockReturnValue(Promise.resolve(profileDetailResponse));
    endCallSpy.mockReturnValue(Promise.resolve([{endCallSoapReturn: callResponse }]));
    const endCallResponse = await service.endCall('jdoe', 'superSecret');
    expect(endCallResponse.responseCode.$value).toEqual(0);
    expect(endCallSpy).toHaveBeenCalledTimes(1);
    expect(getProfileDetailsSpy).toHaveBeenCalledTimes(1);
  });
});
