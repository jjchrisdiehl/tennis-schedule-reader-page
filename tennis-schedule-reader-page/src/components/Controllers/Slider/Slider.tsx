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
    setAvailableHours: React.Dispatch<React.SetStateAction<number[]>>;
}

const Slider: React.FC<SliderProps> = ({
    min = 0, // Default minimum value
    max = 100, // Default maximum value
    step = 1, // Default step size
    is24HrTime,
    availableHours,
    setAvailableHours
}) => {


    // Event handler for when the slider value changes
    const handleValueChange = (value: number[]) => {
        setAvailableHours(value);
    };

    return (
        <>
            <div className={"Slider__Values"}>
                <span>
                    {formatTime(availableHours[0].toString(), is24HrTime)}
                </span>
                <span>
                    {formatTime(availableHours[1].toString(), is24HrTime)}
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
                {availableHours.map((_, index) => (
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