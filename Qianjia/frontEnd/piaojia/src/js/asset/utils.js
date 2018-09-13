import promise from 'es6-promise';
promise.polyfill();

import fetch from 'isomorphic-fetch';
import { browserHistory} from 'react-router';

class Utils{
    constructor(){

    }

    requestData(opts){
        var url = opts.url || null;
        var method = opts.method || 'post';
        var data = opts.data || {};
        var callback = opts.callback;


        if(method.toLowerCase() == 'get'){
            var arr = [];
            for(var key in data){
                var subStr = (key + '=' + data[key])
                arr.push(subStr)
            }

            var req = new Request(url+ '?' + arr.join('&'), {
                method: method,
                //不缓存响应的结果
                cache: 'reload'
            });
        }
        else if(method.toLowerCase() == 'post'){
            var req = new Request(url, {
                method: method,
                //不缓存响应的结果
                cache: 'reload',
                body: JSON.stringify(data)
            });
        }


        fetch(req)
            .then(response => response.json())
            .then(data => {
                callback && callback(data)
            })


    };

    //切换路由
    switchRoute(routeStr){
        //页面无刷新切换路由
        browserHistory.push(routeStr);
    }
};
window.Utils = new Utils();


