import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { CircleCheck } from "lucide-react";
import { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiError, ApiResponse, ForgotPasswordApiData } from "@/types";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

const simulatedApi = (
  data: ForgotPasswordApiData
): Promise<ApiResponse<ForgotPasswordApiData>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isError = data.email !== "demo@microbin.com";
      console.log("Data:", data);

      if (isError) {
        reject({ message: "Invalid Credentials." } as ApiError);
      } else {
        resolve({
          success: true,
          data,
          message: "Account validated successfully",
          timestamp: new Date().toISOString(),
        } as ApiResponse<ForgotPasswordApiData>);
      }
    }, 1000);
  });
};

const ForgotPasswordForm: FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "demo@microbin.com",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await simulatedApi(data);
      setShowDialog(true);
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
      setError("root", {
        type: "manual",
        message: (error as ApiError).message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="sm:w-[350px] w-[calc(100%-10px)]  bg-black text-white">
          <CardHeader>
            <CardTitle>Forgot password?</CardTitle>
            <CardDescription>
              No worries, we got you covered. Enter your email to reset your
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 !mt-6">
            <FormField
              label="Email"
              id="email"
              register={register}
              error={errors.email?.message}
              isSubmitting={isSubmitting}
              clearErrors={clearErrors}
            />
            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root?.message}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button disabled={isSubmitting} variant="destructive">
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Validating
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                navigate("/");
              }}
              className="pl-3 text-blue-500"
              variant="link"
              effect="hoverUnderline"
            >
              Back to Log in
            </Button>
          </CardFooter>
        </Card>
      </form>
      <DialogComp showDialog={showDialog} navigate={navigate} />
    </>
  );
};
function DialogComp({
  showDialog,
  navigate,
}: {
  showDialog: boolean;
  navigate: NavigateFunction;
}) {
  return (
    <Dialog
      onOpenChange={() => {
        navigate("/");
      }}
      open={showDialog}
    >
      <DialogContent className="w-[calc(100%-25px)] sm:w-full bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-center sm:text-2xl mb-7">
            Reset Password Request Successful
          </DialogTitle>
          <div className="flex justify-center items-centerD">
            <CircleCheck
              fill="#17db5f"
              stroke="#fff"
              strokeWidth={1}
              className="size-20"
            />
          </div>
          <p className="text-center !mt-10 text-base leading-tight">
            The account reset password instructions sent to your email. Please
            check your inbox and follow the instructions to reset your password.
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
const FormField: FC<{
  label: string;
  id: keyof FormData;
  type?: string;
  register: UseFormRegister<FormData>;
  error?: string;
  isSubmitting: boolean;
  clearErrors: (name?: keyof FormData) => void;
}> = ({
  label,
  id,
  type = "text",
  register,
  error,
  isSubmitting,
  clearErrors,
}) => (
  <div className="space-y-1 text-left">
    <Label className={`text-sm ${error ? "text-red-500" : ""}`}>{label}</Label>
    <Input
      disabled={isSubmitting}
      className={`border-white bg-black md:border-inherit ${
        error ? "!border-red-500" : ""
      }`}
      autoComplete="off"
      id={id}
      type={type}
      {...register(id, {
        onChange: () => error && clearErrors(id),
      })}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default ForgotPasswordForm;
