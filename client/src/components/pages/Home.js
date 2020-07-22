import React, { Fragment } from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';

const Home = () => {
  return (
    <Fragment>
      <div className='grid-2'>
        <div>
          <ContactForm />
        </div>
        <div>
          <Contacts />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
