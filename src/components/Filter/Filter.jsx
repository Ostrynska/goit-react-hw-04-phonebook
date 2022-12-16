import PropTypes from 'prop-types';
import { FilterWrap, FilterLabel, FilterInput } from './Filter.styled';

const Filter = ({ filter, handleFilter }) => {
  return (
    <FilterWrap>
      <FilterLabel>
        Find contacts by name
        <FilterInput
          value={filter}
          type="text"
          name="filter"
          onChange={handleFilter}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FilterLabel>
    </FilterWrap>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default Filter;
