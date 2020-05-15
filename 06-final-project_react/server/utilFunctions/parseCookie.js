//assume header cookies contain one and only one cookie, and that cookie will have name and value separated by '='
module.exports = (cookieStr) => {
  let splitCookie = cookieStr.split("=");
  return { name: splitCookie[0], value: splitCookie[1] };
};
