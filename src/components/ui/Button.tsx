import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  "font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-[#4C82FB] to-[#8C5FFF] hover:from-[#5B8AFF] hover:to-[#9D6FFF] text-white shadow-lg hover:shadow-xl hover:scale-105",
        secondary: "bg-[#1B2131] hover:bg-[#2C3444] text-white shadow-lg hover:shadow-xl hover:scale-105",
        outline: "border border-[#2C3444] bg-gradient-to-r from-[#1B2131] to-[#2C3444] hover:from-[#2C3444] hover:to-[#3C4454] text-white shadow-lg hover:shadow-xl hover:scale-105",
        glass: "bg-[#1B2131]/50 backdrop-blur-xl hover:bg-[#2C3444]/50 text-white",
        danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ variant, size, className, children, onClick, disabled }: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 