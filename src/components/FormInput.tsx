import { useFormContext, type FieldError, type Path } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FormInputTypes<T extends Record<string, any>> {
  type: "text" | "email" | "password" | "number" | "textarea";
  placeholder?: string;
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

const FormInput = <T extends Record<string, any>>(props: FormInputTypes<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = errors[props.name] as FieldError | undefined;

  const InputComponent = props.type === "textarea" ? Textarea : Input;

  return (
    <div>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}

      <InputComponent
        id={props.name}
        className="mt-1"
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...register(props.name)}
      />

      {fieldError && (
        <small className="text-sm font-medium text-red-500">
          {fieldError.message}
        </small>
      )}
    </div>
  );
};

export default FormInput;
