var onlineConfig = {
    origin: 'https://a.qianjialicai.com',

    api: 'https://a.qianjialicai.com/',
    img: 'https://a.qianjialicai.com'
};
var devConfig = {
    api: 'http://192.168.0.44:8084/',
    img: 'http://192.168.0.44:8084'
}


var config = {
    debug: {
        event: /event=true/,
        trace: /trace=true/,
        mobile: /mobile=true/,
        interface: /interface=true/
    },

    //接口地址
    api:  location.origin == onlineConfig.origin ? onlineConfig.api: devConfig.api ,
    //图片地址
    img : location.origin == onlineConfig.origin ? onlineConfig.img: devConfig.img,


    //哔咯红包图片
    kaifa_bghongbao : 'http://192.168.0.44:8080/'

};
window.config = config;
window.isInterface = location.href.match(config.debug.interface);
