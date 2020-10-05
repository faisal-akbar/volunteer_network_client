import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import '../Login/Login.css';
import logo from '../../assets/logos/logo.png';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';


// ============================================================================================

const TaskRegister = () => {
  // Receive user clicked task _id using useParams hook:
  const { _id } = useParams();
  // console.log(_id);

  // Set state
  const [task, setTask] = useState([]);

  // Get the single task user clicked from API:
  useEffect(() => {
    fetch(`https://volunteer-network-react.herokuapp.com/taskEvents/${_id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [_id]);

  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // // find the clicked task:
  // const task = tasksRegistration.find((id) => id._id === _id);
  // console.log(task);

  // React hook form for extra form validation and error message
  const { register, handleSubmit, errors } = useForm();

  // handle redirected to user task
  let history = useHistory();
  function handleUserTask() {
    history.push('/userDashboard');
  }

  // When user registered send the data to server and redirect user to UserDashboard
  const onSubmit = (data) => {
    const newTask = { ...data };
    newTask.image = task.image;

    fetch('https://volunteer-network-react.herokuapp.com/addRegistration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleUserTask();
        }
      });
  };

  return (
    <section className='container'>
      <div className='d-flex justify-content-center flex-column align-items-center my-5'>
        <div className='row mb-2'>
          <Link to='/'>
            <div className='col-md-12  text-center mb-3'>
              <img className='w-25' src={logo} alt='' />
            </div>
          </Link>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='login-form shadow bg-white rounded text-left p-3'
            >
              <h4 className='font-weight-bold mb-3'>Register as a Volunteer</h4>
              <div className='form-group'>
                <input
                  className='form-control'
                  defaultValue={loggedInUser.name}
                  name='name'
                  type='text'
                  placeholder='Full Name'
                  ref={register({ required: true })}
                />
                {errors.name && <span className='error'>Name is required</span>}
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  name='email'
                  type='email'
                  value={loggedInUser.email}
                  placeholder='Email'
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className='error'>Email is required</span>
                )}
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  name='registrationDate'
                  type='date'
                  ref={register({ required: true })}
                />
                {errors.registrationDate && (
                  <span className='error'>Date is required</span>
                )}
              </div>
              <div className='form-group'>
                <textarea
                  className='form-control'
                  name='description'
                  placeholder='Description'
                  rows='2'
                  ref={register({ required: true })}
                ></textarea>

                {errors.description && (
                  <span className='error'>Description is required</span>
                )}
              </div>
              {/* Receive from Tasks.. */}
              <div className='form-group'>
                <input
                  className='form-control'
                  value={task.task}
                  name='task'
                  type='text'
                  placeholder='Task Title'
                  ref={register({ required: true })}
                />
                {errors.task && (
                  <span className='error'>Task title is required</span>
                )}
              </div>

              <div className='form-group'>
                <button
                  style={{ width: '100%' }}
                  className='btn btn-primary'
                  type='submit'
                >
                  Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskRegister;
