export class CanonicalPhoneNumber {
  constructor(
    private readonly outboundDialingPrefix: string,
    private readonly countryCode: string,
    private readonly areaCode: string,
    private readonly prefix: string,
    private readonly lineNumber: string,
  ) {}

  getCanonicalForm(): string {
    return `${this.outboundDialingPrefix}${this.countryCode}${this.areaCode}${this.prefix}${this.lineNumber}`;
  }
}
