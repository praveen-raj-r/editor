import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NavigateFunction } from "react-router-dom";
import { ApiError, ApiResponse, SignUpApiData } from "@/types";

const schema = z.object({
  name: z.string().trim().min(1, "Business name is required"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .min(1, "Email is required"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone Number must be 10 digits"),
});

type FormData = z.infer<typeof schema>;

const simulatedApi = (
  data: SignUpApiData
): Promise<ApiResponse<SignUpApiData>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isError = !data;

      if (isError) {
        reject({ message: "Invalid Credentials." } as ApiError);
      } else {
        resolve({
          success: true,
          data,
          message: "Account validated successfully",
          timestamp: new Date().toISOString(),
        } as ApiResponse<SignUpApiData>);
      }
    }, 1000);
  });
};

const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "microbin",
      email: "demo@microbin.com",
      phoneNumber: "9876543210",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await simulatedApi(data);
      console.log("Success:", response);
      setShowDialog(true);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 !mt-6">
        <FormField
          label="Business Name"
          id="name"
          register={register}
          error={errors.name?.message}
          isSubmitting={isSubmitting}
          clearErrors={clearErrors}
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          register={register}
          error={errors.email?.message}
          isSubmitting={isSubmitting}
          clearErrors={clearErrors}
        />
        <FormField
          label="Phone Number"
          id="phoneNumber"
          register={register}
          error={errors.phoneNumber?.message}
          isSubmitting={isSubmitting}
          clearErrors={clearErrors}
        />
        {errors.root?.message && (
          <p className="text-red-500 text-sm">{errors.root?.message}</p>
        )}
        <div className="flex justify-center">
          <Button
            className="w-full bg-white text-black hover:bg-gray-400"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                <span className="ml-2">Validating</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        <p className="text-sm font-medium">
          <span>Already have an account?</span>
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
            Back to Login
          </Button>
        </p>
      </form>
      <DialogComp showDialog={showDialog} navigate={navigate} />
    </>
  );
};

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
      <DialogContent className="w-[calc(100%-25px)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-center sm:text-2xl mb-7">
            Account Creation Successful🎉
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
            The account creation process has started. Our team will contact you
            soon.
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default SignUpForm;
