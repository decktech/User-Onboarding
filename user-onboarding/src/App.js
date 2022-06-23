import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Form from './Components/Form';
import schema from './validation/formSchema';
import * as yup from 'yup';

const initialFormValues = {
  username: '',
  password: '',
  email: '',
  tos: false,
}

const initialFormErrors = {
  username: '',
  password: '',
  email: '',
  tos: '',
}

const initialDisabled = true;

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(initialDisabled);
  // const [disabled, setDisabled] = useState(initialDisabled);

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name,value);
    setFormValues({...formValues, [name]: value})
  }

  const formSubmit = () => {
    axios.post('https://reqres.in/api/users', formValues)
      .then(res => {
        console.log(res.data)
        setUsers([...users, res.data ])
      })
      .catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues))
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <Form values={formValues} change={inputChange} errors={formErrors} submit={formSubmit} disabled={disabled}/>
      {users.map(user => [
        <div key={user.id}>
          <p>{user.createdAt}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ])}
    </div>
  );
}

export default App;
