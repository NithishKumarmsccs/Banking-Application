import React from 'react';
import './helpcenter.css';

class HelpCenter extends React.Component {
  render() {
    return (
      <div>
        <h2>Help Center</h2>
        <p>Welcome to our Help Center. How can we assist you today?</p>

        <div>
          <h3>View Bank Details:</h3>
          <p>Here you can find information about our bank, including:</p>
          <ul>
            <li>Branch locations</li>
            <li>Working hours</li>
            <li>Services offered</li>
          </ul>
          <button onClick={this.handleViewBankDetails}>View Bank Details</button>
          {/* Add functionality to view bank details */}
        </div>

        <div>
          <h3>Problem Solving:</h3>
          <p>If you're experiencing any issues with our services, we're here to help.</p>
          <ul>
            <li>FAQs - Frequently Asked Questions</li>
            <li>Support Articles</li>
            <li>Contact Support</li>
          </ul>
        </div>

        {/* Add additional sections for specific problem-solving content */}

      </div>
    );
  }

  handleViewBankDetails = () => {
    // Logic to display bank details
    alert('Bank details are displayed.'); // Replace this with actual logic
  }
}

export default HelpCenter;
