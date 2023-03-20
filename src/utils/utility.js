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
}

export default new Utility();
