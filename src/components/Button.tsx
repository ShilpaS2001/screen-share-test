import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  disabled, // Extract disabled to handle it explicitly
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200",
    outline: "border-2 border-slate-200 hover:border-slate-300 text-slate-600 bg-transparent"
  };

  return (
    <button 
      // Requirement check: Disable button during permission request
      disabled={disabled || isLoading} 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;