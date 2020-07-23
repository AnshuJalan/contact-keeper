import React, { Fragment, useContext, useEffect } from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log('here!');
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='grid-2'>
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
