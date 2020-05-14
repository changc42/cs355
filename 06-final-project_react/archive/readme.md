#script1.py, htmlToText.js

application used to assume that gmail api only sent back html files. The code here
would have parsed the html file to only return text, which could be use for sentiment analysis.
However, later discovered gmail api returned text. Because of this, the code here is no longer needed.
Code is kept in case a new use case arises.

#index2.js

this is the unmodularized version of server/index.js. this was working. keep in case attempt at modularizing fails
later... modularization success. keep anyway

#sendResults.js

this was the function used to send plain html text to show user results. Function stopped being used when switch to React
