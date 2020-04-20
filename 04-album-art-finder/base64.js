function toBase64(credentials) {
  const client_id = credentials.client_id;
  const client_secret = credentials.client_secret;
  let base64data = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );
  return base64data;
}

module.exports = toBase64;
