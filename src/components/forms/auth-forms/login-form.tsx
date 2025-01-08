import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useGlobalState } from "@/context/global-state-context";

const schema = z.object({
  username: z.string().trim().min(1, "Business name is required"),
  password: z.string().trim().min(1, "Business name is required"),
});

type FormData = z.infer<typeof schema>;



const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { domainName } = useGlobalState();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (domainName == "") throw new Error('Something went wrong')
      const response = await fetch(
        `https://test.microbin.io/v1/fleet/loginValidation/${domainName}/${data.username}/${data.password}`
      )
      if (!response.ok) throw new Error('Invalid login credentials')

      const json = await response.json()
      console.log(json)
      if (json.status !== 'Success') throw new Error('Something went wrong')
      navigate("/app/dashboard");
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
          label="Username"
          id="username"
          register={register}
          error={errors.username?.message}
          isSubmitting={isSubmitting}
          clearErrors={clearErrors}
        />
        <FormField
          label="Password"
          id="password"
          type="password"
          register={register}
          error={errors.password?.message}
          isSubmitting={isSubmitting}
          clearErrors={clearErrors}
        />
        {errors.root && (
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
          <span>Forgot your password?</span>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              navigate("/forgot-password");
            }}
            className="pl-3 text-blue-500"
            variant="link"
            effect="hoverUnderline"
          >
            Reset Password
          </Button>
        </p>
      </form>
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
        className={`border-white bg-black md:border-inherit ${error ? "!border-red-500" : ""
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
export default LoginForm;
