import moment from "moment/moment";
import { countries, categoryDescriptions } from "../common/data";

class Utility {
  urlParamsToObject(params) {
    const urlParams = new URLSearchParams(params);
    const queryParams = Object.fromEntries(urlParams.entries());
    return queryParams;
  }

  timeStampToDate(params) {
    if (!params) throw new Error("Missing timestamp string");

    const dateString = params;
    const date = new Date(dateString);

    if (isNaN(date.getTime())) throw new Error("Invalid timestamp string");

    const options = {
      timeZone: "Asia/Kolkata",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-IN", options);
    return formattedDate;
  }

  timeAgo(timestamp) {
    return moment(timestamp).fromNow();
  }

  getGreet() {
    const timeNow = new Date().getHours();
    const greeting =
      timeNow >= 5 && timeNow < 12
        ? "Good Morning "
        : timeNow >= 12 && timeNow < 18
        ? "Good Afternoon "
        : "Good evening ";
    return greeting;
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  toCategoryCase(str) {
    return str
      ? str
          .split("-")
          .map((word) => word.toUpperCase())
          .join(" & ")
      : "ALL CATEGORIES";
  }

  catToDesc(str) {
    return str ? categoryDescriptions[str] : categoryDescriptions["all"];
  }

  countryToCode(country) {
    const code = Object.keys(countries).find(
      (key) => countries[key] === country
    );

    return this.toTitleCase(code);
  }

  codeToCountry(code) {
    const country = countries[code];
    return country;
  }
}

export default new Utility();
