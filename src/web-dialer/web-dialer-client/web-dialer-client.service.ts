import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CanonicalPhoneNumber, UserProfile } from '../models';
import { ConfigResponse, WebDialerClient } from '../models';

import { SOAP_TOKEN } from '../symbols';

@Injectable()
export class WebDialerClientService {
  private readonly logger: Logger;
  constructor(
    @Inject(SOAP_TOKEN)
    private readonly soapClient: WebDialerClient,
  ) {
    this.logger = new Logger(WebDialerClientService.name);
  }

  async makeCall(
    userID: string,
    password: string,
    numberToDial: CanonicalPhoneNumber | string,
    userProfile?: UserProfile,
  ) {
    const profile: UserProfile = !!userProfile
      ? userProfile
      : await this.buildUserProfile(userID, password);
    this.logger.log(`Start makeCall():`);
    this.logger.log(profile);
    let dialNumber: string;
    if (this.isCanonicalPhoneNumber(numberToDial)) {
      dialNumber = numberToDial.getCanonicalForm();
    } else {
      dialNumber = numberToDial;
    }

    this.logger.log(`Dialiing Number: ${dialNumber}`);
    const response = await this.soapClient.makeCallSoapAsync({
      in0: {
        userID,
        password,
      },
      in1: dialNumber,
      in2: profile,
    });
    this.logger.log('makeCall() Response:');
    this.logger.log(
      `Response Code: ${response[0].makeCallSoapReturn.responseCode.$value}`,
    );
    this.logger.log(
      `Response Description: ${response[0].makeCallSoapReturn.responseDescription.$value}`,
    );
    return response[0].makeCallSoapReturn;
  }

  async endCall(userID: string, password: string, userProfile?: UserProfile) {
    this.logger.log(`Start endCall():`);
    const profile: UserProfile = !!userProfile
      ? userProfile
      : await this.buildUserProfile(userID, password);
    this.logger.log(profile);
    const response = await this.soapClient.endCallSoapAsync({
      in0: {
        userID,
        password,
      },
      in1: profile,
    });
    this.logger.log('endCall() Response:');
    this.logger.log(
      `Response Code: ${response[0].endCallSoapReturn.responseCode.$value}`,
    );
    this.logger.log(
      `Response Description: ${response[0].endCallSoapReturn.responseDescription.$value}`,
    );
    return response[0].endCallSoapReturn;
  }

  async getProfile(userID: string, password: string): Promise<ConfigResponse> {
    const response = await this.soapClient.getProfileSoapAsync({
      in0: {
        userID,
        password,
      },
      in1: '',
    });
    this.logger.log('getProfile() Response:');
    this.logger.log(response[0].getProfileSoapReturn);
    return response[0].getProfileSoapReturn;
  }

  async getProfileDetails(
    userID: string,
    password: string,
  ): Promise<ConfigResponse> {
    const response = await this.soapClient.getProfileDetailSoapAsync({
      in0: {
        userID,
        password,
      },
    });
    this.logger.log('getProfileDetails() Response:');
    this.logger.log(response[0].getProfileDetailSoapReturn);
    return response[0].getProfileDetailSoapReturn;
  }

  async getPrimaryLine(userID: string, password: string): Promise<string> {
    const response = await this.soapClient.getPrimaryLineAsync({
      in0: {
        userID,
        password,
      },
    });
    this.logger.log('getPrimaryLine() Response:');
    this.logger.log(response[0].getPrimaryLineReturn);
    return response[0].getPrimaryLineReturn.$value;
  }

  async isClusterUser(userId: string): Promise<boolean> {
    const response = await this.soapClient.isClusterUserSoapAsync({
      in0: userId,
    });
    this.logger.log('isClusterUser() Response:');
    this.logger.log(response[0].isClusterUserSoapReturn);
    return response[0].isClusterUserSoapReturn.$value;
  }

  private async buildUserProfile(
    userId: string,
    password: string,
  ): Promise<UserProfile> {
    const profile = await this.getProfileDetails(userId, password);
    if (!profile.deviceInfoListDetail) {
      throw new BadRequestException(
        `Unable to get Cisco user details for ${userId}`,
      );
    }
    return {
      user: userId,
      deviceName: profile.deviceInfoListDetail.item.deviceName.$value,
      lineNumber: profile.deviceInfoListDetail.item.lines.item.$value,
      supportEM: false,
      locale: 'English',
      dontAutoClose: false,
      dontShowCallConf: false,
    };
  }

  isCanonicalPhoneNumber(
    phoneNumber: CanonicalPhoneNumber | string,
  ): phoneNumber is CanonicalPhoneNumber {
    return (phoneNumber as CanonicalPhoneNumber).getCanonicalForm !== undefined;
  }
}
