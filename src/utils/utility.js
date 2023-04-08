import moment from "moment/moment";
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
    return moment(timestamp).fromNow();
  }
}

export default new Utility();
