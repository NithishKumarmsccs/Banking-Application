import { useContext } from 'react';
import { Store } from "../../AppState/Store";
import Card from '../../util/card';
import { useFormik } from "formik";
import Error from "../../util/error";
import './withdraw.css'; // Import the CSS file

export default function Withdraw() {
  const { state, actions } = useContext(Store);

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    onSubmit: values => {
      console.log(values);
      if (values.amount <= state.currentUser.balance) {
        let amount = parseFloat(values.amount);
        actions.withdraw(amount);
        actions.setSuccess(true);
        setTimeout(() => {
          actions.setSuccess(false);
        }, 3000);
      } else {
        actions.setError(true);
        setTimeout(() => {
          actions.setError(false);
        }, 3000);
      }

      // Reset the amount field value to empty after submission
      formik.setFieldValue('amount', '');
    },
    validate: values => {
      let errors = {};
      if (formik.touched.amount && (!values.amount || values.amount === "")) errors.amount = "";
      if (values.amount !== "" && isNaN(parseFloat(values.amount))) errors.amount = "Just Numbers allowed";
      if (values.amount.length > 8) errors.amount = "Value exceeded 8 digits";
      if (values.amount < 0) errors.amount = "Negative Numbers not allowed";
      return errors;
    }
  });

  return (
    <div className="withdraw-container"> {/* Apply the container class */}
      <>
        <div className="withdraw-content">
          <Card
            bgcolor="transparent" // Set background color to transparent
            body={
              <>
                {state.currentUser && <form onSubmit={formik.handleSubmit} data-testid="withdraw-form">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">Balance: </div>
                      <div className="col" data-testid="user-balance">{state.currentUser.balance}</div>
                    </div>
                    <div className="amount-container">
                      <div className="row">
                        <h4 className="withdraw-title">Withdraw Amount</h4> {/* Updated title font */}
                      </div>
                      <div className="fields">
                        <input type="text" pattern="\d{0,10}" className="form-control withdraw-input" id="amountField" name="amount" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.amount} aria-label="withdraw-field" />
                        <button type="submit" className="btn btn-secondary withdraw-button" id="submitBtn" disabled={!(formik.isValid && formik.dirty)}>Withdraw</button>
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
            {state.success && <div className="alert alert-success animate__animated animate__fadeIn" role="alert">
              Success! Money Has Been Debited From Your Account
            </div>}
            {state.error && <div className="alert alert-danger animate__animated animate__fadeIn" role="alert">
              Insufficient Balance
            </div>}
          </div>
        </div>
      </>
    </div>
  )
}
