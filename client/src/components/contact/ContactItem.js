import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = (props) => {
  const { id, name, phone, email, type } = props.contact;

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
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
