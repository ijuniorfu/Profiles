/**
 * ^https?://[\s\S]*\.snssdk\.com/api/news/feed/v88/ url script-response-body https://raw.githubusercontent.com/ijuniorfu/Profiles/master/QuantumultX/Script/toutiao.js
 * ^https?://[\s\S]*\.snssdk\.com\/api\/feed\/thread_aggr\/ url script-response-body https://raw.githubusercontent.com/ijuniorfu/Profiles/master/QuantumultX/Script/toutiao.js
 * ^https?://[\s\S]*\.snssdk\.com\/2\/article\/slow_information\/ url reject
 * ^https?://[\s\S]*\.snssdk\.com\/video\/app\/article\/information\/ url script-response-body https://raw.githubusercontent.com/ijuniorfu/Profiles/master/QuantumultX/Script/toutiao.js
 */


const path1 = "/api/news/feed/"; //推荐
const path2 = "/api/feed/thread_aggr/"; //单个头条点进去后的列表
const path3 = "/video/app/article/information/"; //视频文章


try {
    if (typeof $response != "undefined") {
        if ($request.url.indexOf(path1) != -1) {
            feed();
        } else if ($request.url.indexOf(path2) != -1) {
            feed();
        } else if ($request.url.indexOf(path3) != -1) {
            video();
        } else {
            $done({});
        }
    }
} catch {
    $done({});
}



function feed() {
    var obj = JSON.parse($response.body);
    if (obj.data) {
        for (var i = obj.data.length - 1; i >= 0; i--) {
            if (typeof obj.data[i].content != 'undefined') {
                if (obj.data[i].content.indexOf("raw_ad_data") > 0) {
                    obj.data.splice(i, 1);
                }
            }
        }
    }
    $done({body: JSON.stringify(obj)});
}

function video() {
    var obj = JSON.parse($response.body);
    if (obj.data) {
        if (typeof obj.data.related_video_toutiao != 'undefined') {
            if (obj.data.related_video_toutiao.length>0) {
                for (var i = obj.data.related_video_toutiao.length - 1; i >= 0; i--) {
                    if (typeof obj.data.related_video_toutiao[i].ad_id != 'undefined') {
                        obj.data.related_video_toutiao.splice(i, 1);
                    }
                }
            }
        }
    }
    $done({body: JSON.stringify(obj)});
}


