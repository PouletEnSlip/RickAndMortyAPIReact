import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';
import Inscription from '../Pages/Inscription';

describe('Test Inscription form', () => {
  it('Email vide', () => {
    const { getByText, getByLabelText } = render(<Inscription />);
    const submitButton = getByText(/S'inscrire/i);

    act(() => {
      fireEvent.click(submitButton);
    });

    const errorMessage = getByText(/L'email est obligatoire/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Email non valide', () => {
    const { getByText, getByLabelText } = render(<Inscription />);
    const emailInput = getByLabelText(/email/i);
    const submitButton = getByText(/S'inscrire/i);

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
      fireEvent.click(submitButton);
    });

    const errorMessage = getByText(/L'email n'est pas valide/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Mot de passe vide', () => {
    const { getByText, getByLabelText } = render(<Inscription />);
    const emailInput = getByLabelText(/email/i);
    const submitButton = getByText(/S'inscrire/i);

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.click(submitButton);
    });

    const errorMessage = getByText(/Le mot de passe est obligatoire/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Mot de passe inférieur à 8 caractères', () => {
    const { getByText, getByLabelText } = render(<Inscription />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/mot de passe/i);
    const submitButton = getByText(/S'inscrire/i);

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submitButton);
    });

    const errorMessage = getByText(/Le mot de passe doit faire au moins 8 caractères/i);
    expect(errorMessage).toBeInTheDocument();
  });
});