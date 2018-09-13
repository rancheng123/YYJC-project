/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar2/backbar2';

//导入样式 start
import './projectIntroduction.scss'
//导入样式 end

//投资赠品 弹窗
class AlertPresent extends Component{
    constructor() {
        super();
    }
    closeHandle(ev){
        this.props.closeHandle("none");
        ev.preventDefault();
    }
    render(){
        var costProductGiveList = this.props.costProductGiveList;
        return (
            <div className="alertPresent-wrap" style={{display:this.props.display}}>
                <div className="present-box">
                    <div className="present-list-box">
                        <ul className="present-list">
                        {
                            (()=>{
                                if(!costProductGiveList || costProductGiveList.length==0){
                                    return (
                                        <li>
                                            <i className="i-star"></i>
                                            <p>无任何礼物</p>
                                        </li>
                                    )
                                }else{
                                    return (
                                        costProductGiveList.map(function(item,index){
                                            return (
                                                <li key={index}>
                                                    <i className="i-star"></i>
                                                    <p>投资满<span className="s-red">{item.limitAmount}元</span>送“{item.pjRedPacketName}”</p>
                                                </li>
                                            )
                                        })
                                    )
                                }
                            })()

                        }
                    </ul>
                    </div>
                    <div className="present-close" onTouchEnd={(ev)=>{
                        this.closeHandle(ev);
                    }}>
                        <Icon type={require('../../../image/svg/close.svg')} size="lg" />
                    </div>
                </div>
            </div>
        )
    }
}

