// src/components/TemperatureSwitch.tsx
import React from 'react';
import { useTemperatureStore } from '@/store/temperatureStore';

const TemperatureSwitch: React.FC = () => {
  const { unit, toggleUnit } = useTemperatureStore();
  const isChecked = unit === 'F';

  const handleCheckboxChange = () => {
    toggleUnit();
  };

  return (
    <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <div className="shadow-card flex  items-center justify-center rounded-md bg-white">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded ${
            !isChecked ? 'bg-primary text-white' : 'text-body-color'
          }`}
        >
          °C
        </span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded ${
            isChecked ? 'bg-primary text-white' : 'text-body-color'
          }`}
        >
          °F
        </span>
      </div>
    </label>
  );
};

export default TemperatureSwitch;
