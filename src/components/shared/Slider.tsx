import { InputHTMLAttributes, forwardRef } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  unit?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, unit, showValue = true, formatValue, className = '', value, ...props }, ref) => {
    const displayValue = formatValue
      ? formatValue(Number(value))
      : `${value}${unit ? ` ${unit}` : ''}`;

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {displayValue}
            </span>
          )}
        </div>
        <input
          ref={ref}
          type="range"
          value={value}
          className={`
            w-full h-2 rounded-lg appearance-none cursor-pointer
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
