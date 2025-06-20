import React, { useState } from "react";
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
    mobile: "",
    verificationCode: "",
    isPhoneVerified: false,
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    studentId: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const rq = {
      email: regData.email,
      password: regData.password,
      firstName: regData.firstName,
      lastName: regData.surname,
      mobile: regData.mobile,
      dateOfBirthDay: regData.dob.day,
      dateOfBirthMonth: regData.dob.month,
      dateOfBirthYear: regData.dob.year,
      university: regData.university,
      studentId: regData.studentId,
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

  // New: handle phone number submit and verification
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!regData.mobile) {
      setErrors({ mobile: "Mobile number is required" });
      return;
    }
    setIsVerifying(true);
    try {
      await apiService.post('/api/verify/send-code', { mobile: regData.mobile });
      setVerificationSent(true);
      toast.info('Verification code sent to your phone');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        verificationSend: error.response?.data?.message || "Error sending verification code to your phone"
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!regData.verificationCode) {
      setErrors({ verificationCode: "Please enter the verification code" });
      return;
    }
    setIsVerifying(true);
    try {
      const res = await apiService.post('/api/verify/check-code', {
        mobile: regData.mobile,
        code: regData.verificationCode,
      });
      if (res.data.status === "success") {
        setRegData({ ...regData, isPhoneVerified: true });
        toast.success('Phone number verified!');
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
      email: data.email,
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
            <h1>Verify Phone Number</h1>
            <form className="signin-form" onSubmit={verificationSent ? handleVerifyCode : handlePhoneSubmit}>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  value={regData.mobile}
                  onChange={e => setRegData({ ...regData, mobile: e.target.value })}
                  required
                  disabled={verificationSent}
                />
                {errors.mobile && <div className="error-message">{errors.mobile}</div>}
              </div>
              {verificationSent && (
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
                    onClick={handlePhoneSubmit}
                    disabled={isVerifying}
                    style={{ marginTop: 8 }}
                  >
                    Resend Code
                  </button>
                </div>
              )}
              <button type="submit" className="signin-button" disabled={isVerifying}>
                {isVerifying ? (verificationSent ? "Verifying..." : "Sending...") : (verificationSent ? "Verify" : "Send Verification Code")}
              </button>
            </form>
          </div>
        );
      case 3:
        return <UniversitySignIn handleSubmitData={handleUniversitySignIn} />;
      case 4:
        return <EmailPasswordSignIn handleSubmitData={handleEmailPasswordSubmit} />;
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