class ProjectIntroduction extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        let that = this;
        this.state = {
            alertDisplay : 'none',
            getProductDetailData : null,
            productId : Utils.Url.parseUrl(location.hash).params.productId,
            userInfo : Utils.Storage.get('user'),
            isRaise : 'false',   //如果true表示显示加息图标 如果为false表示不显示加息图标
            addYield : "0",
            isShowMore : false,  //是否显示更多  false 不显示  true 显示
            isInvestBtn : true  //是否可以点击立即投资

        }

        //在此处初始化状态

        

        //获取项目介绍
        Utils.requestData({
            url: config.api + 'qj/front/v1/product/getProductDetail',
            method: 'post',
            data:{
                "productId": that.state.productId
            },
            callback: function(data){
                console.log('getProductDetail:',data);
                if(data.resultCode==0){
                    componentStore.update(that,{
                        getProductDetailData : data.data
                    });
                    setTimeout(function(){
                        that.loading();
                    },300);

                }
            }
        });

        //获取加息
        if(that.state.userInfo){
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getAddYield',
                method: 'post',
                data:{
                    "memberId": that.state.userInfo.memberId
                },
                callback: function(data){

                    if(data.resultCode==0){
                        if(data.data.addYieldFlag=="true"){
                            componentStore.update(that,{
                                isRaise : true,
                                addYield : data.data.addYield
                            });
                        }else if(data.data.addYieldFlag=="false"){
                            componentStore.update(that,{
                                isRaise : false,
                                addYield : data.data.addYield
                            });
                        }
                    }

                }
            });
        }


    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        //document.getElementById('b-content').style.height = document.documentElement.clientHeight - document.getElementById('b-head').offsetHeight + 'px';
        //this.loading();
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    closeHandle(value){
        componentStore.update(this,{
            alertDisplay : value
        });
    }

    loading(){  //上拉加载更多
        var that = this;
        var defaults={
           container:'',
           next:function(){}
        }
        var start,
               end,
               length,
               isLock = false,//是否锁定整个操作
               isCanDo = false,//是否移动滑块
               isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
               hasTouch = 'ontouchstart' in window && !isTouchPad;
        var obj = document.getElementById("project-main");
        var loading=document.getElementById('loaderBar');    //loading的高度
        // var showInClient = loading.offsetTop+document.getElementById('b-fixed').offsetHeight-document.documentElement.clientHeight;


        var offset=loading.offsetHeight;    //下拉加载框的高度

        var totalH = obj.parentNode.offsetHeight+obj.offsetTop;
        var maxScrollY = totalH-document.documentElement.clientHeight;


        /*操作方法*/
        var fn =
        {
           //移动容器
           translate: function (diff) {
               obj.style.webkitTransform='translate3d(0,'+diff+'px,0)';
               obj.style.transform='translate3d(0,'+diff+'px,0)';
           },
           //设置效果时间
           setTransition: function (time) {
               obj.style.webkitTransition='all '+time+'s';
               obj.style.transition='all '+time+'s';
           },
           //返回到初始位置
           back: function () {
               fn.translate(0);
               //标识操作完成
               isLock = false;
           },
           addEvent:function(element,event_name,event_fn){
               if (element.addEventListener) {
                   element.addEventListener(event_name, event_fn, false);
               } else if (element.attachEvent) {
                   element.attachEvent('on' + event_name, event_fn);
               } else {
                   element['on' + event_name] = event_fn;
               }
           }
        };

        fn.translate(0);
        fn.addEvent(obj,'touchstart',start);
        fn.addEvent(obj,'touchmove',move);
        fn.addEvent(obj,'touchend',end);
        // fn.addEvent(obj,'mousedown',start)
        // fn.addEvent(obj,'mousemove',move)
        // fn.addEvent(obj,'mouseup',end)

        //滑动开始
        function start(e) {

           if (totalH >= maxScrollY && !isLock) {
               var even = typeof event == "undefined" ? e : event;
               //标识操作进行中
               isLock = true;
               isCanDo = true;
               //保存当前鼠标Y坐标
               start = hasTouch ? even.touches[0].pageY : even.pageY;
               //消除滑块动画时间
               fn.setTransition(0);

           }
           return false;
        }

        //滑动中
        function move(e) {

           //if (totalH >= maxScrollY && isCanDo && document.body.scrollTop>showInClient) {
           if (totalH >= maxScrollY && isCanDo) {
               var even = typeof event == "undefined" ? e : event;
               //保存当前鼠标Y坐标
               end = hasTouch ? even.touches[0].pageY : even.pageY;

               if (start > end) {

                   even.preventDefault();
                   //消除滑块动画时间
                   fn.setTransition(0);
                   //移动滑块

                   if((end-start-offset)/2<=maxScrollY) {
                       length=(end - start - offset) / 2;
                       fn.translate(length);
                   }
                   else {
                       length+=0.3;
                       fn.translate(length);
                   }

               }
           }
        }
        //滑动结束
        function end(e) {

           if (isCanDo) {
               isCanDo = false;
               //判断滑动距离是否大于等于指定值

               if (start - end >= offset) {

                   //设置滑块回弹时间
                   fn.setTransition(1);
                   //保留提示部分
                   fn.translate(0);
                   //执行回调函数

                   componentStore.update(that,{
                       isShowMore : true
                   });
                //    if (typeof option.next == "function") {
                //        option.next.call(fn, e);
                //    }
               } else {
                   //返回初始状态
                   fn.back();
               }
           }
        }
    }
    
    //判断是否超过募集时间 false超过 true没有超过募集时间
    isOverTime(pTime){
        var that = this;
       
        var oldTime = new Date();

        var YMD = pTime.split(" ")[0].split("-");
        var HMS = pTime.split(" ")[1].split(":");
       
        oldTime.setFullYear(YMD[0]);
        oldTime.setMonth(YMD[1]-1);
        oldTime.setDate(YMD[2]);

        oldTime.setHours(HMS[0]);
        oldTime.setMinutes(HMS[1]);
        oldTime.setSeconds(HMS[2]);

        var oldGetTime = oldTime.getTime();

        var currentTime = new Date();
        var currentGetTime = currentTime.getTime();
        
        if(currentGetTime-oldGetTime<0){
     
            return true;

        }else{
    
            return false;
        }

    }
    render(){
        var that = this;

        let getProductDetailData = that.state.getProductDetailData;

        /* 此处代码判断是否从重置密码页回来的 即 投资页-->充值页-->重置密码 start */
        let backbarBackUrl = "";
        let arrowLocationHref = Utils.Url.parseUrl(location.href);
        let arrowBackUrl = arrowLocationHref.params.backUrl;
        if(arrowBackUrl&&arrowBackUrl=="resetPaymentPasswordOk"){ //从充值密码回来
            backbarBackUrl = '/home';
        }
        /* 此处代码判断是否从重置密码页回来的 即 投资页-->充值页-->重置密码 end */

        return (
            <div>
                <Backbar
                    $id="projectIntroduction"
                    backUrl = {backbarBackUrl}
                >
                    项目介绍
                </Backbar>
                {
                    (()=>{
                        if(!getProductDetailData){
                            return (
                                <div></div>
                            )
                        }else{

                            let costProduct = getProductDetailData.costProduct;
                            return (
                                <div className="project-wrap">

                                    <div className="project-box" id="project-main">
                                        <div style={{display:that.state.userInfo?'none':'block'}}>
                                            <a href="javascript:;" className="new-ad-zhuce" onClick={()=>{
                                                Utils.switchRoute('/regist');
                                            }}>
                                                <img src={config.img+getProductDetailData.qjInviteAddYieldImg} />
                                            </a>
                                        </div>
                                        <div className="p-detail">
                                            <h3 className="d-title">{that.state.userInfo?costProduct.projectTitle:''}</h3>
                                            <h4 className="d-money">
                                                <span>
                                                    {costProduct.financingAnnualYield}
                                                    <i className="m-raise" style={{display:that.state.isRaise==true?"inline-block":"none"}}>+1</i>
                                                </span>

                                            </h4>
                                            <p className="d-text">预期年化回报率(%)</p>
                                            <div className="d-progress">
                                                <p className="p-text">{costProduct.financingProgress}%</p>
                                                <div className="p-line">
                                                    <i style={{width:costProduct.financingProgress+'%'}}></i>
                                                </div>
                                            </div>
                                            <ul className="d-list">
                                                <li>
                                                    <h3>{costProduct.projectPeriodMonth}</h3>
                                                    <p>项目期限(天)</p>
                                                </li>
                                                <li>
                                                    <h3>{ Utils.getFloatNum( costProduct.projectAmount-costProduct.financingAmount , 2 )}</h3>
                                                    <p>可投金额(元)</p>
                                                </li>
                                                <li>
                                                    <h3>{costProduct.projectAmount>10000?costProduct.projectAmount/10000:costProduct.projectAmount}</h3>
                                                    <p>融资金额({costProduct.projectAmount>10000?'万元':'元'})</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="p-info">

                                            {
                                                (()=>{
                                                    if(getProductDetailData.costProductGiveList.length!=0){
                                                        return (
                                                            <div className="i-item first-child">
                                                                <h3 className="i-title">
                                                                    <div className="i-icon i-icon1"></div>
                                                                    投资赠

                                                                </h3>
                                                                <span className="i-search" onTouchEnd={()=>{
                                                                    componentStore.update(this,{
                                                                        alertDisplay : 'block'
                                                                    })
                                                                }}></span>
                                                                <p className="i-tip">
                                                                    投资满<span className="s-red">{getProductDetailData.costProductGiveList[0].limitAmount}元</span>送“{getProductDetailData.costProductGiveList[0].pjRedPacketName}”
                                                                </p>

                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }

                                            <div className="i-item">
                                                <h3 className="i-title">
                                                    <div className="i-icon i-icon2"></div>
                                                    最高限投{costProduct.productMaxAmount}元

                                                </h3>
                                                <a href="javascript:;" className="i-tip" onClick={()=>{
                                                    Utils.switchRoute("/investRecord?productId="+that.state.productId);
                                                }}>
                                                    已投资{costProduct.productInvestorCount}笔
                                                </a>
                                            </div>
                                            <div className="i-item">
                                                <h3 className="i-title">
                                                    <div className="i-icon i-icon3"></div>
                                                    募集结束时间
                                                </h3>
                                                <span className="i-tip">{costProduct.projectEndDateStr?costProduct.projectEndDateStr:""}</span>
                                            </div>
                                        </div>
                                        <div className="p-explain">
                                            <ul className="e-list">
                                                <li>
                                                    <a href="javascript:;" onClick={()=>{
                                                        Utils.switchRoute("/projectDetail?projectId="+costProduct.investProjectId);
                                                    }}>
                                                        <i className="l-icon l-icon1"></i>
                                                        <p className="l-text">项目详情</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" onClick={()=>{
                                                        Utils.switchRoute("/riskManage?projectId="+costProduct.investProjectId+"&productId="+that.state.productId);
                                                    }}>
                                                        <i className="l-icon l-icon2"></i>
                                                        <p className="l-text">风控管理</p>
                                                    </a>
                                                </li>
                                                {/* <li>
                                                    <a href="javascript:;" onClick={()=>{
                                                        Utils.switchRoute("/repaymentSchedule?projectId="+costProduct.investProjectId);
                                                    }}>
                                                        <i className="l-icon l-icon3"></i>
                                                        <p className="l-text">还款计划</p>
                                                    </a>
                                                </li> */}
                                                <li>
                                                    <a href="javascript:;" onClick={()=>{
                                                            window.location.href="/h5Static/viewDeal.html";
                                                        }}>
                                                        <i className="l-icon l-icon4"></i>
                                                        <p className="l-text">协议范本</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="p-more-box" style={{display:that.state.isShowMore==true?'block':'none'}}>
                                            <div className="m-product">
                                                <h3>{costProduct.productTitle}</h3>
                                                <p>{costProduct.productDesc1}</p>
                                                <p>{costProduct.productDesc2}</p>
                                                <p>{costProduct.productDesc3}</p>
                                            </div>
                                            <div className="m-pt-box">
                                                <i className="pt-line"></i>
                                                <span className="pt-title">{costProduct.merchantName}</span>
                                            </div>
                                            <ul className="m-list">
                                                <li>
                                                    <img src={config.img+costProduct.merchantDescUrl} className="l-img" />
                                                </li>
                                                {
                                                    (()=>{
                                                        var imgArr = getProductDetailData.costProductIntrList;
                                                        if(imgArr&&imgArr.length!=0){
                                                            return imgArr.map(function(imgArrItem,index){
                                                                if(imgArrItem.productIntrUrl){
                                                                    return (
                                                                        <li key={index}>
                                                                            <img src={config.img+imgArrItem.productIntrUrl} className="l-img" />
                                                                        </li>
                                                                    )
                                                                }
                                                            })

                                                        }
                                                    })()
                                                }
                                            </ul>

                                        </div>

                                        <div className="p-loader" id="loaderBar" style={{display:that.state.isShowMore==true?'none':'block'}}>
                                            <div className="l-icon">
                                                <Icon type={require('../../../image/svg/upper.svg')} size="xxs" />
                                            </div>
                                            <span className="l-text">向上滑动 查看更多</span>
                                        </div>

                                    </div>

                                    {
                                        (function(){
                                            {/*
                                             0预发布
                                             1融资中
                                             3还款中
                                             4还款完成
                                             */}
                                            var overTime = that.isOverTime(costProduct.projectEndDateStr);
                                            // var overTime = that.isOverTime("2017-11-20 17:11:00");

                                            if (costProduct.projectProgressStatus == 0) {
                                                //即将开启
                                                return(
                                                    <div id="b-fixed" className="b-text b-fixed b-disabled">
                                                        预发布
                                                    </div>
                                                )
                                            }else if (costProduct.projectProgressStatus == 3) {
                                                //还款中
                                                return(
                                                    <div id="b-fixed" className="b-text b-fixed b-disabled">
                                                        还款中
                                                    </div>
                                                )
                                            }else if (costProduct.projectProgressStatus == 4) {
                                                //还款完成
                                                return(
                                                    <div id="b-fixed" className="b-text b-fixed b-disabled">
                                                        还款完成
                                                    </div>
                                                )

                                            }else if (costProduct.projectProgressStatus == 10) {
                                                //投资项目已结束
                                                return(
                                                    <div id="b-fixed" className="b-text b-fixed b-disabled">
                                                        投资项目已结束
                                                    </div>
                                                )

                                            }else if(!overTime){
                                                // 超过募集结束时间
                                                return(
                                                    <div id="b-fixed" className="b-text b-fixed b-disabled">
                                                        投资项目已结束
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div
                                                        id="b-fixed"
                                                        className="b-text b-fixed"
                                                        onTouchEnd={()=>{
                                                          
                                                            if(that.state.isInvestBtn){
                                                                
                                                                componentStore.update(that,{
                                                                    isInvestBtn : false
                                                                });
                                                                Utils.tokenExpireJumpToLogin(function () {
                                                                    
                                                                    Utils.requestData({
                                                                        url: config.api + 'qj/front/v1/user/getUserInfo',
                                                                        method: 'post',
                                                                        data:{

                                                                        },
                                                                        callback: function(data){

                                                                            console.log( "getUserInfo",data );

                                                                            componentStore.update(that,{
                                                                                isInvestBtn : true
                                                                            });
                                                                            if(data.resultCode==0){

                                                                                var userInfo = data.data;

                                                                                componentStore.update(that,{
                                                                                    userInfo : userInfo
                                                                                });

                                                                                if(userInfo){
                                                                                    
                                                                                    if(userInfo.isTrueMan==0){   //没有开户
                    
                                                                                        Utils.switchRoute('/receivables');
                    
                                                                                    }else if(userInfo.isTrueMan==1){  //已开户

                                                                                        if( userInfo.isTrueBankCard==0 ){   //未绑卡

                                                                                            Utils.switchRoute('/bankBingding');

                                                                                        }else if( userInfo.isTrueBankCard==1 ){  //已绑卡

                                                                                            Utils.switchRoute("/investmentConfirmation?productId="+that.state.productId+'&addYield='+that.state.addYield+'&investProjectId='+costProduct.investProjectId);
                                                                                        
                                                                                        }
                    
                                                                                        
                                                                                    }
                    
                    
                                                                                }else{
                                                                                    Utils.switchRoute("/login");
                                                                                }

                                                                            }
                                                                        }
                                                                    });

                                                                })
                                                            }
                                                        }}
                                                    >
                                                        立即投资
                                                    </div>
                                                )
                                            }
                                        })()
                                    }


                                </div>
                            )
                        }
                    })()
                }
                {
                    (()=>{
                        if(!getProductDetailData){
                            return (
                                <div></div>
                            )
                        }else{
                            return (
                                <AlertPresent display={this.state.alertDisplay} closeHandle={this.closeHandle.bind(this)} costProductGiveList={getProductDetailData.costProductGiveList} />
                            )
                        }
                    })()
                }

            </div>

        )
    }

}

export default ProjectIntroduction;
