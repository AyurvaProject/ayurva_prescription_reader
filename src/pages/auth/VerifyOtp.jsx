import VerifyOtpSection from "../../section/verifyOtp/VerifyOtpSection";
import { useParams } from "react-router-dom";
const VerifyOtpPage = () => {
  const { id } = useParams();
  return <VerifyOtpSection id={id} />;
};

export default VerifyOtpPage;
