import { useContext } from 'react';
import CommerceContext from './CommerceContext';

const useCommerce = () => useContext(CommerceContext);

export default useCommerce;
