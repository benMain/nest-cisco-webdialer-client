export class CanonicalPhoneNumber {
  constructor(
    private readonly countryCode: number,
    private readonly areaCode: number,
    private readonly phoneNumber: number,
  ) {}

  getCanonicalForm(): string {
    return `7${this.countryCode}${this.areaCode}${this.phoneNumber}`;
  }
}
