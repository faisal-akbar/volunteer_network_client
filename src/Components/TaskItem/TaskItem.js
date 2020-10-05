import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker';

const TaskItem = (props) => {
  // Receive props from Tasks / SearchResults(if user type and click on Search) Component:
  const { _id, task, image } = props.task;
  // console.log(image);

  return (
    <div className='col-md-3 mb-4'>
      {/* Dynamically route when user clicked on task and ask for Registration */}
      <Link to={'tasks/' + _id}>
        <div className='card h-100 task-image'>
          {/* if image field is not exist or no imageURL is set in the Admin>AddEvent then check */}
          {image === undefined || image === '' ? (
            <></>
          ) : (
            <img src={image} className='card-img-top' alt='...' />
          )}

          <div
            className='card-footer h-100 rounded text-light text-center taskItem-footer '
            style={{ backgroundColor: faker.internet.color() }}
          >
           {task}
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TaskItem;
