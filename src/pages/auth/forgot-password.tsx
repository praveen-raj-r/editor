import { FC } from "react";
import ForgotPasswordForm from "@/components/forms/auth-forms/forgot-password-form";

const ForgotPassword: FC = () => {
  return (
    <div className="max-h-screen h-screen flex items-center justify-center bg-black">
      <div className="h-full justify-center flex items-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
