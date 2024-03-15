import React, { useContext, useState } from 'react';
import Card from '../../util/card';
import { Store } from "../../AppState/Store";
import { useFormik } from 'formik';
import Error from '../../util/error';
import './createaccount.css'; // Import the CSS file

export default function CreateAccount() {
  const [show, setShow] = useState(true);
  const { actions } = useContext(Store);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      console.log(values);
      actions.addUser({ ...values, balance: 0 });
      alert("success!")
      setShow(false);
    },
    onReset: values => {
      setShow(true);
    },
    validate: values => {
      let errors = {};
      if (formik.touched.name && !values.name.trim()) errors.name = "Field required";
      if (formik.touched.name && !/^[A-Za-z\s]+$/i.test(values.name)) errors.name = 'INVALID CHARACTERS';
      if (formik.touched.email && (!values.email || !/^[A-Z0-9._%+-]+@gmail\.com$/i.test(values.email))) {
        errors.email = values.email ? 'Invalid Email' : 'Field required';
      }
      if (formik.touched.password && !values.password) errors.password = "Field required";
      else if (formik.touched.password && values.password.length < 8) errors.password = "Password needs to be more than 8 characters";
      if (formik.touched.confirmPassword && !values.confirmPassword) errors.confirmPassword = "Field required";
      else if (formik.touched.confirmPassword && values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match";
      return errors;
    }
  });

  return (
    <div className="container"> {/* Apply the container class */}
      <>
        <Card
          bgcolor="transparent"
          body={show ? (
            <form onSubmit={formik.handleSubmit}>
              Name<br />
              <input type="input" className="form-control" id="name" name="name" placeholder="Enter name" onChange={formik.handleChange} onBlur={formik.handleBlur} /><br />
              {formik.touched.name && formik.errors.name ? <Error message={formik.errors.name} /> : null}
              Email address<br />
              <input type="input" className="form-control" id="email" name="email" placeholder="Enter email" onChange={formik.handleChange} onBlur={formik.handleBlur} /><br />
              {formik.touched.email && formik.errors.email ? <Error message={formik.errors.email} /> : null}
              Password<br />
              <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={formik.handleChange} onBlur={formik.handleBlur} /><br />
              {formik.touched.password && formik.errors.password ? <Error message={formik.errors.password} /> : null}
              Confirm Password<br />
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" onBlur={formik.handleBlur} onChange={formik.handleChange} /><br />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <Error message={formik.errors.confirmPassword} /> : null}
              <button type="submit" className="btn btn-light" id="submitBtn" disabled={!(formik.isValid && formik.dirty)}>Create Account</button>
            </form>
          ) : (
            <>
              <h5>Account Created Successfully</h5>
              <button type="submit" className="btn btn-light" onClick={formik.handleReset}>Add another account</button>
            </>
          )}
          className="card-container" // Apply the card-container class
        />
      </>
    </div>
  );
}
