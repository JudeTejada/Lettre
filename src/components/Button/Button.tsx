type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  buttonType?: ButtonType;
  name?: string;
  value?: string;
}

const ButtonSwitchStyles = (type: ButtonType, disabled?: boolean) => {
  let baseClassName =
    'text-primary-black text-base rounded-lg min-h-[48px] w-full  font-medium';

  switch (type) {
    case 'primary':
      return ` bg-primary-black text-white  ${baseClassName}  `;

    default: {
      throw new Error('variant not supported for that');
    }
  }
};

export const Button = ({
  children,
  buttonType = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='submit'
      className={` ${ButtonSwitchStyles(buttonType)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
