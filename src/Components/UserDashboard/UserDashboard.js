import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import UsersTasks from './UsersTasks';
import './UserDashboard.css';
import PreLoader from '../PreLoader/PreLoader';

const UserDashboard = () => {
  // Set state for loggedInUser:
  const [userTasks, setUserTasks] = useState([]);
  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //PreLoader visibility
  const [preLoaderVisibility, setPreLoaderVisibility] = useState('block');

  // Dynamically filter loggedInUser data from API:
  useEffect(() => {
    fetch(
      'https://volunteer-network-react.herokuapp.com/userTasks?email=' +
        loggedInUser.email,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserTasks(data);
        setPreLoaderVisibility('none');
      });
  }, [loggedInUser.email]);

  // When user Click on Cancel update the userDashboard view:
  const handleDeleteUpdate = () => {
    fetch(
      'https://volunteer-network-react.herokuapp.com/userTasks?email=' +
        loggedInUser.email,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setUserTasks(data));
  };

  return (
    <div className='container mt-5'>
      <h4 className='text-center mb-4'>
        You've registered in {userTasks.length} tasks
      </h4>
      <div className='row'>
        <PreLoader visibility={preLoaderVisibility} />
        {/* Send loggedInUser data to UsersTasks Component with handleDeleteUpdate as props  */}
        {userTasks.map((task) => (
          <UsersTasks
            key={task._id}
            task={task}
            handleDeleteUpdate={handleDeleteUpdate}
            // deleteFromCart={deleteFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
