type LabelProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      className={`block mb-2 text-sm font-bold text-neutral-600  ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
