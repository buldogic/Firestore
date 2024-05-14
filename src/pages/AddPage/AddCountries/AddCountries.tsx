import React, { useEffect } from 'react';
import { countries } from '../../../store/CountriesStore';
import { observer } from 'mobx-react-lite';
import TableCountries from './TableCountries';

const AddCountries = () => {

  useEffect(() => {
    countries.getCountries()
  },[])


  return (
    <div>
      <TableCountries  data={[...countries.countries]} />
    </div>
  );
};

export default observer(AddCountries);
