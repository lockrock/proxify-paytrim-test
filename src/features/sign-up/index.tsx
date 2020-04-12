import React, {useCallback, useMemo, useState} from 'react';
import './index.scss';
import {SideDescription} from "./side-description/side-description";
import logo from '../../logo.png'
import {SignUpData, SignUpForm} from "./sign-up-form/sign-up-form";

function BackToPayTrim() {
    /*TODO*/
    return <a href='/todo' className='back-to-paytrim'>Back to PayTrim website</a>;
}

function SignUpMain() {
    const [formState, setFormState] = useState<SignUpData | null>(null);

    return <div className='sign-up-main'>
        <div className='form-wrapper'>
            <div className='form-wrapper-header'>
                <img alt='PayTrim' src={logo}/>
                <a className='redirect-to-sign-in'>Sign-in instead</a>
            </div>
            <h1>Get started with paytrim</h1>
            <p>To get started with PayTrim we
                will need some information from you.
            </p>
            <SignUpForm onChange={setFormState}/>
        </div>
        <SideDescription onSign={() => {
            if (formState) {
                alert('signed' + JSON.stringify(formState))
            } else {
                alert('please check form again')
            }
        }}/>
    </div>
}

export const SignUpPage = () => {
    const langs = useMemo(() => ['US', 'CH'], []);
    const [lang, setLang] = useState(langs[0]);
    const onLangChange = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => setLang(ev.target.value), [setLang]);

    return <div className='sign-up-root'>
        <BackToPayTrim/>
        <select className='lang-selector' value={lang} onChange={onLangChange}>
            {langs.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button className='messenger'/>
        <SignUpMain />
    </div>
};
