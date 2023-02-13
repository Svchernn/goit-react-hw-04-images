import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ text, clickHandler }) => {
  return (
    <button className={css.btn} type="button" onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
