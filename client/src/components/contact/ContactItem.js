import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { id, name, phone, email, type } = contact;

  const contactContext = useContext(ContactContext);

  const { deleteContact, clearCurrent, setCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className='fa fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fa fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => {
            setCurrent(contact);
          }}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
