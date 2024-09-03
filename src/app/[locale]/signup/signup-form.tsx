'use client';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { signUp } from './service/sigup-service';
import {useTranslations} from 'next-intl';


const SignupForm = () => {

  const t = useTranslations('Register');

  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRgx.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (!isValidEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }

    if (!password) {
      setError(t('invalidPassword'));
      return;
    }

    try {
      const res = await signUp(email, password);

      if (res.status === 400) {
        setError(t('emailExists'));
      } else if (res.status === 200) {
        setError('');
      }
    } catch (error) {
      setError(t('errorOccurred')); 
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>{t('signUp')}</h2> 

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
        <label htmlFor="password">{t('password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
        {t('signUp')}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
