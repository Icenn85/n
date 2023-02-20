import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as GoogleIcon } from '../../images/google.svg';
import { toast } from 'react-toastify';
import { logIn, register } from '../../redux/auth/auth-operations';
import css from './AuthForm.module.css';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emptyInput, setEmptyInput] = useState(false);
    const [emailError, setEmailError] = useState('This field is required');
    const [passwordError, setPasswordError] = useState('This field is required');
    const [errorSymbol, setErrorSymbol] = useState('*');
    const dispatch = useDispatch();

  const handleChange = evt => {
    setEmptyInput(false);

    switch (evt.target.name) {
      case 'email':
        setEmail(evt.target.value);
        break;
      case 'password':
        setPassword(evt.target.value);
        break;
      default:
        return;
    }
  };

  const handleEmail = evt => {
    setEmail(evt.target.value);
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Incorrect email');
      setErrorSymbol('*');
      if (!evt.target.value) {
        setEmailError('This field is required!!');
        setErrorSymbol('*');
      }
    } else {
      setEmailError('');
    }
    };
    
    const handlePassword = evt => {
      setPassword(evt.target.value);
      if (evt.target.value.length < 8) {
        setPasswordError('Password should be at least 6 characters');
        if (!evt.target.value) {
          setPasswordError('This field is required!!');
        }
      } else {
        setPasswordError('');
      }
    };

    const onSubmitLogin = evt => {
      evt.preventDefault();
      const user = { email, password };
        dispatch(logIn(user));
    };


const onSubmitRegistr = evt => {
  evt.preventDefault();
  if (
    emailError === 'Incorrect email' ||
    emailError === ' ' ||
    passwordError === 'Password should be at least 6 characters'
  ) {
    toast.warning('Please enter correct email information');
    return;
  } else {
    const user = { email, password };
    dispatch(register(user));
  }
};

  return (
    <div className={css.container}>
      <div className={css.form}>
        <p className={css.formTextGoogle}>
          You can log in with your Google Account:
        </p>
        <a href="" className={css.googleBtn}>
          <GoogleIcon className={css.googleSvg} />
          Google
        </a>
        <p className={css.formText}>
          Or log in using an email and password, after registering:
        </p>
        <form className={css.formBox} autoComplete="on">
          <label className={css.formLabel}>
            {emptyInput && emailError && (
              <span style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
                {errorSymbol}
              </span>
            )}
            Email:
            <input
              className={css.formInput}
              autoComplete="off"
              type="text"
              placeholder="your@email.com"
              value={email}
              name="email"
              onBlur={handleChange}
              onChange={handleEmail}
            />
          </label>
          <label className={css.formLabel}>
            {emptyInput && passwordError && (
              <span style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
                {errorSymbol}
              </span>
            )}
            Password:
            <input
              className={css.formInput}
              autoComplete="off"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onBlur={handleChange}
              onChange={handlePassword}
            />
          </label>
          <div className={css.authBtn}>
            <button className={css.btn} type="submit" onClick={onSubmitLogin}>
              Log in
            </button>
            <button className={css.btn} type="button" onClick={onSubmitRegistr}>
              Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
