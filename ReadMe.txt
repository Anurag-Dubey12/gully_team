How we used import here instead of require 
1. here we used esm module which provide this functionality.

this decoding is use in payment
 const decodedString = Buffer.from(token, "base64").toString("utf-8");
 const result = JSON.parse(decodedString);