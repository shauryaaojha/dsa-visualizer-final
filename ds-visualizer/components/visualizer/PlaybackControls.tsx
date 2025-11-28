import { Button } from '../ui/Button';

interface PlaybackControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    onReset: () => void;
    speed: number;
    onSpeedChange: (val: number) => void;
    currentStep: number;
    totalSteps: number;
}

export function PlaybackControls({
    isPlaying,
    onPlayPause,
    onNext,
    onPrev,
    onReset,
    speed,
    onSpeedChange,
    currentStep,
    totalSteps,
}: PlaybackControlsProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={onReset}>Reset</Button>
                <Button variant="outline" size="sm" onClick={onPrev} disabled={currentStep <= 0}>Prev</Button>
                <Button onClick={onPlayPause} size="sm" className="w-20">
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button variant="outline" size="sm" onClick={onNext} disabled={currentStep >= totalSteps - 1}>Next</Button>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="text-sm font-medium text-gray-600 whitespace-nowrap">
                    Step {currentStep + 1} / {totalSteps || 0}
                </div>

                <div className="flex items-center gap-2 flex-1 md:flex-none">
                    <span className="text-xs text-gray-500">Speed</span>
                    <input
                        type="range"
                        min="0.25"
                        max="3"
                        step="0.25"
                        value={speed}
                        onChange={(e) => onSpeedChange(Number(e.target.value))}
                        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 w-8">{speed}x</span>
                </div>
            </div>
        </div>
    );
}
