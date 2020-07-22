import React, { Fragment } from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';

const Home = () => {
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
