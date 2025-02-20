import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as RadixSlider from "@radix-ui/react-slider";
import { formatSessionLength } from "../../../util/helper-functions";
import "./Slider.scss";
export const SessionLengthSlider = ({ min = 0, // Default minimum value
max = 100, // Default maximum value
step = 1, // Default step size
defaultValues = [6, 22], // Default range if none is provided
sessionLength, setSessionLength, }) => {
    // Ensure availableHours has a valid default state
    const sliderValues = sessionLength?.length === 2 ? sessionLength : defaultValues;
    // Event handler for when the slider value changes
    const handleValueChange = (value) => {
        setSessionLength(value); // Passes array, not a function
    };
    return (_jsxs(_Fragment, { children: [_jsxs(RadixSlider.Root, { className: "Slider__Root", value: sessionLength, onValueChange: handleValueChange, min: min, max: max, step: step, minStepsBetweenThumbs: step, children: [_jsx(RadixSlider.Track, { className: "Slider__Track", children: _jsx(RadixSlider.Range, { className: "Slider__Range" }) }), sliderValues.map((_, index) => (_jsx(RadixSlider.Thumb, { className: "Slider__Thumb" }, index)))] }), _jsxs("div", { className: "Slider__Values", children: [_jsx("span", { children: formatSessionLength(sliderValues[0]) }), _jsx("span", { children: formatSessionLength(sliderValues[1]) })] })] }));
};
