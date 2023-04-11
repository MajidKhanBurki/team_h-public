import { expect } from 'chai';
import EmailCheck from '../src/business/validation/emailCheck';

describe('EmailCheck', () => {
  let emailCheck;

  beforeEach(() => {
    const allowedDomains = ['example.com'];
    const blockedDomains = ['spam.com'];
    const requireOrganizationEmail = true;

    emailCheck = new EmailCheck(allowedDomains, blockedDomains, requireOrganizationEmail);
  });

  describe('isValidEmail', () => {
    it('should return true for a valid email with allowed domain', () => {
      const result = emailCheck.isValidEmail('user@example.com');

      expect(result.passCases).to.be.true;
      expect(result.errorMessage).to.equal('');
    });

    it('should return false for an invalid email format', () => {
      const result = emailCheck.isValidEmail('invalid_email');

      expect(result.passCases).to.be.false;
      expect(result.errorMessage).to.equal('Invalid email format');
    });

    it('should return true for an organization email when requireOrganizationEmail is true', () => {
      const result = emailCheck.isValidEmail('user@example.com');

      expect(result.passCases).to.be.true;
      expect(result.errorMessage).to.equal('');
    });

    it('should return true when no options are provided', () => {
      const result = emailCheck.isValidEmail('user@example.com');

      expect(result.passCases).to.be.true;
      expect(result.errorMessage).to.equal('');
    });

    it('should override options when provided', () => {
      const options = {
        allowedDomains: ['example.net'],
        blockedDomains: ['spam.net'],
        requireOrganizationEmail: false,
      };
      const result = emailCheck.isValidEmail('user@example.com', options);

      expect(result.passCases).to.be.false;
      expect(result.errorMessage).to.equal('You entered an invalid email domain');
    });
  });

  describe('getEmailDomain', () => {
    it('should return domain from email', () => {
      const result = emailCheck.getEmailDomain('user@example.com');

      expect(result).to.equal('example.com');
    });
  });

  describe('isOrganizationEmail', () => {
    it('should return true for an organization email', () => {
      const organizationDomains = ['example.com'];
      const result = emailCheck.isOrganizationEmail('user@example.com', organizationDomains);

      expect(result).to.be.true;
    });

    it('should return false for a non-organization email', () => {
      const organizationDomains = ['example.com'];
      const result = emailCheck.isOrganizationEmail('user@gmail.com', organizationDomains);

      expect(result).to.be.false;
    });
  });
});