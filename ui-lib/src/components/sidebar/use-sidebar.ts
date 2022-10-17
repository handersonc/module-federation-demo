import { useState } from 'react';
import { MenuItem } from './prop-types';

const useSidebar = (initialState: Array<MenuItem>) =>  {
  const [state, setState] = useState<Array<MenuItem>>(initialState);

  const setSelectedItem = (selectedItem: MenuItem) => {
    const newState = state?.map((item) => {
      if (item.key === selectedItem.key) {
        item.selected = true;
      }
      return item;
    });
    setState(newState);
  };

  return {
    state,
    setSelectedItem
  }
}

export default useSidebar;