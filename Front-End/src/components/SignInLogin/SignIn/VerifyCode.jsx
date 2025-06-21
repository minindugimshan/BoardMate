import  { useState } from 'react';
import api from '../../services/api-service';
import PropTypes from 'prop-types';

export default function VerifyCode({ email, phone, onVerified }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('email'); // or 'mobile'

  const handleVerify = async () => {
    const payload = method === 'email'
      ? { email, code }
      : { mobile: phone, code };
    try {
      const res = await api.post('/verify/check-code', payload);
      if (res.data.status === 'success') {
        setStatus('Verified! You can now log in.');
        onVerified();
      } else {
        setStatus(res.data.message);
      }
    } catch {
      setStatus('Verification failed.');
    }
  };

  const handleResend = async () => {
    const payload = method === 'email'
      ? { email }
      : { mobile: phone };
    await api.post('/verify/send-code', payload);
    setStatus('Code resent!');
  };

  return (
    <div>
      <h3>Verify your {method === 'email' ? 'Email' : 'Phone'}</h3>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      <button onClick={handleResend}>Resend Code</button>
      <div>
        <label>
          <input
            type="radio"
            checked={method === 'email'}
            onChange={() => setMethod('email')}
          /> Email
        </label>
        <label>
          <input
            type="radio"
            checked={method === 'mobile'}
            onChange={() => setMethod('mobile')}
          /> SMS
        </label>
      </div>
      <div>{status}</div>
    </div>
  );
}

VerifyCode.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.string,
  onVerified: PropTypes.func.isRequired,
};
