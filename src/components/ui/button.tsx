import { ButtonHTMLAttributes, ReactElement, cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border bg-transparent hover:bg-accent hover:text-accent-foreground",
  ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-lg px-3 text-sm",
  lg: "h-11 rounded-xl px-6",
  icon: "h-10 w-10"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", size = "default", asChild, children, ...props },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      ...(props as Record<string, unknown>),
      className: cn(classes, child.props.className)
    });
  }

  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});
