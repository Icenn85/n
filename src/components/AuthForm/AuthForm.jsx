import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as GoogleIcon } from '../../images/google.svg';
import { logIn, register } from '../../redux/auth/auth-operations';
import css from './AuthForm.module.css';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emptyInput, setEmptyInput] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [shortLengthPassword, setShortLengthPassword] = useState(false);
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

  const checkValidData = () => {

    if (email === '') {
      setEmptyInput(true);
    }

    if (!email.includes('@')) {
      setInvalidEmail(true);
    }
    if (password.length < 8) {
      setShortLengthPassword(true);
    }

    return;
  };
  
  const handleLogin = evt => {
    evt.preventDefault();
    const credentials = { email, password };

    if (checkValidData()) {
      return;
    }
    dispatch(logIn(credentials));

    resetForm();
  };

  const handleRegister = () => {
    const credentials = { email, password };
    if (checkValidData()) {
      return;
    }
    dispatch(register(credentials))
      .unwrap()
      .then(() => dispatch(logIn(credentials)));
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
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
        <form className={css.formBox} autoComplete="on" onSubmit={handleLogin}>
          <label className={css.formLabel}>
            {emptyInput ? (
              <>
                <span>
                  <span className={css.spanLabel}>*</span>
                  Email:
                </span>
              </>
            ) : (
              'Email:'
            )}
            <input
              className={css.formInput}
              autoComplete="off"
              type="text"
              placeholder="your@email.com"
              value={email}
              name="email"
              onChange={handleChange}
            />
            <p className={css.errorMsg}>
              {emptyInput
                ? 'This is a required field'
                : invalidEmail && 'Email must contain the symbol "@"'}
            </p>
          </label>
          <label className={css.formLabel}>
            {emptyInput ? (
              <>
                <span>
                  <span className={css.spanLabel}>*</span>
                  Password:
                </span>
              </>
            ) : (
              'Password:'
            )}
            <input
              className={css.formInput}
              autoComplete="off"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <p className={css.errorMsg}>
              {emptyInput
                ? 'This is a required field'
                : shortLengthPassword &&
                  'Password length must be at least 8 characters'}
            </p>
          </label>
          <div className={css.authBtn}>
            <button className={css.btn} type="submit">
              Log in
            </button>
            <button className={css.btn} type="button" onClick={handleRegister}>
              Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
