import { useContext, useState, useEffect } from 'react';
import { Store } from "../../AppState/Store";
import Card from '../../util/card';
import { useFormik } from "formik";
import Error from '../../util/error';
import './deposit.css'; // Import the CSS file

export default function Deposit() {
  const { state, actions } = useContext(Store);
  const [showAlert, setShowAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    onSubmit: values => {
      let amount = parseFloat(values.amount);
      actions.deposit(amount);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Reset the amount field value to empty after submission
      formik.setFieldValue('amount', '');
    },
    validate: values => {
      let errors = {};
      if (!values.amount || values.amount === "") {
        errors.amount = "";
      } else if (isNaN(values.amount)) {
        errors.amount = "Invalid amount";
      } else if (values.amount.length > 8) {
        errors.amount = "Only Limited Amount to Be Deposited";
      } else if (parseFloat(values.amount) < 0) {
        errors.amount = "Negative numbers not allowed";
      }
      return errors;
    }
  });

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div className="deposit-container"> {/* Apply the container class */}
      <>
        <div className="withdraw-content">
          <Card
            bgcolor="transparent" // Set background color to transparent
            body={
              <>
                {state.currentUser && <form onSubmit={formik.handleSubmit} data-testid="deposit-form">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">Balance: </div>
                      <div className="col" data-testid="user-balance">{state.currentUser.balance}</div>
                    </div>

                    <div className="amount-container">
                      <div className="row">
                        <h4 className="withdraw-title">Deposit Amount</h4> {/* Updated title font */}
                      </div>
                      <div className="fields">
                        <input type="text" pattern="\d{0,10}" className="form-control withdraw-input" id="amountField" name="amount" onChange={formik.handleChange} value={formik.values.amount} aria-label="withdraw-field" />
                        {formik.errors.amount ? <Error id="emailError" message={formik.errors.amount} /> : null}
                        <button type="submit" className="btn btn-secondary withdraw-button black" id="submitBtn" disabled={!(formik.isValid && formik.dirty)}>Deposit</button>
                        {/* Add the 'black' class to make the button black in color */}
                      </div>
                      {formik.touched.amount && formik.errors.amount && <div className="error-message">{formik.errors.amount}</div>}
                    </div>
                  </div>
                </form>}
                {!state.currentUser &&
                  <div className="login-info">You can't see this content without being logged in.</div> /* Updated text font */
                }
              </>
            }
            className="custom-card withdraw-card" // Apply the custom card class with withdraw-card style
          />
          <div className="alerts">
            {showAlert && <div className="alert alert-success" role="alert">
              Success! Your Money Has Been Credited to your account.
            </div>}
          </div>
        </div>
      </>
    </div>
  )
}
