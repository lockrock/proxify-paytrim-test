import './index.scss';
import React, { useCallback, useMemo, useState } from 'react';
import { SignUpData, SignUpForm } from './sign-up-form/sign-up-form';
import { SideDescription } from './side-description/side-description';

function BackToPayTrim(): JSX.Element {
  return (
    <a href="/todo" className="back-to-paytrim">
      Back to PayTrim website
    </a>
  );
}

function SignUpMain(): JSX.Element {
  const [formState, setFormState] = useState<SignUpData | null>(null);

  return (
    <div className="sign-up-main">
      <div className="form-wrapper">
        <div className="form-wrapper-header">
          <img alt="PayTrim" src={`${process.env.PUBLIC_URL}/logo.png`} />
          <a href="/" className="redirect-to-sign-in">
            Sign-in instead
          </a>
        </div>
        <h1>Get started with paytrim</h1>
        <p>
          To get started with PayTrim we will need some information from you.
        </p>
        <SignUpForm onChange={setFormState} />
      </div>
      <SideDescription
        onSign={(): void => {
          if (formState) {
            alert(`signed${JSON.stringify(formState)}`);
          } else {
            alert('please check form again; maybe some of fields is invalid or clear');
          }
        }}
      />
    </div>
  );
}

export const SignUpPage = (): JSX.Element => {
  const langs = useMemo(() => ['US', 'CH'], []);
  const [selectedLang, setSelectedLang] = useState(langs[0]);

  const onLangChange = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedLang(ev.target.value),
    [setSelectedLang]
  );

  return (
    <div className="sign-up-root">
      <BackToPayTrim />

      <select
        className="lang-selector"
        value={selectedLang}
        onChange={onLangChange}
      >
        {langs.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        title="Contact via Facebook Messenger"
        type="button"
        className="messenger"
      />

      <SignUpMain />
    </div>
  );
};
