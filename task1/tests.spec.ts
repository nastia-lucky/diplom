import exp from "constants";
import { RegisterForm } from "./register";


describe("Check register form tests", () => {
    let myForm: RegisterForm;

    beforeEach(async () => {
        myForm = new RegisterForm();
    });

    afterEach(async () => {
        myForm = undefined;
    });

    it.each([
        ["Vasya"],
        ["VasyaLooongLOnnnnnnnnnnamelooooooooong"],
        ["Cu"],
        [" Cu "]])
        ("Check valid name", (name: string) => {
            myForm.inputFirstName(name);
            expect(myForm.FirstName).toEqual(name.trim());
        })

    it("Check invalid long name ", () => {
        let name = "VasyaLooongLOnnnnnnnnnnamelooooiiiiiiiiiiihhhnjhfnjhbrjbgjrbhjvbrhjvhjtrbvjhtbhrvooooong";
        let message = myForm.inputFirstName(name);
        expect(message).toEqual(myForm.NameLengthErrorMessage);
        expect(myForm.FirstName).toBeUndefined();
    })


    it.each([
        [""],
        [undefined],
        [" "],
        [null]])
        ("Check invalid empty name", (name: string) => {
            let message: string = myForm.inputFirstName(name);
            expect(message).toEqual(myForm.NameEmptyErrorMessage);
            expect(myForm.FirstName).toBeUndefined();
        })


    it.each([
        ["Ivanov"],
        ["Ivanovhhhhhhhhhhhhhhhhhhhhh"],
        ["I"],
        ["Ivanovh"]])
        ("Check valid last name ", (lastName: string) => {
            myForm.inputLastName(lastName);
            expect(myForm.LastName).toEqual(lastName.trim());
        })


    it("Check invalid long last  name ", () => {
        let lastName = "Ivanovhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhpppppppphhhhhhhhhhhhhhhhhhhhh";
        let message = myForm.inputLastName(lastName);
        expect(message).toEqual(myForm.NameLengthErrorMessage);
        expect(myForm.LastName).toBeUndefined();
    })

    it.each([
        [""],
        [" "],
        [undefined],
        [null]])
        ("Check invalid empty last name", (lastName: string) => {
            let message = myForm.inputLastName(lastName);
            expect(message).toEqual(myForm.NameEmptyErrorMessage);
            expect(myForm.LastName).toBeUndefined();
        })



    it.each([
        ["nastia@mail.ru"],
        ["nastia@yandex.ru"],
        ["nastia@gmail.com"]])
        ("Check valid email", (email: string) => {
            myForm.inputEmail(email);
            expect(myForm.Email).toEqual(email);
        })


    it.each([
        ["nastiagmail.com"],
        ["nastia@gmailcom"],
        ["nastia@gmail.c om"],
        [""],
        [" "],
        [undefined]])
        ("Check invalid email ", (email: string) => {
            let message = myForm.inputEmail(email);
            expect(message).toEqual(myForm.EmailValidationMessage)
            expect(myForm.Email).toBeUndefined();
        })


    it.each
        ([[new Date("2004-01-01")],
        [new Date("2005-01-01")]])
        ("Check valid birthDate", (date: Date) => {
            myForm.inputAge(date);
            expect(myForm.BirthDate.getFullYear()).toEqual(date.getFullYear());
        })


    test("Check invalid birthDate", () => {
        let date = new Date("2006-01-01");
        myForm.inputAge(date);
        expect(myForm.BirthDate).toBeUndefined();
    })


})

