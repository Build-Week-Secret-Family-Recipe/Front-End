import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import PasswordMask from 'react-password-mask';

export default function Form() {
    const [formState, setFormState] = useState({
        email: "",
        password: "", 
    });


const [serverError, setServerError] = useState("");

const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

const [errors, setErrors] = useState({
    email: "",
    password: ""
});

const [post, setPost] = useState([]);

const validateChange = (e) => {
    yup
        .reach(formSchema, e.target.name)
        .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch((err) => {
        console.log("err", err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
};

const formSubmit = (e) => {
    e.preventDefault();

    axios
        .post("https://reqres.in/api/users", formState)
        .then ((resp) => {
            setPost(resp.data);
            setServerError(null);
            setFormState({
                email: "",
                password: "",
            });
        })
        .catch((err) => {
            setServerError("Uh oh! Something broke... don't worry, I'll fix it.");
        });
};

const inputChange =(e) => {
    e.persist();
    const newFormState = {
        ...formState,
    }
    validateChange(e);
    setFormState(newFormState);
};

const formSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required("Please enter a valid secret code."),
});

useEffect(() => {
formSchema.isValid(formState).then((valid) => {
    console.log ("Is it Valid?", valid);
    setButtonIsDisabled(!valid);
});
}, [formState]);

console.log("formState", formState);
    return (
        <form onSubmit={formSubmit}>
            {serverError && <p className="error">{serverError}</p>}

    <label htmlFor="email">
        Email
        <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
        />
        {errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
        ) : null}
    </label>
    <label htmlFor="password">
        Password
        <PasswordMask
        id="password"
        name="password"
        value={formState.password}
        onChange={inputChange}
        // useVendorStyles={false}
/>
        <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={inputChange}
        />
        {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
        ) : null}
    </label>
        <button type="submit" disabled={buttonIsDisabled}>
        Submit
        </button>
        <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
        );
    }