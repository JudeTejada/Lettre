type ButtonType = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  buttonType?: ButtonType;
  name?: string;
  value?: string;
}

const ButtonSwitchStyles = (type: ButtonType, disabled?: boolean) => {
  let baseClassName =
    'text-primary-black text-base rounded-lg min-h-[48px] px-10  font-medium';

  switch (type) {
    case 'primary':
      return ` bg-primary-black text-white  ${baseClassName}  `;

    case 'secondary':
      return ` border  border-primary-black text-primary-black  ${baseClassName}  `;

    default: {
      throw new Error('variant not supported for that');
    }
  }
};

export const Button: React.FC<ButtonProps> = ({
  children,
  buttonType = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={` ${ButtonSwitchStyles(buttonType)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// interface ButtonProps {
//   title: string;
//   showIcon: boolean;
// }

// const Button: React.FC<ButtonProps> = ({ title, showIcon, ...props }) => {
//   return (
//     <button {...props}>
//       {title}
//       {showIcon && <Icon />}
//     </button>
//   );
// };
