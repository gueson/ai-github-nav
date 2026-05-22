interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 rounded-lg",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg",
  };
  
  const sizeStyles = {
    default: "h-10 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
