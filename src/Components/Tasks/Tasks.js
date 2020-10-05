import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './Tasks.css';
import PreLoader from '../PreLoader/PreLoader';

const Tasks = () => {
  // Set data using hook:
  const [tasksData, setTasksData] = useState([]);

  //PreLoader visibility
  const [preLoaderVisibility, setPreLoaderVisibility] = useState("block");

  // Get data from API and set the data:
  useEffect(() => {
    fetch('https://volunteer-network-react.herokuapp.com/taskEvents')
      .then((res) => res.json())
      .then((data) => {
        setTasksData(data)        
        setPreLoaderVisibility("none")
      }
      
      );
      
  }, []);

  return (
    <div className='container tasks-area'>
      <div className='row my-5'>
      <PreLoader  visibility={preLoaderVisibility}/>
      
        {/* Send the tasksData as props to TaskItem Component */}
        {tasksData.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
