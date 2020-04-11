import React, {CSSProperties, useCallback, useEffect, useMemo, useState} from 'react';
import './index.scss';
import {SideDescription} from "./side-description";
import logo from '../../logo.png'

function BackToPayTrim() {
    /*TODO*/
    return <a href='/todo' className='back-to-paytrim'>Back to PayTrim website</a>;
}

function useStateWithValidation<T>(initialState: T, validate: (v: T) => boolean): { val: T, isTouched: boolean, isValid: boolean, update: (v: T) => void } {
    let [state, setState] = useState({val: initialState, isTouched: false, isValid: validate(initialState)});
    const update = useCallback((val: T) => setState({val, isValid: validate(val), isTouched: true}), [setState, validate]);
    return {
        ...state,
        update,
    }
}

function mapToInputStatus(inp: { isTouched: boolean, isValid: boolean }): 'correct' | 'error' | undefined {
    if (inp.isValid && inp.isTouched) return 'correct';
    if (!inp.isValid && !inp.isTouched) return undefined;
    return 'error';
}

function isNonEmpty(val: string) {
    return val.length > 0
}

type SignUpData = {
    organisationalNumber: string,
    personalIdentityNumber: string,
    email: string,
    phoneNumber: string,
}
type SignUpFormProps = {
    onChange(data: SignUpData | null): void,
}

type SignUpInputProps = {
    onChange(val: string): void,
    value: string,
    label?: string,
    placeholder?: string,
    status?: 'correct' | 'error',
    type?: string,
    outerClassName?: string,
    outerStyle?: CSSProperties,
};

function SignUpInput(props: SignUpInputProps): JSX.Element {
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value), [props]);
    const origClassName = 'signup-input';
    const className = typeof props.outerClassName === 'string' ? origClassName + ' ' + props.outerClassName : origClassName;
    return <label className={className} style={props.outerStyle}>
        <div className='label'>{props.label}</div>
        <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={onChange}/>
        <div className={props.status === 'correct' ? 'underscore underscore-success' : 'underscore'}/>
    </label>
}

function SignUpForm(props: SignUpFormProps) {
    const orgNum = useStateWithValidation('', isNonEmpty);
    const pin = useStateWithValidation('', isNonEmpty);
    const email = useStateWithValidation('', isNonEmpty);
    const phone = useStateWithValidation('', isNonEmpty);

    useEffect(() => {
            if (orgNum.isValid && pin.isValid && email.isValid && phone.isValid) {
                props.onChange({
                    email: email.val,
                    phoneNumber: phone.val,
                    organisationalNumber: orgNum.val,
                    personalIdentityNumber: pin.val
                });
            }

        },
        // yes, i know that this is horrible, but linter was complaining; maybe will fix it someday
        [props, orgNum.isValid, orgNum.val, pin.isValid, pin.val, email.isValid, email.val, phone.isValid, phone.val]);

    return <form className='sign-up-form'>
        <SignUpInput
            outerStyle={{marginTop: 16}}
            type='text'
            value={orgNum.val}
            onChange={orgNum.update}
            status={mapToInputStatus(orgNum)}
            label='ORGANISATIONAL NUMBER'
        />
        <SignUpInput
            outerStyle={{marginTop: 16}}
            type='text'
            value={pin.val}
            onChange={pin.update}
            status={mapToInputStatus(pin)}
            label='PERSONAL IDENTITY NUMBER - AUTHORISED TO SIGN:'
        />
        <SignUpInput
            outerStyle={{marginTop: 16}}
            type='email'
            value={email.val}
            onChange={email.update}
            status={mapToInputStatus(email)}
            label='EMAIL ADDRESS'
        />
        <SignUpInput
            outerStyle={{marginTop: 16}}
            type='tel'
            value={phone.val}
            onChange={phone.update}
            status={mapToInputStatus(phone)}
            label='PHONE NUMBER'
        />
    </form>
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
