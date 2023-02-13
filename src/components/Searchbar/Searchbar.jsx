import { memo } from 'react';
import PropTypes from 'prop-types';
import initialState from './initialState';
import useForm from 'shared/hooks/useForm';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm(initialState, onSubmit);
  //   const [state, setState] = useState({ ...initialState });

  //  const handleChange = ({ target }) => {
  //     const { name, value } = target;
  //     setState(prevState => {
  //       return { ...prevState, [name]: value };
  //     });
  //   };

  //   const handleSubmit = event => {
  //     event.preventDefault();
  //     onSubmit({ ...state });
  //     setState({ ...initialState });
  //   };

  const { search } = state;

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={search}
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
