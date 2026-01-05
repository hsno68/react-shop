export function formatCategory(category) {
  return category
    .split("-")
    .map((string) => {
      let resultString = string[0].toUpperCase() + string.slice(1);
      if (resultString.endsWith("ens")) {
        resultString = `${resultString.substring(0, resultString.length - 1)}'s`;
      }
      return resultString;
    })
    .join(" ");
}
