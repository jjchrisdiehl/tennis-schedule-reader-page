export function formatDate(dateString) {
  console.log("Date string: ", dateString);
  // Parse the date
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6) - 1; // Months are zero-indexed in JavaScript
  const day = dateString.slice(6, 8);

  const date = new Date(year, month, day);

  // Helper function to get the day suffix
  function getDaySuffix(day) {
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
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  const yearFull = date.getFullYear();
  console.log(
    "Result: ",
    `${dayName}, ${monthName} ${dayWithSuffix}, ${yearFull}`
  );
  return `${dayName}, ${monthName} ${dayWithSuffix}, ${yearFull}`;
}
