import constants from "../common/constants";
import { countries } from "../common/data";
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

  countryToFlag(params) {
    const country = params.toLowerCase();
    for (let code in countries) {
      if (countries[code] === country) {
        return `https://flagcdn.com/h60/${code}.png`;
      }
    }
    return constants.ENUMS.ASSETS.ICONS.NO_FLAG;
  }

  timeAgo(timestamp) {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      if (minutes === 0) return "a few seconds ago";
      return minutes + " minutes ago";
    } else if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return hours + " hours ago";
    } else {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return days + " days ago";
    }
  }
}

export default new Utility();
