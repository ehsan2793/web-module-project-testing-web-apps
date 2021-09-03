import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const h1 = screen.queryByText(/contact form/i);
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/contact form/i);
    expect(h1).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
render(<ContactForm/>)
const firstname = screen.getByLabelText(/first Name*/i)
userEvent.type(firstName,'name')
const errorMessage = await screen.findAllByTestId('error')
expect(errorMessage).toHaveLength(1);


 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    render(<ContactForm/>)
    const button = screen.getByRole('button')
    userEvent.click(button)
    const errorMessage = await screen.findAllByTestId('error')
    expect(errorMessage).toHaveLength(3);
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstname = screen.getByLabelText(/first Name*/i)
    userEvent.type(firstname,'ehsan')
    const lastName = screen.getByLabelText(/Last Name*/i)
    userEvent.type(lastName,'rahimi')
    
    const button = screen.getByRole('button')
    userEvent.click(button)
    const errorMessage = await screen.getAllByTestId('error')
    expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const email = screen.getByLabelText(/Email*/i)
    userEvent.type(email,'email')
    const feedback = await screen.queryByText(/email must be a valid email address/i)
    expect(feedback).toBeInTheDocument()
    expect(feedback).toHaveTextContent(/email must be a valid email address/i)
    const errorMessage = await screen.getAllByTestId('error')
    expect(errorMessage).toHaveLength(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole('button')
    userEvent.click(button)
    const feedback = await screen.queryByText(/lastName is a required field/i)
    expect(feedback).toBeInTheDocument
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName,'firstName')
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName,'lastName')
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email,'email@email.com')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor (() => {
        const firstNamefeedback = screen.queryByText(/firstName/i)
        const lastNamefeedback = screen.queryByText(/lastName/i)
        const emailfeedback = screen.queryByText(/email@email.com/i)
        const messageDisplay = screen.queryAllByTestId('messageDisplay')

        expect(firstNamefeedback).toBeInTheDocument
        expect(lastNamefeedback).toBeInTheDocument
        expect(emailfeedback).toBeInTheDocument
        expect(messageDisplay).not.toBeInTheDocument
    })

});

test('renders all fields text when all fields are submitted.', async () => {


    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName,'firstName')
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName,'lastName')
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email,'email@email.com')

    const message = screen.getByLabelText(/Message/i)
    userEvent.type(message,'message')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor (() => {
        const firstNamefeedback = screen.queryByText(/firstName/i)
        const lastNamefeedback = screen.queryByText(/lastName/i)
        const emailfeedback = screen.queryByText(/email@email.com/i)
        
        const messageDisplay = screen.queryAllByTestId('messageDisplay')

        expect(firstNamefeedback).toBeInTheDocument
        expect(lastNamefeedback).toBeInTheDocument
        expect(emailfeedback).toBeInTheDocument

        
        expect(messageDisplay).not.toBeInTheDocument
    })
    expect(message).toBeInTheDocument

});



    
