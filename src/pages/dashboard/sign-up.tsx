import SignUpForm from "@/components/forms/auth-forms/sign-up-form";
import { FC } from "react";

const SignUp: FC = () => {
  return (
    <div className="container relative max-h-screen h-screen lg:grid max-w-full lg:grid-cols-2 lg:px-0">
      <LeftBox />
      <RightBox />
    </div>
  );
};
const LeftBox: FC = () => {
  return (
    <div className="relative hidden bg-[#006cea] max-h-screen h-screen flex-col p-10 text-white lg:flex justify-center">
      <div>
        <div className="relative z-20 flex items-center gap-2 font-medium">
          <img src="/microbin-full-white.png" />
        </div>
        <div className="relative z-20 my-3 2xl:my-10">
          <h1 className="text-4xl text-center gradient-title-white 2xl:text-6xl lg:text-left 2xl:mb-10 mb-4">
            Using MicroBin&apos;s Fleet/Site Cloud IoT Dashboard ?
          </h1>

          <p className="mb-2 text-xl text-center text-gray-200 lg:text-left">
            Looking for a way to enhance the safety and efficiency of your
            industrial site? Fleet / Site Cloud IoT Dashboard Builder
          </p>
        </div>
        <div className="relative">
          <img
            className="rounded-[15px] h-10 md:h-auto"
            src="/three-dashboard.png"
          />
        </div>
      </div>
    </div>
  );
};

const RightBox: FC = () => {
  return (
    <div className="lg:p-8 max-h-screen h-screen flex items-center justify-center bg-black">
      <div className="w-[calc(100%-50px)] min-[450px]:w-[400px] sm:w-[500px] text-center space-y-4 text-white">
        <div className="flex items-center justify-center mb-4">
          <img src="/microbin-full-white.png" alt="logo" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight lg:hidden gradient-title">
          Using MicroBin&apos;s Fleet/Site Cloud IoT Dashboard ?
        </h1>

        <p className="text-2xl lg:text-xl pb-1 font-medium">
          Welcome. Let’s get started.
        </p>
        <p className="text-lg pb-1 font-medium">
          To begin, tell us a bit about yourself
        </p>
        <SignUpForm />
      </div>
    </div>
  );
};
export default SignUp;
