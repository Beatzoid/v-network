import { IUserRegister } from "../redux/types/auth";

export const validateRegister = ({
    fullname,
    username,
    email,
    password,
    confirmpassword
}: IUserRegister) => {
    const errors: Record<string, string> = {};

    if (!fullname) {
        errors.fullname = "This field is required";
    } else if (fullname.length > 25) {
        errors.fullname = "The max length is 25 characters";
    }

    if (!username) {
        errors.username = "This field is required";
    } else if (username.replace(/ /g, "").length > 25) {
        errors.username = "The max length is 25 characters";
    }

    if (!email) {
        errors.email = "This field is required";
    } else if (!validateEmail(email)) {
        errors.email = "Please enter a valid email";
    }

    if (!password) {
        errors.password = "This field is required";
    } else if (password.length < 6) {
        errors.password = "The minimum length is six characters";
    }

    if (password !== confirmpassword) {
        errors.confirmpassword = "Password and confirm password do not match";
    }

    return {
        errors,
        errorLength: Object.keys(errors).length
    };
};

const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
