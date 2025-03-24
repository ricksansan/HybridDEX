import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardStyles = cva(
  "rounded-[32px] transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "bg-[#0D111C]/90 backdrop-blur-xl border border-[#1B2131] shadow-xl",
        secondary: "bg-[#1B2131]/50 backdrop-blur-xl",
        glass: "bg-[#1B2131]/30 backdrop-blur-xl border border-[#2C3444]/50"
      },
      hover: {
        true: "hover:bg-[#1B2131] hover:shadow-2xl hover:scale-[1.02]",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      hover: false
    }
  }
);

interface CardProps extends VariantProps<typeof cardStyles> {
  children: ReactNode;
  className?: string;
}

export function Card({ variant, hover, className, children }: CardProps) {
  return (
    <div className={cardStyles({ variant, hover, className })}>
      {children}
    </div>
  );
} 