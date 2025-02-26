import React from "react";

interface PriceRangeProps {
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Price Range</label>
      <div className="flex gap-2">
        <input
          type="number"
          value={value.min}
          onChange={(e) => onChange({ ...value, min: +e.target.value })}
          className="border p-2 rounded"
          placeholder="Min"
        />
        <input
          type="number"
          value={value.max}
          onChange={(e) => onChange({ ...value, max: +e.target.value })}
          className="border p-2 rounded"
          placeholder="Max"
        />
      </div>
    </div>
  );
};

export default PriceRange;