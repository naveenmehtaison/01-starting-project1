import React, { useRef, useState } from 'react';
import { Ref } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Wrapper from '../helper/Wrapper';
const AddUser = (props) => {
  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();
  const nameinputref = useRef()
  const ageinputref = useRef()
  const collegeinputref = useRef()

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredname = nameinputref.current.value
    const entereduserage = ageinputref.current.value
    const enteredcollege = collegeinputref.current.value
    if (enteredname.trim().length === 0 || entereduserage.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+entereduserage < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    
    props.onAddUser(enteredname, entereduserage,enteredcollege);
    nameinputref.current.value=''
    ageinputref.current.value=''
    collegeinputref.current.value=''
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameinputref}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageinputref}
          />
          <label htmlFor="college">College</label>
          <input
            id="college"
            type="text"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={collegeinputref}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
  
};

export default AddUser;
