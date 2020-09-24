/*
hostname = *.googlevideo.com
# > Youtube
^https://[\s\S]*\.googlevideo\.com/.*&(oad|ctier) url script-response-body https://raw.githubusercontent.com/Choler/Surge/master/Script/YouTube.js
*/

var data = {
    body: "{}",
    headers: {
        "Content-Type": "multipart/byteranges"
    }
};
$done({response: data});