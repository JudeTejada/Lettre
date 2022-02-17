type InputProps = {
  className?: string;
  id?: string;
  type: string;
  placeholder: string;
  name: string;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  const { placeholder } = props;
  return (
    <input
      aria-label={placeholder}
      className='w-full px-3 py-2 leading-tight text-gray-700 border-2 rounded-md appearance-none bg-primary-bg border-primary-black focus:outline-none focus:shadow-outline focus:bg-white'
      {...props}
    />
  );
};
