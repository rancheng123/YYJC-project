import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';

//导入样式 start
import './invitations.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';



class ProclaimList extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that = this;
        //在此处初始化状态
        this.state={
            more:false,
            activityState:'block',
            dataText1:'',
            investInviteeCount:'',
            surplus:'',
            memberInviteActivityStatus:'',
            bannerUrl:'',
            inviteActivityTitle : "",
            yq_zp:'none',
            yq_zp_detail:''
        }

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/invite/getMemberInviteActivityDetail',
                method: 'post',
                data: {'memberId':Utils.Storage.get('user').memberId},
                callback: function(data){
                    if(data.resultCode == 0){
                        componentStore.update(that,{
                            dataText1:data.data.activeActivity.inviteActivityDesc,
                            bannerUrl:config.img+data.data.activeActivity.inviteActivityBannerPath,
                            investInviteeCount:data.data.memberInviteActivity.investInviteeCount,
                            surplus:data.data.activeActivity.limitInvestInviteeCount-data.data.memberInviteActivity.investInviteeCount,
                            memberInviteActivityStatus:data.data.memberInviteActivity.memberInviteActivityStatus,
                            inviteActivityTitle:data.data.activeActivity.inviteActivityTitle,
                            yq_zp_detail:data.data.memberGiftTitles
                        })

                    }

                },
                //自定义错误
                errorAlert: function(data){
                    if(data.resultCode == '104804'){
                        componentStore.update(that,{
                            bannerUrl:'',
                            activityState:'none'
                        })


                    }
                    //传递捕捉信号  给捕捉器
                    this.errorAlert.jail = true;
                }
            });
        })




    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        const shareConfig = {
            url: location.origin + '/inviteFriends?inviterCode='+ Utils.Storage.get('user').memberInviteCode,
            title: '送你一份钱夹加息大礼！', // 分享标题
            description: '创新高息短标，银行全程资金存管，风控严格审核，投资上钱夹！',
            pic: location.origin + '/h5Static/images/qianjiaLog-1.png', // 分享图片，使用逗号,隔开
            reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
        }

        mobShare.config( {

            debug: false, // 开启调试，将在浏览器的控制台输出调试信息

            appkey: '1eb2fb2bd5ea6', // appkey

            params: {
                url: shareConfig.url, // 分享链接
                title: shareConfig.title, // 分享标题
                description: shareConfig.description, // 分享内容
                pic: shareConfig.pic, // 分享图片，使用逗号,隔开
                reason:shareConfig.reason,//自定义评论内容，只应用与QQ,QZone与朋友网
            },
        } );
        var weibo = mobShare( 'weibo' );
        var qzone = mobShare( 'qzone' );

        // 然后通过用户事件触发分享（浏览器限制原因，打开新窗口必需通过用户事件触发）
        // 原生js的使用方法
        //alert('1');
        document.getElementById( 'share_weibo' ).onclick = function() {
            // console.log(1);
            weibo.send();
        }
        document.getElementById( 'share_qzone' ).onclick = function() {
            qzone.send();
        }
        Utils.requestData({
            url: config.api +"qj/front/v1/wap/shareData",
            method: 'post',
            data: {
                "url": "http://uat.qianjialicai.com/inviteFriends"
            },
            callback: function(data){
                if(data.resultCode == 0){
                    wx.config({
                        debug: false,
                        appId: data.data.wxShareAppId,
                        timestamp: data.data.wxShareTimeStamp,
                        nonceStr: data.data.wxShareNonceStr,
                        signature: data.data.wxShareSignature,
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareTimeline',
                            'hideMenuItems'
                        ]
                    });
                    wx.error(function(res){
                        // alert("errorMSG:"+res);
                    });
                    document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
                        WeixinJSBridge.on("menu:share:appmessage", function (argv) {
                            WeixinJSBridge.invoke("sendAppMessage", {
                                "img_url": shareConfig.pic,
                                "link": shareConfig.url,
                                "desc": shareConfig.description,
                                "title": shareConfig.title
                            }, function (res) {
                                alert(JSON.stringify(res))
                            });
                        });
                        WeixinJSBridge.on("menu:share:timeline", function (argv) {
                            WeixinJSBridge.invoke("shareTimeline", {
                                "img_url": shareConfig.pic,
                                "link": shareConfig.url,
                                "desc": shareConfig.description,
                                "title": shareConfig.title
                            }, function (res) {
                                alert(JSON.stringify(res))
                            });
                        });
                        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                        });
                    })
                }
            }
        });
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    //领取
    receive(){
        //alert('抱歉已抢光！');
    }
    //分享弹出
    alertShare(e){
        let el=document.getElementById('alertShare').nextElementSibling;
        el.style.display="block";
    }
    closeShare(){
        let el=document.getElementById('closeShare').parentNode;
        el.style.display="none";
    }
    //查看更多 more
    more(){
        this.setState({more:true});
        var eleWenan = document.getElementsByClassName('wenan');
        for(var i=0;i<eleWenan.length;i++){
            eleWenan[i].style.height = 'auto';
            eleWenan[i].style.whiteSpace = 'normal';
            eleWenan[i].style.textOverflow = 'initial';
        }

    }
    render(){
        let that = this;
        let mores = this.state.more;
        let btn_more= mores? '已经到底了' : '查看更多';
        let btn_State;
        if(this.state.memberInviteActivityStatus == 1){
            btn_State = <button className="button_fail">未完成</button>;
        }else if(this.state.memberInviteActivityStatus == 2){
            btn_State = <button className="button_ok" onClick={()=>{componentStore.update(that,{yq_zp:'block'})}}>查看赠品</button>;
        }else if(this.state.memberInviteActivityStatus == 3){
            btn_State = <button className="button_fail">待发货</button>;
        }else{
            btn_State = <button className="button_fail">已发放</button>;
        }
        //没有活动样式
        let noActivity = that.state.activityState=='none'?' noActivity' : '';
        //let noBannerUrl = that.state.activityState=='none'? require(that.state.bannerUrl): (that.state.bannerUrl);
        //let btn_open='-mob-share-open';
        return (

            <div className="Invitation_content">
                <Backbar $id="messageCenter" title="邀请好友" >
                    <div>
                        <div className="banner" style={{display:that.state.activityState}}>
                            <img src={that.state.bannerUrl} alt=""/>
                        </div>
                        <div className="banner" style={{display:that.state.activityState=='none'?'block':'none'}}>
                            <img src={require('../../../image/img/invitations_banner.jpg')} alt=""/>
                        </div>
                        <div className="progress" style={{display:that.state.activityState}}>
                            <ul>
                                <li>
                                    <div className="proList">
                                        <h4>已投资</h4>
                                        <div><strong>{this.state.investInviteeCount}</strong><span>人</span></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="proList">
                                        <h4>还差</h4>
                                        <div><strong>{this.state.surplus}</strong><span>人</span></div>
                                    </div>
                                </li>
                                <li>
                                    {btn_State}
                                </li>
                            </ul>
                        </div>
                        <div className={that.state.activityState=='block'?"Invitationperson" : "InvitationpersonA"}>
                            <div className="Invitation_text" style={{display:that.state.activityState}} >
                                加油！只差<span>{this.state.surplus}</span>就能领奖品了
                            </div>
                            {/*<div className={'-mob-share-ui-button -mob-share-open'+noActivity} id="alertShare" onClick={this.alertShare.bind(this)}>立即邀请</div>
                            <div className="-mob-share-ui">
                                <ul className="-mob-share-list">
                                    <li className="-mob-share-weibo" id="share_weibo"><p>新浪微博</p></li>
                                    <li className="-mob-share-qzone" id="share_qzone"><p>QQ空间</p></li>
                                </ul>
                                <div className="-mob-share-close" id="closeShare" onClick={this.closeShare.bind(this)}>取消</div>
                            </div>
                            <div className="-mob-share-ui-bg"></div>*/}
                            <div className={'-mob-share-ui-button -mob-share-open'+noActivity} id="alertShare" onClick={this.alertShare.bind(this)}>立即邀请</div>
                            <div className="-mob-share-ui" style={{display: 'none'}}>
                                <ul className="-mob-share-list">
                                    <li className="-mob-share-weibo" id="share_weibo"><p>新浪微博</p></li>
                                    <li className="-mob-share-qzone" id="share_qzone"><p>QQ空间</p></li>
                                    {/*<li className="-mob-share-qq"><p>QQ好友</p></li>
                                    <li className="-mob-share-douban"><p>豆瓣</p></li>
                                    <li className="-mob-share-facebook"><p>Facebook</p></li>
                                    <li className="-mob-share-twitter"><p>Twitter</p></li>*/}
                                </ul>
                                <div className="-mob-share-close" id="closeShare" onClick={this.closeShare.bind(this)}>取消</div>
                            </div>
                            <div className="-mob-share-ui-bg"></div>
                        </div>
                        <div className="bottom" style={{display:that.state.activityState}}>
                            <div className="activity_title">{this.state.inviteActivityTitle}</div>
                            <div className="activity_list">
                                <ul>
                                    {mores? <li><div></div><div className="wenan">{this.state.dataText1}</div></li> : <li><div></div><div className="wenan">{this.state.dataText1}</div></li>}
                                </ul>
                                <div className="more" onTouchEnd={this.more.bind(this)}>{btn_more}<span style={{display:mores?'none' : 'inline-block'}}><img src={require('../../../image/icon/icon_bottom.png')} alt=""/></span></div>
                                <div className="hb"><img src={require('../../../image/icon/bottm_icon_hb.png')} alt=""/></div>
                            </div>
                        </div>
                    </div>
                </Backbar>
                <div className="yq_motail" style={{display:that.state.yq_zp}}>
                    <div className="yq_motail"></div>
                    <div className="yq_zp">
                        <img src={require('../../../image/img/yq_zp.png')} alt=""/>
                        <div className="detailList">
                            <h5>恭喜获得以下赠品</h5>
                            <ul>
                                
                                {that.state.yq_zp_detail.split(',').map(function(item,i){
                                    return <li key={'list'+i}>{item}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="btn_close_yq" onClick={()=>{componentStore.update(that,{yq_zp:'none'})}}>
                        <img src={require('../../../image/img/btn_close_yq.png')} alt=""/>
                    </div>
                </div>
                
            </div>
        )
    }

}
export default ProclaimList;
