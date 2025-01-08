import { Label } from "@/components/ui/label";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "@/types";
import { useGlobalState } from "@/context/global-state-context";

const schema = z.object({
  domainName: z.string().trim().min(1, "Domain name is required"),
});

type FormData = z.infer<typeof schema>;
const DomainForm: FC = () => {
  const navigate = useNavigate();
  const { setDomainName } = useGlobalState();
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
      const response = await fetch(
        `https://test.microbin.io/v1/fleet/domainValidation/${data.domainName}`
      )
      if (!response.ok) throw new Error('Domain Not Found')
      const json = await response.json()
      if (json.status !== 'Success') throw new Error('something went wrong')
      setDomainName(data.domainName)
      navigate('/login')
    } catch (error) {
      console.error("Error:", error);
      setError("root", {
        type: "manual",
        message: (error as ApiError).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 !mt-6">
      <div className="space-y-1 text-left">
        <Label
          className={`text-sm ${errors.domainName || errors.root?.message ? "text-red-500" : ""
            }`}
        >
          Domain Name
        </Label>
        <Input
          disabled={isSubmitting}
          className={`border-white bg-black md:border-inherit ${errors.domainName || errors.root?.message ? "!border-red-500" : ""
            }`}
          autoComplete="off"
          id="domainName"
          {...register("domainName", {
            onChange: () => errors.root && clearErrors("root"),
          })}
        />
        {errors.domainName && (
          <p className="text-red-500 text-sm">{errors.domainName.message}</p>
        )}
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
      </div>
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
        <span>Don't have an account?</span>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            navigate("/sign-up");
          }}
          className="pl-3 text-blue-500"
          variant="link"
          effect="hoverUnderline"
        >
          Create Account
        </Button>
      </p>
    </form>
  );
};

export default DomainForm;
