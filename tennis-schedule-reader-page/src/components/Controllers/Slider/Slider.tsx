import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";
import { formatTime } from "../../../util/helper-functions";
import "./Slider.scss";

interface SliderProps {
    min?: number; // Minimum value of the slider
    max?: number; // Maximum value of the slider
    step?: number; // Step size of the slider
    defaultValues?: number[]; // Default values for the slider
    is24HrTime?: boolean;
    availableHours: number[];
    setAvailableHours: (newHours: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({
    min = 0, // Default minimum value
    max = 100, // Default maximum value
    step = 1, // Default step size
    defaultValues = [6, 22], // Default range if none is provided
    is24HrTime,
    availableHours,
    setAvailableHours
}) => {

    // Ensure availableHours has a valid default state
    const sliderValues = availableHours.length === 2 ? availableHours : defaultValues;

    // Event handler for when the slider value changes
    const handleValueChange = (value: number[]) => {
        setAvailableHours(value); // Passes array, not a function
    };

    return (
        <>
            <div className={"Slider__Values"}>
                <span>
                    {formatTime(sliderValues[0].toString(), is24HrTime)}
                </span>
                <span>
                    {formatTime(sliderValues[1].toString(), is24HrTime)}
                </span>
            </div>

            <RadixSlider.Root
                className="Slider__Root"
                value={availableHours} // Controlled value
                onValueChange={handleValueChange} // Update state on change
                min={min} // Use min from props
                max={max} // Use max from props
                step={step} // Use step from props
                minStepsBetweenThumbs={step}
            >
                <RadixSlider.Track className="Slider__Track">
                    <RadixSlider.Range className="Slider__Range" />
                </RadixSlider.Track>
                {sliderValues.map((_, index) => (
                    <RadixSlider.Thumb
                        key={index}
                        className="Slider__Thumb"
                    />
                ))}
            </RadixSlider.Root>
        </>
    );
};

export default Slider;