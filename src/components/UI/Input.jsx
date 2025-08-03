import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ 
  className, 
  type, 
  label,
  error,
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 dark:text-slate-500" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-xl",
            "focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400",
            "transition-all duration-300 ease-in-out",
            "text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400",
            "hover:border-gray-400 dark:hover:border-slate-500",
            Icon && "pl-10",
            error && "border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {Icon && !error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="h-5 w-5" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;