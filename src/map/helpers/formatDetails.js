export const formatDetails = (data) => {
  const date = "Date: " + data["Date"];
  const location = "Location: " + data["Location"];
  const fatalities = "Fatalities: " + data["Fatalities"];
  const injuries = "Injuries: " + data["Injuries"];
  const br = "<br>";

  return date + br + location + br + fatalities + br + injuries;
};
