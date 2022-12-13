export const formatDetails = (data) => {
  const date = "Date: " + data["Date"];
  const location = "Location: " + data["Location"];
  const type = "Type: " + data["Type"];
  const total = "Total Victims: " + data["Total Victims"];
  const br = "<br>";

  return type + br + date + br + location + br + total;
};
