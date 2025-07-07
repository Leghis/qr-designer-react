import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const Checkbox = React.forwardRef(({ 
  className, 
  label,
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div className={cn(
        "w-5 h-5 rounded-md border-2 transition-all duration-300 ease-in-out",
        "flex items-center justify-center",
        checked
          ? "bg-gradient-to-r from-primary-600 to-purple-600 border-transparent"
          : "bg-white dark:bg-dark-800 border-gray-300 dark:border-gray-600 group-hover:border-primary-500 dark:group-hover:border-primary-400",
        className
      )}>
        {checked && (
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        )}
      </div>
      {label && (
        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 select-none">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;