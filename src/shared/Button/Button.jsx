import PropTypes from 'prop-types';
import css from './Button.module.css';

// КОРИСТУЙТЕСЯ КНОПКОЮ КОМПОНЕНТОЮ =)
// Наприклад:

// <Button type="submit" variant="accentBtn" onClick={ваша функція}>текст у кнопці</Button>

// type --> "submit" || "button"(default)
// variant --> "basicBtn"(з сірим бордером - default) || "accentBtn"(помаранчева) || "secondaryBtn"(з білим бордером)

export default function Button({
  type = 'button',
  variant = 'basicBtn',
  children,
  onClick,
}) {
  return (
    <button className={css[variant]} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
