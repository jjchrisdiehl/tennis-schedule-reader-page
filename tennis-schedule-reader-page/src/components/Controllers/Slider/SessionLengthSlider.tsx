import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";
import { formatSessionLength } from "../../../util/helper-functions";
import "./Slider.scss";

interface SessionLengthSliderProps {
    min?: number; // Minimum value of the slider
    max?: number; // Maximum value of the slider
    step?: number; // Step size of the slider
    defaultValues?: number[]; // Default values for the slider
    sessionLength: number[];
    setSessionLength: (newHours: number[]) => void;
}

export const SessionLengthSlider: React.FC<SessionLengthSliderProps> = ({
    min = 0, // Default minimum value
    max = 100, // Default maximum value
    step = 1, // Default step size
    defaultValues = [6, 22], // Default range if none is provided
    sessionLength,
    setSessionLength,
}) => {

    // Ensure availableHours has a valid default state
    const sliderValues = sessionLength.length === 2 ? sessionLength : defaultValues;

    // Event handler for when the slider value changes
    const handleValueChange = (value: number[]) => {
        setSessionLength(value); // Passes array, not a function
    };

    return (
        <>
            <RadixSlider.Root
                className="Slider__Root"
                value={sessionLength} // Controlled value
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
            <div className={"Slider__Values"}>
                <span>
                    {formatSessionLength(sliderValues[0])}
                </span>
                <span>
                    {formatSessionLength(sliderValues[1])}
                </span>
            </div>
        </>
    );
};