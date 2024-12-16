export function formatDate(dateString: string): string {
    console.log("Date string: ", dateString);

    // Parse the date
    const year: number = parseInt(dateString.slice(0, 4), 10);
    const month: number = parseInt(dateString.slice(4, 6), 10) - 1; // Months are zero-indexed in JavaScript
    const day: number = parseInt(dateString.slice(6, 8), 10);

    const date: Date = new Date(year, month, day);

    // Helper function to get the day suffix
    function getDaySuffix(day: number): string {
        if (day >= 11 && day <= 13) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    // Format the date
    const dayName: string = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthName: string = date.toLocaleDateString("en-US", { month: "long" });
    const dayWithSuffix: string = `${day}${getDaySuffix(day)}`;
    const yearFull: number = date.getFullYear();

    const formattedDate: string = `${dayName}, ${monthName} ${dayWithSuffix}, ${yearFull}`;
    console.log("Result: ", formattedDate);

    return formattedDate;
}

export function formatTime(
    timeString: string,
    twentyFourHour: boolean = false
): string {
    // Convert the input to a number
    const time: number = parseFloat(timeString);

    // Calculate hours and minutes
    const hours: number = Math.floor(time);
    const minutes: number = (time % 1) * 60;

    if (twentyFourHour) {
        // Return time in 24-hour format
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
    } else {
        // Determine AM/PM and adjust hours
        const period: string = hours >= 12 ? "pm" : "am";
        const adjustedHours: number = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${adjustedHours}:${minutes
            .toString()
            .padStart(2, "0")}${period}`;
    }
}

export function formatAvailableTime(available_time: string): string {
    const time = parseFloat(available_time);

    if (isNaN(time)) {
        throw new Error("Invalid available_time format. Must be a valid number string.");
    }

    const hours = Math.floor(time); // Extract the whole number part (hours)
    const minutes = (time % 1) * 60; // Calculate minutes (decimal part)

    let result = "";

    if (hours > 1) {
        result += `${hours} hours`;
    } else if (hours === 1) {
        result += "1 hour";
    }

    if (minutes > 0) {
        result += hours > 0 ? ` and ${minutes} minutes` : `${minutes} minutes`;
    }

    return result.trim();
}
