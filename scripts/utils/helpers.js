export function getUnit(value) {
  if (value === "Calories") return "kcal";
  if (value === "Sodium" || value === "Cholesterol") return "mg";
  return "g";
}
