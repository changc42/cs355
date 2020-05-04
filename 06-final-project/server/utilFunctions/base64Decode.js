module.exports = (s) => {
  return Buffer.from(s, "base64").toString("ascii");
};
