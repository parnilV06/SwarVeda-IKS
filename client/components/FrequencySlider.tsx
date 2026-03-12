interface FrequencySliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export default function FrequencySlider({
  value,
  onChange,
  min = 100,
  max = 500,
  label,
  showValue = true,
}: FrequencySliderProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-white mb-3">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        {showValue && (
          <div className="text-right min-w-24">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {value} Hz
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
