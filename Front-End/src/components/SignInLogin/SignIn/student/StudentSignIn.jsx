import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../../services/api-service";
import EmailPasswordSignIn from "../common/EmailPasswordSignIn";
import "../SignIn2.css";
import StudentBasicDetails from "./StudentBasicDetails";
import UniversitySignIn from "./UniversitySignIn";

const StudentSignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [regData, setRegData] = useState({
    firstName: "",
    surname: "",
    dob: { day: "", month: "", year: "" },
    email: "",
    verificationCode: "",
    isEmailVerified: false,
    password: "",
    confirmPassword: "",
    university: "",
    studentId: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const rq = {
      email: regData.email,
      password: regData.password,
      firstName: regData.firstName,
      lastName: regData.surname,
      dateOfBirthDay: regData.dob.day,
      dateOfBirthMonth: regData.dob.month,
      dateOfBirthYear: regData.dob.year,
      university: regData.university,
      universityId: regData.studentId,
    };
    const response = await apiService.post("/auth/register", rq);
    toast.success(response.data.message);
    navigate('/student-login');
  };

  const handleBasicDetailsSubmit = (data) => {
    setRegData({
      ...regData,
      firstName: data.firstName,
      surname: data.surname,
      dob: data.dob,
    });
    setStep(2);
  };

  // Email verification logic
  const handleSendEmailCode = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    if (!regData.email) {
      setErrors({ email: 'Email is required for verification' });
      return;
    }
    setIsVerifying(true);
    try {
      await apiService.post('/verify/send-code', { email: regData.email });
      toast.success('Verification code sent to your email');
      setEmailVerificationSent(true);
    } catch (error) {
      setErrors(prev => ({ ...prev, verificationSend: error.response?.data?.message || 'Error sending verification code to your email' }));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyEmailCode = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!regData.verificationCode) {
      setErrors({ verificationCode: "Please enter the verification code" });
      return;
    }
    setIsVerifying(true);
    try {
      setErrors((prev) => ({ ...prev, verificationCode: '' }));
      const res = await apiService.post('/verify/check-code', { email: regData.email, code: regData.verificationCode });
      if (res.data === "Verified" || res.data.status === "success") {
        setRegData({ ...regData, isEmailVerified: true });
        toast.success('Email verified!');
        setStep(3);
      } else {
        setErrors({ verificationCode: res.data.message || "Invalid code" });
      }
    } catch {
      setErrors({ verificationCode: "Verification failed" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUniversitySignIn = (data) => {
    setRegData({
      ...regData,
      university: data.university,
      studentId: data.studentId,
    });
    setStep(4);
  };

  const handleEmailPasswordSubmit = async (data) => {
    setRegData({
      ...regData,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    await handleRegister();
  };

  const showForm = () => {
    switch (step) {
      case 1:
        return <StudentBasicDetails handleSubmitData={handleBasicDetailsSubmit} />;
      case 2:
        return (
          <div className="signin-content-box">
            <h1>Verify Email</h1>
            <form className="signin-form" onSubmit={emailVerificationSent ? handleVerifyEmailCode : handleSendEmailCode}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={regData.email}
                  onChange={e => setRegData({ ...regData, email: e.target.value })}
                  required
                  disabled={regData.isEmailVerified}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              {emailVerificationSent && !regData.isEmailVerified && (
                <div className="form-group">
                  <label htmlFor="verificationCode">Verification Code</label>
                  <input
                    type="text"
                    id="verificationCode"
                    placeholder="Enter verification code"
                    value={regData.verificationCode}
                    onChange={e => setRegData({ ...regData, verificationCode: e.target.value })}
                    required
                  />
                  {errors.verificationCode && <div className="error-message">{errors.verificationCode}</div>}
                  <button
                    type="button"
                    className="signin-button"
                    onClick={handleSendEmailCode}
                    disabled={isVerifying}
                    style={{ marginTop: 8 }}
                  >
                    Resend Code
                  </button>
                </div>
              )}
              <button type="submit" className="signin-button" disabled={isVerifying || regData.isEmailVerified}>
                {isVerifying ? (emailVerificationSent ? "Verifying..." : "Sending...") : (emailVerificationSent ? "Verify" : "Send Verification Code")}
              </button>
            </form>
          </div>
        );
      case 3:
        return <UniversitySignIn handleSubmitData={handleUniversitySignIn} />;
      case 4:
        return <EmailPasswordSignIn handleSubmitData={handleEmailPasswordSubmit} email={regData.email} />;
      default:
        return <StudentBasicDetails handleSubmitData={handleBasicDetailsSubmit} />;
    }
  };

  return (
    <div className="signin-container">
      <img src="/bmlogo.png" alt="Home Icon" className="home-icon" onClick={() => navigate("/")} />
      {showForm()}
    </div>
  );
};

export default StudentSignIn;