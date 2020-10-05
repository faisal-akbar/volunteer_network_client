import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UsersTasks = (props) => {
  // Receive props from UserDashboard Component
  const { _id, task, registrationDate, image } = props.task;

  // Delete task when user click on delete and call handleDeleteUpdate
  const deleteTask = () => {
    fetch(`https://volunteer-network-react.herokuapp.com/deleteTask/${_id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          props.handleDeleteUpdate();
        }
      });
  };

  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body p-2'>
          <div className='row'>
            <div className='col-md-5 col-lg-3 col-xl-3'>
              <div className='mb-3 mb-md-0'>
                {/* Show image */}
                <img className='img-fluid w-100 h-100' src={image} alt={task} />
              </div>
            </div>
            <div className='col-md-7 col-lg-9 col-xl-9'>
              <div className='d-flex justify-content-between mt-2'>
                <div>
                  {/* Show task title */}
                  <h5>{task}</h5>
                  <p className='mb-3'>
                    {/* Show Registration Date */}
                    {new Date(registrationDate).toDateString('dd/MM/yyyy')}
                  </p>
                </div>

                <div>
                  <div className='mb-0'>
                    {/* Call Delete function to cancel task*/}
                    <button
                      onClick={deleteTask}
                      className='btn btn-sm btn-light'
                    >
                      {/* <FontAwesomeIcon icon={faShoppingCart} />  */}
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTasks;
