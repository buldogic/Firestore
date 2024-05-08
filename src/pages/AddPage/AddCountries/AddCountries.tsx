import React, { useEffect } from 'react';
import InfoTable from '../../../components/Table/InfoTable';
import { countries } from '../../../store/CountriesStore';
import { observer } from 'mobx-react-lite';

const AddCountries = () => {

  useEffect(() => {
    countries.getCountries()
  },[])


console.log(countries.countries)
  return (
    <div>
      <InfoTable  data={countries.countries} />
    </div>
  );
};

export default observer(AddCountries);
