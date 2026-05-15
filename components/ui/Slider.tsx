import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ label, value, onChange, min = 0, max = 100, step = 1, showValue = true, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
          {showValue && <span className="text-sm font-semibold text-blue-600">{value}</span>}
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;