class Utility {
  urlParamsToObject(params) {
    const urlParams = new URLSearchParams(params);
    const queryParams = Object.fromEntries(urlParams.entries());
    return queryParams;
  }
}

export default new Utility();
