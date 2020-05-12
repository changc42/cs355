//the reduced message contains the original message content. sometimes, this is very long. This function returns an object without the long content
module.exports = (reducedMsg) => {
  let { id, labelIds, snippet, headers, sentAnalysis } = reducedMsg;
  return { id, labelIds, snippet, headers, sentAnalysis };
};
