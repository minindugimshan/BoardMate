import React, { useEffect, useState } from 'react';
import moment from 'moment';
import jsPDF from 'jspdf';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  // Sample data (replace with API calls)
  const upcomingPayment = {
    id: 1,
    amount: 500,
    dueDate: '2024-03-10',
    status: 'Pending',
    payHereUrl: 'https://payhere.com/payment-link',
  };

  const paymentHistory = [
    { id: 1, date: '2024-02-01', amount: 500, status: 'Paid' },
    { id: 2, date: '2024-01-01', amount: 500, status: 'Paid' },
    { id: 3, date: '2023-12-01', amount: 500, status: 'Pending' },
  ];

  const notificationMessage = 'Your next payment is due in 3 days!';

  // UpcomingPayment Component
  const UpcomingPayment = ({ payment }) => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
      if (payment && payment.dueDate) {
        const dueDate = moment(payment.dueDate);
        const today = moment();
        const daysLeft = dueDate.diff(today, 'days');
        setCountdown(daysLeft > 0 ? `${daysLeft} Days Left` : 'Overdue');
      }
    }, [payment]);

    return (
      <div className={`upcoming-payment ${countdown === 'Overdue' ? 'overdue' : ''}`}>
        <h3>Next Payment: ${payment.amount} Due on {moment(payment.dueDate).format('Do MMMM')}</h3>
        <p>Countdown: {countdown}</p>
      </div>
    );
  };

  // PaymentAction Component
  const PaymentAction = ({ payment }) => {
    const handlePayNow = () => {
      window.location.href = payment.payHereUrl; // Redirect to PayHere
    };

    return (
      <div className="payment-action">
        {payment.status === 'Paid' ? (
          <p>Payment Completed ✅</p>
        ) : (
          <button onClick={handlePayNow}>Pay Now</button>
        )}
      </div>
    );
  };

  // PaymentHistory Component
  const PaymentHistory = ({ payments }) => {
    const downloadPDF = () => {
      const doc = new jsPDF();
      doc.text("Payment History", 10, 10);
      payments.forEach((payment, index) => {
        doc.text(`${payment.date} - $${payment.amount} - ${payment.status}`, 10, 20 + (index * 10));
      });
      doc.save("payment-history.pdf");
    };

    return (
      <div className="payment-history">
        <h2>Payment History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>${payment.amount}</td>
                <td>{payment.status === 'Paid' ? '✅ Paid' : '❌ Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
    );
  };

  // Notifications Component
  const Notifications = ({ message }) => {
    return (
      <div className="notification">
        <p>{message}</p>
      </div>
    );
  };

  // Main Dashboard Render
  return (
    <div className="dashboard">
      <h1>Payment Dashboard</h1>
      <UpcomingPayment payment={upcomingPayment} />
      <PaymentAction payment={upcomingPayment} />
      <Notifications message={notificationMessage} />
      <PaymentHistory payments={paymentHistory} />
    </div>
  );
};

export default Dashboard;