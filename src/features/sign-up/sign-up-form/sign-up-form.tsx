import './sign-up-form.scss';
import React, {CSSProperties, useCallback, useEffect, useState} from 'react';

type StateWithValidation<T> = { val: T; isTouched: boolean; isValid: boolean; update: (v: T) => void }

function useStateWithValidation<T>(
    initialState: T,
    validate: (v: T) => boolean
): StateWithValidation<T> {
    const [state, setState] = useState({
        val: initialState,
        isTouched: false,
        isValid: validate(initialState),
    });
    const update = useCallback(
        (val: T) =>
            setState({
                val,
                isValid: validate(val),
                isTouched: true,
            }),
        [setState, validate]
    );
    return {
        ...state,
        update,
    };
}

function mapToInputStatus(inp: {
    isTouched: boolean;
    isValid: boolean;
}): 'correct' | 'error' | undefined {
    if (inp.isValid && inp.isTouched) return 'correct';
    if (!inp.isValid && !inp.isTouched) return undefined;
    return 'error';
}

function isNonEmpty(val: string): boolean {
    return val.length > 0;
}

export type SignUpData = {
    organisationalNumber: string;
    personalIdentityNumber: string;
    email: string;
    phoneNumber: string;
};
type SignUpFormProps = {
    onChange(data: SignUpData | null): void;
};
type SignUpInputProps = {
    onChange(val: string): void;
    value: string;
    label?: string;
    placeholder?: string;
    status?: 'correct' | 'error';
    type?: string;
    outerClassName?: string;
    outerStyle?: CSSProperties;
};

function SignUpInput(props: SignUpInputProps): JSX.Element {
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value),
        [props]
    );
    const origClassName = 'signup-input';
    const className =
        typeof props.outerClassName === 'string'
            ? `${origClassName} ${props.outerClassName}`
            : origClassName;
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={className} style={props.outerStyle}>
            <div className="label">{props.label}</div>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
            />
            <div
                className={
                    props.status === 'correct'
                        ? 'underscore underscore-success'
                        : 'underscore'
                }
            />
        </label>
    );
}

export function SignUpForm(props: SignUpFormProps): JSX.Element {
    const orgNum = useStateWithValidation('', isNonEmpty);
    const pin = useStateWithValidation('', isNonEmpty);
    const email = useStateWithValidation('', isNonEmpty);
    const phone = useStateWithValidation('', isNonEmpty);

    useEffect(
        () => {
            if (orgNum.isValid && pin.isValid && email.isValid && phone.isValid) {
                props.onChange({
                    email: email.val,
                    phoneNumber: phone.val,
                    organisationalNumber: orgNum.val,
                    personalIdentityNumber: pin.val,
                });
            }
        },
        // yes, i know this is horrible, but linter was complaining; maybe will fix it someday; TODO
        [
            props,
            orgNum.isValid,
            orgNum.val,
            pin.isValid,
            pin.val,
            email.isValid,
            email.val,
            phone.isValid,
            phone.val,
        ]
    );

    return (
        <form className="sign-up-form">
            <SignUpInput
                outerStyle={{marginTop: 16}}
                type="text"
                value={orgNum.val}
                onChange={orgNum.update}
                status={mapToInputStatus(orgNum)}
                label="ORGANISATIONAL NUMBER"
            />
            <SignUpInput
                outerStyle={{marginTop: 16}}
                type="text"
                value={pin.val}
                onChange={pin.update}
                status={mapToInputStatus(pin)}
                label="PERSONAL IDENTITY NUMBER - AUTHORISED TO SIGN:"
            />
            <SignUpInput
                outerStyle={{marginTop: 16}}
                type="email"
                value={email.val}
                onChange={email.update}
                status={mapToInputStatus(email)}
                label="EMAIL ADDRESS"
            />
            <SignUpInput
                outerStyle={{marginTop: 16}}
                type="tel"
                value={phone.val}
                onChange={phone.update}
                status={mapToInputStatus(phone)}
                label="PHONE NUMBER"
            />
        </form>
    );
}
