export class RegisterForm {

    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private email: string;
    private nameLengthErrorMessage = "Your name is too long. Please provide another value";
    private nameEmptyErrorMessage = "Please provide valid name";
    private emailValidationMessage = "Please provide valid email";
    private successMessage = "Than you for providing your data. Please continue";
    private ageErrorMessage = "You have to be 18 years old to register here";
    private maxLength = 40;


    get FirstName() {
        return this.firstName;
    }

    get LastName() {
        return this.lastName;
    }

    get BirthDate() {
        return this.birthDate;
    }

    get Email() {
        return this.email;
    }

    get NameLengthErrorMessage() {
        return this.nameLengthErrorMessage;
    }

    get NameEmptyErrorMessage() {
        return this.nameEmptyErrorMessage;
    }

    get EmailValidationMessage() {
        return this.emailValidationMessage;
    }

    get SuccessMessage() {
        return this.successMessage;
    }

    get AgeErrorMessage() {
        return this.ageErrorMessage;
    }

    public inputFirstName(name: string) {
        if (name == undefined || name == " " || name == "") {
            return this.nameEmptyErrorMessage;
        }
        if (name.length > this.maxLength) {
            return this.nameLengthErrorMessage;
        }
        else {
            this.firstName = name.trim();
            return this.successMessage;
        }
    }

    public inputLastName(name: string) {
        if (name == undefined || name == " " || name == "") {
            return this.nameEmptyErrorMessage;
        }
        if (name.length > this.maxLength) {
            return this.nameLengthErrorMessage;
        }
        else {
            this.lastName = name.trim();
            return this.successMessage;
        }
    }

    public inputEmail(email: string) {
        if (email == undefined || !email.includes(".") || !email.includes("@") || email.includes(" ") || email.includes("@.") || email === ("")) {
            return this.emailValidationMessage;
        }
        else {
            this.email = email;
            return this.successMessage;
        }
    }

    public inputAge(birthDate: Date) {
        let date = new Date();
        if (date.getFullYear() - birthDate.getFullYear() < 18 || birthDate == undefined) {
            return this.ageErrorMessage;
        }
        else {
            this.birthDate = birthDate;
            return this.successMessage;
        }
    }
}