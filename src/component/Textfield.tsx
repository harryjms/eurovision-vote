import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import c from "../helpers/combineClasses";
interface TextfieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  fullWidth?: boolean;
  error?: string;
}

const Textfield: React.FC<TextfieldProps> = ({
  label,
  fullWidth,
  error,
  ...props
}) => {
  const fieldId = props.id || props.name;
  return (
    <div className={c("flex flex-col", fullWidth ? "w-full" : "w-auto")}>
      {label ? <label htmlFor={fieldId}>{label}</label> : null}
      <input
        {...props}
        className={`outline-none transition-all bg-gray-200 rounded-md p-2 hover:ring-2 focus:ring-2 ring-blue-400`}
        id={fieldId}
      />
      {error ? (
        <div className="text-red-500 text-sm font-medium mb-2">{error}</div>
      ) : null}
    </div>
  );
};

export default Textfield;
