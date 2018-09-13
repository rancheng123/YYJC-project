/**
 * Created by 唐丹 on 2017/5/12.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Toast,Modal } from 'antd-mobile';

import TitleBar from '../../module/titleBar/titleBar';
import NavBar from '../../module/navBar/navBar';
import Alert from '../../module/alert/alert';
import City from '../../module/city/city'

//导入样式 start
import './my.scss'
//导入样式 end

class Book extends Component{   //问号 说明
    constructor(){
        super();
    }

    introduceHandle(){
        this.props.introduceHandle("none"); //回掉函数
    }

    render(){
        return (
            <div className="my-book-box" style={{display:this.props.introduceDisplay}}>
                <div className="b-main">
                    <div className="b-close" onTouchEnd={()=>{
                        this.introduceHandle();
                    }}>
                        <i></i>
                    </div>
                    <img src={require('../../../image/img/book.png')} />
                    <div className="b-content">
                        <dl className="b-item">
                            <dt>
                                <i></i>
                                <span>预期总资产</span>
                            </dt>
                            <dd>指您的在投本金、预期收益和 可用余额的总和</dd>
                        </dl>
                        <dl className="b-item">
                            <dt>
                                <i></i>
                                <span>在投本金</span>
                            </dt>
                            <dd>指您已投资且未还款的待还本 金金额</dd>
                        </dl>
                        <dl className="b-item">
                            <dt>
                                <i></i>
                                <span>预期收益</span>
                            </dt>
                            <dd>指您已投资且未还款的全部收 益金额</dd>
                        </dl>
                        <dl className="b-item">
                            <dt>
                                <i></i>
                                <span>累计收益</span>
                            </dt>
                            <dd>指您已投资且已还款的全部收 益金额</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}

class My extends Component{
    constructor(){
        super();

        //清楚我的投资列表中的sessionStorage数据
        sessionStorage.removeItem("myInvest_currentPage");
        sessionStorage.removeItem("myInvest_type");
        sessionStorage.removeItem("myInvest_scrollTop");

    }
    componentWillMount(){

        let that = this;
        //判断是否登录
        let userInfo = Utils.Storage.get('user');

        //在此处初始化状态
        this.state = {
            isRenderMy : false,  //判断是否开始渲染页面
            initData : {
                saveDataMoney : "",
                saveData : []
            },
            introduceDisplay : 'none',
            alertDisplay : 'block',
            userInfo : userInfo,    //获取缓存中的用户信息
       
            isHasWSYCoupon : false,  //判断是否有未使用的优惠券 ，true 有 ， false 没有
            getInitMoney : {    //首页初始化资产数据
                
                totalAmount: 0,   //预期总资产
                preBalanceAmount:0,  // 待还本金
                totalInterestAmount: 0,  // 累计收益
                preInterestAmount: 0,   // 预期收益
                okConsume : 0   //可消费本金

            },
            unReadCount : 0, //用户未读取消息条数
            rankStr : "", //风险评测
            inviteActivityImgUrl : "",   //邀请好友图片

            //判断 提现、充值、我的银行卡、自动投标 是否可点击 true 为可点击， false 为不可点击
            isTixianClick : true,
            isChongzhiClick : true,
            isBankDetailClick : true,
            isAutoBidClick : true
            
        }



        Utils.tokenExpireJumpToLogin(function () {

            // 获取用户信息
            that.getUserInfo();

            //获取可消费本金余额
            Utils.requestData({
                url: config.api +"qj/front/v1/principalConsume/getOkConsume",
                method: 'post',
                data: {

                },
                callback: function(data){
                    console.log('getOkConsume:',data);
                    if(data.resultCode=="0"){

                        that.state.getInitMoney.okConsume = data.data.okConsume;
                        componentStore.update(that,{
                            getInitMoney : that.state.getInitMoney
                        })

                    }
                    
                }
            });

            //查询 预期总资产、在投本金、预期总收益、累计收益
            Utils.requestData({
                url: config.api +"qj/front/v1/account/getInvestStatisticsData",
                method: 'post',
                data: {

                },
                callback: function(data){
                    //查询 预期总资产、在投本金、预期总收益、累计收益
                    var statistics = data;
                    console.log("getInvestStatisticsData",data);
                    if(statistics.resultCode==0){
                        if(statistics.data){
                            //预期收益
                            that.state.getInitMoney.preInterestAmount = statistics.data.preInterestAmount;
                            //累计收益
                            that.state.getInitMoney.totalInterestAmount = statistics.data.totalInterestAmount;
                            //待还本金
                            that.state.getInitMoney.preBalanceAmount = statistics.data.preBalanceAmount;
                            //预期总资产
                            that.state.getInitMoney.totalAmount = statistics.data.totalAmount;

                            componentStore.update(that,{
                                getInitMoney : that.state.getInitMoney
                            })
                        }
                    }
                }
            });

            //获取优惠券接口
            Utils.requestData({
                url: config.api +"qj/front/v1/user/getDiscountCouponList",
                method: 'post',
                data: {
                    discountCouponfilterType : 1
                },
                callback: function(data){
                    //优惠券
                    var coupon = data;

                    if(coupon.resultCode==0){
                        if(coupon.data.length==0){
                            componentStore.update(that,{
                                isHasWSYCoupon : false
                            })
                        }else{
                            componentStore.update(that,{
                                isHasWSYCoupon : true
                            })
                        }
                    }
                }
            });
            //获取用户未读取消息条数接口
            Utils.requestData({
                url: config.api +"qj/front/v1/membermessage/getMemberMessageUnReadCount",
                method: 'post',
                data: {

                },
                callback: function(data){
                    var unReadCount = data;

                    if(unReadCount.resultCode==0){
                        if(unReadCount.data.unReadCount){
                            componentStore.update(that,{
                                unReadCount : unReadCount.data.unReadCount
                            })
                        }
                    }
                }
            });
            //风险评测
            Utils.requestData({
                url: config.api +"qj/front/v1/my/getRiskTestInfo",
                method: 'post',
                data: {

                },
                callback: function(data){
                    var getRiskTestInfo = data;

                    if(getRiskTestInfo.resultCode==0){
                        if(getRiskTestInfo.data.rankStr){
                            componentStore.update(that,{
                                rankStr : getRiskTestInfo.data.rankStr
                            })
                        }
                    }
                }
            });
            //邀请好友
            Utils.requestData({
                url: config.api +"qj/front/v1/invite/getMemberInviteActivityDetail",
                method: 'post',
                data: {
                    'memberId':Utils.Storage.get('user').memberId
                },
                callback: function(data){
                    console.log("getMemberInviteActivityDetail::",data);
                    var inviteActivity = data;

                    if(inviteActivity.resultCode==0){
                        if(inviteActivity.data){
                            componentStore.update(that,{
                                inviteActivityImgUrl : inviteActivity.data.activeActivity.inviteActivityAdPath
                            })

                        }
                    }
                },
                errorAlert : function(data){
                    console.log(data);
                    if(data.resultCode=="104804"){

                        componentStore.update(that,{
                            inviteActivityImgUrl : ""
                        })

                        this.errorAlert.jail = true;
                    }
                    this.errorAlert.jail = true;
                }
            });

            
        })

        
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    getUserInfo( fnCallback ){
        var that = this;
        Utils.requestData({
            url: config.api +"qj/front/v1/user/getUserInfo",
            method: 'post',
            data: {

            },
            callback: function(data){
                
                if(data.resultCode=="0"){
                    
                    Utils.Storage.set('user',data.data);
              
                    componentStore.update(that,{
                        userInfo : data.data
                    })

                    fnCallback&&fnCallback();
                }
                
            }
        });

    }
    introduceHandle(display){   //点击问号 显示 隐藏 方法
        if(display){ //判断是否是Book自身的关闭按钮触发
            componentStore.update(this,{
                introduceDisplay : display
            })
        }else{
            let introduceDisplay = this.state.introduceDisplay;
            if(introduceDisplay=='none'){
                componentStore.update(this,{
                    introduceDisplay : 'block'
                })
            }else{
                componentStore.update(this,{
                    introduceDisplay : 'none'
                })
            }
        }

    };
    //资金显示隐藏
    eyeHandle(){
        var eleAMoney = this.refs["a-money"];
        var eleHDadaH3 = this.refs["h-data"].getElementsByTagName('h3');
        var okConsume = this.refs["okConsume"];


        var showHide = this.refs.showHide;
        var isShow = Utils.hasClass( showHide,'t-show' );


        if(isShow){
            Utils.removeClass( showHide,'t-show' );
            Utils.addClass( showHide,'t-hide' );

            eleAMoney.innerHTML = "****";
            okConsume.innerHTML = "****";
            
            for(var i=0;i<eleHDadaH3.length;i++){
                eleHDadaH3[i].innerHTML = "****";
            }
        }else{
            Utils.removeClass( showHide,'t-hide' );
            Utils.addClass( showHide,'t-show' );

            var getInitMoney = this.state.getInitMoney;
            eleAMoney.innerHTML = getInitMoney.totalAmount;
            okConsume.innerHTML = getInitMoney.okConsume;
         
            eleHDadaH3[0].innerHTML = getInitMoney.totalInterestAmount;
            eleHDadaH3[1].innerHTML = getInitMoney.preInterestAmount;
            eleHDadaH3[2].innerHTML = getInitMoney.preBalanceAmount;


        }
    }

    /* withdrawHandle(){   //点击提现
        var _this = this;
        if(this.state.isTixianClick==true){
            componentStore.update(this,{
                isTixianClick : false
            })
            let opt = {
                bindBankStr : "提现前",
                callback : function(){
                     Utils.switchRoute('/withdraw');
                },
                onlyOneClickCallback : function(){

                    componentStore.update(_this,{
                        isTixianClick : true
                    })
                }
            }

            Utils.Interface.isPayAndWithdrawStatus(opt);
        }
    } */
    /* payHandle(){   //点击充值
        var _this = this;
        if(this.state.isChongzhiClick==true){
            componentStore.update(this,{
                isChongzhiClick : false
            })
            let opt = {
                bindBankStr : "充值前",
                callback : function(){
                     Utils.switchRoute('/pay');
                },
                onlyOneClickCallback : function(){

                    componentStore.update(_this,{
                        isChongzhiClick : true
                    })
                }
            }
            Utils.Interface.isPayAndWithdrawStatus(opt);
        }
    }; */
    bankHandle(){ //点击银行卡
        /* let opt = {
            bindBankStr : "",
            callback : function(){
                 Utils.switchRoute('/bankDetail');
            }
        }
        Utils.Interface.isPayAndWithdrawStatus(opt);

        var _this = this;
        if(this.state.isBankDetailClick==true){
            componentStore.update(this,{
                isBankDetailClick : false
            })
            let opt = {
                bindBankStr : "",
                callback : function(){
                     Utils.switchRoute('/bankDetail');
                },
                onlyOneClickCallback : function(){

                    componentStore.update(_this,{
                        isBankDetailClick : true
                    })
                }
            }
            Utils.Interface.isPayAndWithdrawStatus(opt);
        } */
        var that = this;
        this.getUserInfo(function(){

            if(that.state.userInfo.isTrueMan==0){   //没有开户
                
                Utils.switchRoute('/receivables');
    
            }else if(that.state.userInfo.isTrueMan==1){  //已开户
                
                Utils.switchRoute('/bankDetail');
                
            }

        })
        

    }
    /* autoBidHandle(){    //点击自动投标
        
        if(this.state.userInfo.isTrueMan==0){   //不是连连老用户
            
            Utils.switchRoute('/receivables');

        }else if(this.state.userInfo.isTrueMan==1){  //是连连老用户

            //获取我的自动投标配置列表
            Utils.requestData({
                url: config.api +"qj/front/v1/autoInvest/getMemberAutoInvestRuleList",
                method: 'post',
                data: {

                },
                callback: function(data){
                    if(data.resultCode==0){
                        if(data.data.length==0){

                                Utils.switchRoute('/autoBidOpen');

                        }else if(data.data.length>0){

                            Utils.switchRoute('/autoBidList');

                        }
                    }
                }

            });
            
        }

    } */
    render(){
        let that = this;
        if(!this.state.userInfo && this.state.isRenderMy==false){   //如果用户还没有登录 返回空标签

            return (
                <div></div>
            )
        }else{

            let userInfo = this.state.userInfo;
            let getInitMoney = this.state.getInitMoney;

            return (

                <div className="my-wrap">
                    <TitleBar $id="titleBar">
                        <div className="flex-child1">
                            <City $id="my-city"></City>
                        </div>
                        <div className="flex-child1 title">钱夹</div>

                        {/*按钮组件  start*/}

                        <div className="flex-child1 controllBtn ">
                            <NavBar $id="home-navBar"></NavBar>
                        </div>
                        {/*按钮组件  end*/}
                    </TitleBar>
                    <div className="my-head">
                        <div className="h-top">
                            <div className="t-left">
                                <span className="t-logo"></span>
                                <div className="t-text">
                                    <p>{ userInfo.phone.substring(0,3)+"****"+userInfo.phone.substring(userInfo.phone.length-4) }</p>
                                    {/* <p>陕坝农商银行资金存管</p> */}
                                </div>
                            </div>
                            <div className="t-right">
                                <div className="r-icon" onTouchEnd={()=>{
                                    this.introduceHandle();
                                }}>
                                    <Icon type={require('../../../image/svg/wenhao.svg')} />
                                </div>
                                <a className="r-icon" href="javascript:;" onClick={()=>{
                                        Utils.switchRoute("/messageCenter");
                                }}>
                                    <Icon type={require('../../../image/svg/tip.svg')} />
                                    <span
                                        className="i-tip"
                                        style={{display:that.state.unReadCount==0?'none':'block'}}>
                                        {that.state.unReadCount}
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="h-asset">
                            <h3 className="a-money" ref="a-money">{getInitMoney.totalAmount || 0}</h3>
                            <div className="a-text">
                                <span className="t-explain">预期总资产(元)</span>
                                <div className="t-icon t-show" ref="showHide" onTouchEnd={()=>{
                                    this.eyeHandle();
                                }}>
                                    <span></span>
                                </div>
                            </div>
                            {/* <div className="investBill-icon" onTouchEnd={()=>{

                                // 进入投资账单
                                Utils.switchRoute("/investBill");

                            }}>
                                <i></i>
                            </div> */}
                        </div>

                        <ul className="h-data" ref="h-data">
                            <li>
                                <h3>{getInitMoney.preBalanceAmount ||0}</h3>
                                <p>待还本金(元)</p>
                            </li>
                            <li>
                                <h3>{getInitMoney.totalInterestAmount || 0}</h3>
                                <p>累计收益(元)</p>
                            </li>
                            <li>
                                <h3>{getInitMoney.preInterestAmount || 0}</h3>
                                <p>预期收益(元)</p>
                            </li>
                        </ul>
                    </div>
                    <div className="my-main">
                        <ul className="my-list">
                            <li>
                                <div className="my-icon">
                                    <i className="icon-13"></i>
                                </div>
                                <div className="my-item" onClick={()=>{
                                   
                                   Utils.switchRoute("/expenseDetail");

                                }}>
                                    <div className="consumable-title">
                                        <h3 className="i-title">可消费本金余额:</h3>
                                        <p className="c-money">￥<span ref="okConsume">{getInitMoney.okConsume}</span></p>
                                    </div>
                                    
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-9"></i>
                                </div>
                                <div className="my-item" onClick={()=>{
                                    that.bankHandle();
                                }}>
                                    <h3 className="i-title">我的银行卡</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-2"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                        // 进入投资账单
                                        Utils.switchRoute("/investBill");
                                    }}>
                                    <h3 className="i-title">我的投资</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                            {/* <li>
                                <div className="my-icon">
                                    <i className="icon-12"></i>
                                </div>
                                <div className="my-item" href="javascript:;"  onClick={()=>{
                                    that.autoBidHandle();
                                }}>
                                    <h3 className="i-title">自动投标</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </div>
                            </li> */}
                                                  
                            <li>
                                <div className="my-icon">
                                    <i className="icon-3"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                        Utils.switchRoute("/coupon");
                                    }}>
                                    <h3 className={
                                        (function(){
                                            if(that.state.isHasWSYCoupon==true){
                                                return "i-title reading"
                                            }else {
                                                return "i-title"
                                            }
                                        })()
                                    }>
                                        我的优惠券
                                    </h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-4"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                        Utils.switchRoute("/myGift");
                                    }}>
                                    <h3 className="i-title">我的赠品</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-5"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                        Utils.switchRoute("/activity");
                                    }}>
                                    <h3 className="i-title">平台活动</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-8"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                    if(that.state.rankStr=='测一测'){
                                        window.location.href="/h5Static/risk_open.html"
                                    }else{
                                        window.location.href="/h5Static/risk_agin.html"
                                    }
                                }}>
                                    <h3 className="i-title">风险评测</h3>
                                    <div className="i-right">
                                        <span>{that.state.rankStr}</span>
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-6"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                        Utils.switchRoute("/set");
                                    }}>
                                    <h3 className="i-title">设置</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="my-icon">
                                    <i className="icon-10"></i>
                                </div>
                                <a className="my-item" href="javascript:;" onClick={()=>{
                                        Utils.switchRoute("/problemList");
                                    }}>
                                    <h3 className="i-title">常见问题</h3>
                                    <div className="i-right">
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                        {
                            (()=>{
                                if(that.state.inviteActivityImgUrl!=""){
                                    return (
                                        <div className="my-invite">
                                            <a className="invite-btn" href="javascript:;" onClick={()=>{
                                                    // Utils.switchRoute("/invitations");
                                                    window.location.href = '/invitations';
                                            }}>

                                                <img src={config.img+that.state.inviteActivityImgUrl} />

                                            </a>

                                        </div>
                                    )
                                }
                            })()
                        }

                        <ul className="my-list">
                            <li>
                                <div className="my-icon">
                                    <i className="icon-7"></i>
                                </div>
                                <a className="my-item" href="tel:400-831-6608">
                                    <h3 className="i-title">客服热线</h3>
                                    <div className="i-right">
                                        <span className="i-telphone">400-831-6608</span>
                                        <Icon type="right" className="i-icon" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* this.introduceHandle.bind(this) 这里的 bind(this) 很重要，没有的话会报错 Book 组件中的this指向会有问题 */}
                    <Book introduceDisplay={this.state.introduceDisplay} introduceHandle={this.introduceHandle.bind(this)} />

                </div>

            )
        }
    }

}

export default My;
