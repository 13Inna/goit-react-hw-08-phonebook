import css from './Filter.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { setFilterContacts } from '../../redux/filterSlice';
import { getFilter } from '../../redux/selector';

export function Filter(){
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilter);
  
  const handleChange = evt  => {
   dispatch(setFilterContacts(evt.target.value));
  };

  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        onChange={handleChange}
        name="name"
        value={filterValue}
      />
    </label>
  );
}


export default Filter;