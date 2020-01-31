/*
toutiao remove ads
[rewrite_local]
^https?://.*\.snssdk.com/api/news/feed/ url script-response-body jrtt.js
[mitm]
hostname = *.snssdk.com
 */

var body = $response.body;
var obj = JSON.parse(body);

var dt = obj.data;
var filterData = filterContents(dt);
obj.data = filterData;
body = JSON.stringify(obj);
$done({body});


function filterContents(data) {
    if (!data || data.length <= 0) {
        return data;
    }
    var filterData = [];
    let len = data.length;
    for (var i=0;i<len;i++) {
        let one = data[i];
        let contentObj = JSON.parse(one.content);
        if (typeof contentObj.raw_ad_data != 'undefined') {
            continue;
        }
        if ((typeof contentObj.label != 'undefined') && (contentObj.label == '广告')) {
            continue;
        }
        filterData.push(data[i]);
    }
    return filterData;
}