import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './Tasks.css';

const Tasks = () => {
  // Set data using hook:
  const [tasksData, setTasksData] = useState([]);

  // Get data from API and set the data:
  useEffect(() => {
    fetch('https://volunteer-network-react.herokuapp.com/taskEvents')
      .then((res) => res.json())
      .then((data) => setTasksData(data));
  }, []);

  return (
    <div className='container tasks-area'>
      <div className='row my-5'>
        {/* Send the tasksData as props to TaskItem Component */}
        {tasksData.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
