interface FrequencySliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  onMouseUp?: () => void;
}

export default function FrequencySlider({
  value,
  onChange,
  min = 100,
  max = 2000,
  step = 1,
  label,
  showValue = true,
  onMouseUp,
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
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseUp={onMouseUp}
          onTouchEnd={onMouseUp}
          className="flex-1 h-2 bg-gradient-to-r from-primary to-accent rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        {showValue && (
          <div className="text-right min-w-24">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">
              {value} Hz
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
