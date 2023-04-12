interface EmailValidationOptions {
    allowedDomains?: string[];
    blockedDomains?: string[];
    requireOrganizationEmail?: boolean;
}

export default class EmailCheck implements EmailValidationOptions {

    allowedDomains: string[]; // List of allowed domains
    blockedDomains: string[]; // List of blocked domains
    requireOrganizationEmail: boolean; // Flag to indicate whether the email domain should be an organization email


    // Constructor to initialize the instance variables
    constructor(allowedDomains: string[], blockedDomains: string[], requireOrganizationEmail: boolean) {

        this.allowedDomains = allowedDomains;
        this.blockedDomains = blockedDomains;
        this.requireOrganizationEmail = requireOrganizationEmail;

    }

    // Function to validate the email using the provided options or default options
    isValidEmail(email: string, options: EmailValidationOptions = {}): { passCases: boolean, errorMessage: string } {
        const { allowedDomains = [], blockedDomains = [], requireOrganizationEmail = false } = options;
        let passCases: boolean = true; // Flag to indicate whether the email validation passes or not
        let errorMessage: string = ''; // Error message to display if validation fails

        // Extract domain from the email
        const emailDomain = this.getEmailDomain(email);

        // Validate the email against the regex for the valid email format
        const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Check for required organization email
        if (requireOrganizationEmail && !this.isOrganizationEmail(email, allowedDomains)) {
            errorMessage = "Incorrect Organization Email. Supported organization is 'mun.ca'";
            passCases = false;
        }

        // Check for blocked domains
        else if (blockedDomains.includes(emailDomain)) {
            errorMessage = "You entered a blocked email domain";
            passCases = false;
        }

        // Check for allowed domains
        else if (allowedDomains.length > 0 && !allowedDomains.includes(emailDomain)) {
            errorMessage = "You entered an invalid email domain";
            passCases = false;
        }

        // Check for valid format
        else if (!validFormat) {
            errorMessage = "Invalid email format"
            passCases = false;
        }

        // Return the flag and error message
        return { passCases, errorMessage };
    }

    // Function to extract domain from the email
    getEmailDomain(email: string): string {
        return email.split("@")[1];
    }

    // Function to check whether the email domain is an organization domain or not
    isOrganizationEmail(email: string, organizationDomains: string[]): boolean {
        const emailDomain = this.getEmailDomain(email);
        return organizationDomains.includes(emailDomain);
    }

}
