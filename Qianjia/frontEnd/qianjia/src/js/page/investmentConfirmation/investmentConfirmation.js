import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import BankPassword from '../../module/bankPassword/bankPassword';
import Alert from '../../module/alert/alert';
import { Modal } from 'antd-mobile';
//导入样式 start
import './investmentConfirmation.scss'

class InvestmentConfirmation extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        //用户是否登录
        /*if(!Utils.Storage.get('user').memberId){
            Utils.switchRoute('/login');
        }*/

        let that = this;
        //在此处初始化状态
        this.state={
            userDetail:Utils.Storage.get('user'),
            passwordLength:false,
            passwordMatil:false,
            actualAmt:0,
            money:'', //投资金额
            projectId:Utils.Url.parseUrl(location.hash).params.productId,//项目ID
            init:0,
            addYield:Utils.Url.parseUrl(location.hash).params.addYield,//加息券
            investProjectId:Utils.Url.parseUrl(location.hash).params.investProjectId,//产品ID
            submit:true,
            bankPassword:false,
            couponSelect:true,
            couponSelected:false,
            couponData:[],
            couponSate:'none',
            motail:'none',
            ljMoney:'',//优惠券立减金额
            interest:'',
            projectT:'',//项目期限
            projectSurplus:'',//项目可投金额
            remuneration:0,
            userId:Utils.Storage.get('user').memberId,// 用户ID
            isCouponId:'' ,//优惠券ID
            fistBankName:'',//默认银行卡名称
            memberBankCardId:'', //银行ID
            firstBankLgo:'',//银行Logo
            bankList:[],
            check:false,
            investMinAmount:'',
            isBankSt:'none',//选中付款银行
        }


        Utils.tokenExpireJumpToLogin(function () {

            //初始化项目信息
            let projectInit,projectId=Utils.Url.parseUrl(location.hash).params.productId;
            Utils.requestData({
                url: config.api + 'qj/front/v1/product/getProductDetail',
                method: 'post',
                data: {
                    "productId": Utils.Url.parseUrl(location.hash).params.productId
                },
                callback: function(data){
                    if(data.resultCode == 0){
                        componentStore.update(that,{
                            interest:data.data.costProduct.financingAnnualYield,
                            projectT:data.data.costProduct.projectPeriodMonth,
                            projectSurplus:data.data.costProduct.projectAmount-data.data.costProduct.financingAmount,
                            investMinAmount:data.data.costProduct.investMinAmount
                        })
                    }
                }

            });

            Utils.requestData2({
                requestArr:  [
                    //可用余额
                    {
                        url: config.api +"qj/front/v1/account/queryAccountBalance",
                        method: 'post',
                        data: {}
                    },
                    //优惠券列表
                    {
                        url: config.api +"qj/front/v1/user/getDiscountCouponList",
                        method: 'post',
                        data: { "discountCouponfilterType": 1,"size":"100000","pn":""}
                    },
                    //默认银行卡及银行卡列表
                    {
                        url: config.api +"qj/front/v1/lianlianInvest/appUser/getMemberBankCardList",
                        method: 'post',
                        data: {}
                    }
                    
                ],
                callback: function(dataArr){

                    var actualAmt = dataArr[0];
                    if(actualAmt.resultCode == 0){
                        // console.log(actualAmt.data)
                        componentStore.update(that,{
                            actualAmt: actualAmt.data.actualAmt
                        })
                    }
                    var discountList = dataArr[1];
                    if(discountList.resultCode == 0){
                        
                        discountList.data.unshift({
                            couponAmount:'',
                            couponLimitAmount:''
                        })
                        componentStore.update(that,{
                            couponData: discountList.data
                        })
                    }
                    var bankDetail = dataArr[2];
                    if(bankDetail.resultCode == 0){
                        console.log('银行卡列表：',bankDetail.data)
                        // let firstCode=bankDetail.data.bankCard.substr(bankDetail.data.bankCard.length-4);
                        let bankName=bankDetail.data
                        componentStore.update(that,{
                            bankList:bankDetail.data,
                            firstBankName: bankDetail.data[0].bankName,
                            firstBankLgo:bankDetail.data[0].logoUrl,
                            memberBankCardId:bankDetail.data[0].memberBankCardId
                        })
                    }
                }
            })
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
    //减少
    reduce(){
        let reduceMoney;
        let remuneration;
       if(this.state.money>100){
           reduceMoney = parseInt(this.state.money)-100;
           remuneration = reduceMoney*((Number(this.state.interest)+Number(this.state.addYield))/100)/365*this.state.projectT;
           this.setState({
                money:reduceMoney,
                remuneration:remuneration.toFixed(2)
            })
       }
        this.initCoupon();
    }
    //增加
    increase(){
        let Mnumber;
        let remuneration;
        if(this.state.money == ''){
            Mnumber = '';
            remuneration=0;
        }else{
            Mnumber = parseInt(this.state.money)+100
            remuneration=(Mnumber*((Number(this.state.interest)+Number(this.state.addYield))/100)/365*this.state.projectT).toFixed(2);
        }
        this.setState({
            money:Mnumber,
            remuneration:remuneration
        })
        this.initCoupon();
    }
    //输入值
    chenge(e){
        let remuneration = e.target.value*((Number(this.state.interest)+Number(this.state.addYield))/100)/365*this.state.projectT;
        this.setState({
             money:e.target.value,
             remuneration:remuneration.toFixed(2)
        })
        //console.log(1);
        //初始化优惠券
        this.initCoupon();
    }
    //提交订单
    submit(){

        let that=this;
        // console.log('name:',that.state.userDetail.memberName);
        let reg = /^[1-9]\d*00$/;
        let numValue = reg.test(that.state.money);
        //订单转化量
         var timestamp = new Date().getTime();
         var tprm = "transAmt=" + that.state.money + "&userId=" +　that.state.userDetail.memberId + "&userName=" + that.state.userDetail.memberName+ "&timestamp=" + timestamp;
             __ozfac2(tprm,'#investnowSuccess');
        // //起投金额 that.state.investMinAmount
        let openMoney = Number(that.state.investMinAmount);
        
        //console.log('记录投资变量值：',tprm);
             
        if(Number(that.state.money)>Number(that.state.projectSurplus)){
            Modal.alert('投资金额不能大于可投金额','可投金额为：'+that.state.projectSurplus+'元', [
                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
            ]);
            return;
        }

        let at;
        let dt;
            if(that.state.money == ''){
                at = 0;
            }else{
                at=that.state.money;
            }
            if(that.state.ljMoney == '' || that.state.ljMoney == '不使用'){
                dt = 0;
            }else{
                dt = that.state.ljMoney;
            }
        let alMy = at - parseInt(dt);
        var inputCash = Number(that.state.money);
        var actualAmt = Number(this.state.actualAmt);
            console.log('用券后的金额:',alMy);
            console.log('可用金额:',actualAmt)
            //临时测试0.01金额不做限制
                    if(this.refs['inputBox'].children[0].checked){
                        // alert('条件都满足调到连连第三方');
                        Utils.requestData({
                            url: config.api + 'qj/front/v1/appUser/generateOrder',
                            method: 'post',
                            data: {
                                'projectId':that.state.investProjectId,//that.state.projectId
                                'productId':that.state.projectId,//that.state.investProjectId
                                'discountCouponId':that.state.isCouponId,//that.state.isCouponId
                                'investAmount': that.state.money ,
                                'postType':'3',
                                'memberBankCardId':that.state.memberBankCardId
                            },
                            callback: function(data){
                                if(data.resultCode == 0){
                                    console.log('调整后的接口返回：',data.data.order.oid);
                                    var oid = data.data.order.oid;
                                    //连连的支付页面
                                    window.location.href = config.api+'qj/front/v1/lianlianInvest/llPayAutoPay?oid='+oid+'&type=wap';
                                    //临时跳过连连支付页面正常开发
                                    // window.location.href = '/paymentSuccessBefore?oid='+oid;

                                    // Utils.requestData({
                                    //     url: config.api + 'qj/front/v1/lianlianInvest/llPayAutoPay',
                                    //     method: 'post',
                                    //     data: {
                                    //         'oid':oid
                                    //     },
                                    //     callback: function(data){
                                    //         if(data.resultCode == 0){
                                    //             // console.log(1);
                                            
                                    //         }
                                    //     }
                                    // })
                                    
                                }
                            },
                            
                         });
                        //控制银行输入密码框
                        // componentStore.update(that,{
                        //     submit:false,
                        //     bankPassword:true,
                        //     motail:'block',
                        // })
                    }else{
                        //
                        Modal.alert('提示','请选择阅读并同意投资协议', [
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])
                    }
            //余额与投资金额判断
            // if(inputCash>=0 && alMy > actualAmt ){
            //     Alert({
            //         type:'standard',
            //         title:'可用余额'+this.state.actualAmt+'元',
            //         desc:'余额不足，请充值',
            //         button:[
            //             {
            //                 text:'取消',
            //                 handle:()=>{

            //                 }
            //             },
            //             {
            //                 text:'充值',
            //                 handle:()=>{
            //                     Utils.switchRoute('/pay?backUrl=investmentConfirmation&'+'productId='+that.state.projectId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId);
            //                 }
            //             }
            //         ]

            //     });
            //     return;
            // }

        //此处是起投金额的整倍数逻辑业务
        // if(openMoney>0){
        //     if(that.state.money > 0 && that.state.money%openMoney == 0){
        //         if(this.refs['inputBox'].children[0].checked){
        //             // alert('条件都满足调到连连第三方');
        //             Utils.requestData({
        //                 url: config.api + 'qj/front/v1/appUser/generateOrder',
        //                 method: 'post',
        //                 data: {
        //                     'projectId':that.state.investProjectId,//that.state.projectId
        //                     'productId':that.state.projectId,//that.state.investProjectId
        //                     'discountCouponId':that.state.isCouponId,//that.state.isCouponId
        //                     'investAmount': that.state.money ,
        //                     'postType':'3',
        //                     'memberBankCardId':that.state.memberBankCardId
        //                 },
        //                 callback: function(data){
        //                     if(data.resultCode == 0){
        //                         console.log('调整后的接口返回：',data.data.order.oid);
        //                         var oid = data.data.order.oid;
        //                         //连连的支付页面
        //                         window.location.href = config.api+'qj/front/v1/lianlianInvest/llPayAutoPay?oid='+oid+'&type=wap';
        //                         //临时跳过连连支付页面正常开发
        //                         // window.location.href = '/paymentSuccessBefore?oid='+oid;

        //                         // Utils.requestData({
        //                         //     url: config.api + 'qj/front/v1/lianlianInvest/llPayAutoPay',
        //                         //     method: 'post',
        //                         //     data: {
        //                         //         'oid':oid
        //                         //     },
        //                         //     callback: function(data){
        //                         //         if(data.resultCode == 0){
        //                         //             // console.log(1);
                                           
        //                         //         }
        //                         //     }
        //                         // })
                                
        //                     }
        //                 },
                        
        //              });
        //             //控制银行输入密码框
        //             // componentStore.update(that,{
        //             //     submit:false,
        //             //     bankPassword:true,
        //             //     motail:'block',
        //             // })
        //         }else{
        //             //
        //             Modal.alert('提示','请选择阅读并同意投资协议', [
        //                 { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
        //             ])
        //         }
        //     }else{
        //         Modal.alert('提示','投资金额小于起投金额或不是起投金额倍数,请重新输入!', [
        //                 { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
        //             ])
        //     }
        // }
    }
    //关闭输入银行卡密码
    closeBank(e){
        //alert('您关闭了密码输入！')
        this.setState({
            submit:true,
            bankPassword:false,
            motail:'none'
        })
        e.stopPropagation();
        e.preventDefault();
         return false;
    }
    //清除输入内容
    nullVal(){
        let input = document.getElementById('textInput');
            input.value = '';
        let inputs = input.parentNode.lastChild.children;
        for(var i=0;i<inputs.length;i++){
            inputs[i].value = '';
        }
    }
    //银行输入框的事件
    parentChange(e){
        let that=this;
         var bankPs = e.target.value.trim();
         componentStore.update(that,{
             passwordLength:true,
             passwordMatil:true
         })
            
    }
    //关闭优惠券
    closeCoupon(){
        let that=this;
        componentStore.update(that,{
            couponSate:'none',
        })
        setTimeout(function(){
            componentStore.update(that,{
                motail:'none'
            })
        }, 100);
        //window.addEventListener('touchmove',function(e){e.preventDefault()});\
        //取消默认事件
        window.removeEventListener('touchmove',function(e){e.preventDefault()});
    }
    //打开优惠券
    openCoupon(){
        if(this.state.money>0){
            componentStore.update(this,{
                couponSate:'block',
                motail:'block',
            })
            //给window对象添加touchmove事件阻止默认行为
            window.addEventListener('touchmove',function(e){e.preventDefault()},false);
            let cp=document.getElementById('couponParent');
            let cc=document.getElementById('couponChildren');
            Utils.preventPull(cp,cc);
            this.refs.couponContent.addEventListener('touchmove',function(e){
                e.stopPropagation();
                return false;

            })
        }else{
            Modal.alert('提示','请先输入投资金额', [
                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                ])
        }
    }

    //立减金额
    lj(money,couponId){
        let that = this;
        componentStore.update(this,{
            ljMoney:money,
            isCouponId:couponId,
        })
        that.closeCoupon();
    }
    //充值跳转
    toPay(){
        let that=this;

        // Utils.switchRoute('/pay?backUrlInvest=investmentConfirmation&'+'productId='+that.state.projectId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId);

        let fromInvesetToPay = 'backUrlInvest=investmentConfirmation&'+'productId='+that.state.projectId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId;
        Utils.Storage.set('fromInvesetToPay',fromInvesetToPay);
        Utils.switchRoute('/pay?'+fromInvesetToPay);

    }
    //同意协议按钮
    check(){
        let that=this;
        componentStore.update(that,{
            check:!that.state.check
        })
    }
    //优惠券初始化
    initCoupon(){
       this.setState({
           ljMoney : ''
       })
        let current =document.getElementById('couponChildren');
        let listLis = current.children;
        // console.log(current);
        // console.log(listLis);
        //循环所有的状态都为隐藏
        //注意 最后添加了一个暂无更多多一个元素 所以listLis.length-1;
        for(var i=0;i<listLis.length-1;i++){
           listLis[i].lastElementChild.lastElementChild.style.display='none';
           listLis[i].lastElementChild.firstElementChild.style.display = 'block';

        }
    }
    //显示银行卡列表
    showBankList(e){
        let that=this;
        componentStore.update(that,{
            isBankSt:'block',
            motail:'block'
        })
    }
    //选择付款银行
    listBank(event){
        let that = this;
        // console.log();
        let list = event.target.parentNode.parentNode.children;
        // console.log(list[0].children[0])
        for(var i = 0 ; i < list.length ; i++ ){
            list[i].children[1].style.display = 'none';
        }
        event.target.parentNode.children[1].style.display = 'block';
        console.log('当前：',event.target.getAttribute('data-value'));
        componentStore.update(that,{
            firstBankName:event.target.getAttribute('data-value'),
            firstBankLgo:event.target.getAttribute('data-logUrl'),
            memberBankCardId:event.target.getAttribute('data-couponId'),
            isBankSt:'none',
            motail:'none'
            
        })
        
    }
    //添加银行卡跳转
    goBankBingding(){
        window.location.href = '/bankBingding';
    }
    //取消付款银行卡列表
    closeBankList(){
        componentStore.update(this,{
            isBankSt:'none',
            motail:'none'
        })
    }
    //点击默认如同点击列表
    moRen(){
        // this.listBank(event);
        return false;
    }
    render(){
        // console.log(this.state.userName)
        var that = this;
        let submitBtn = this.state.submit? 'block' : 'none';
        let bank = this.state.bankPassword? 'block' : 'none';
        let couponSelect = this.state.couponSelect? 'block' : 'none';
        let couponSelected = this.state.couponSelected? 'block' : 'none';
        let Omoney = this.state.money;
        let amount;
        let discount;
            if(this.state.money == ''){
                amount = 0;
            }else{
                amount=this.state.money;
            }
            if(this.state.ljMoney == '' || this.state.ljMoney == '不使用'){
                discount = 0;
            }else{
                discount = this.state.ljMoney;
            }
        let actualMoney =amount - parseInt(discount);
        if(actualMoney<=0){
            actualMoney='0.00';
        }
        console.log('实际支付金额是否为负数：',actualMoney);
        //是否有优惠券
        let myDiscount = this.state.couponData.length>=2? '请选择优惠券' : '无可用优惠券';
            if(this.state.ljMoney != ''){
                myDiscount=this.state.ljMoney;
            }

        let isCoupon = this.state.couponData.length>=2? <div className="list_btn" onTouchEnd={this.openCoupon.bind(this)}><a href="javascript:void(0);" ref="isCouponId" data-isCouponId={isCouponId}><span className="couponImg"><img src={require('../../../image/icon/coupon_icon.png')} alt=""/></span>{myDiscount}</a><i><img src={require('../../../image/icon/icon_right.png')} alt=""/></i></div> : <div className="list_btn">{myDiscount}</div>;
        let isCouponId = this.state.isCouponId ? this.state.isCouponId : '';
        //付款银行卡
        console.log('xxxx:',that.state.firstBankName);
        let isBank = <div className="list_btn"><a href="javascript:void(0);" onTouchEnd={this.showBankList.bind(this)} data-bankId={this.state.memberBankCardId}>{that.state.firstBankName}</a><i><img src={require('../../../image/icon/icon_right.png')} alt=""/></i></div> ;

        //加息券 that.state.addYield值
        let addY;
        let addyState='none';
            if(that.state.addYield != 0){
                addY=that.state.addYield;
                addyState='inline-block';
            }else{
                addyState='none';
            }
        let btn_submit = that.state.check?(<div className="placeOrder_true" onTouchEnd={that.submit.bind(that)}>提交订单</div> ): (<div className="placeOrder_false">提交订单</div> );

        /* 此处代码判断是否从重置密码页回来的 即 投资页-->充值页-->重置密码 start */
        let backbarBackUrl = "";
        let arrowLocationHref = Utils.Url.parseUrl(location.href);
        let arrowBackUrl = arrowLocationHref.params.backUrl;
        if(arrowBackUrl&&arrowBackUrl=="resetPaymentPasswordOk"){ //从充值密码回来
            if(arrowLocationHref.params.backUrlInvest=="investmentConfirmation"){
                backbarBackUrl = '/projectIntroduction?productId='+arrowLocationHref.params.productId+'&backUrl='+arrowBackUrl;
            }
        }
        /* 此处代码判断是否从重置密码页回来的 即 投资页-->充值页-->重置密码 end */

        return (
            <div className="">
                <Backbar
                    $id="investmentConfirmation"
                    title="投资确认"
                    style={{appearance:{backgroundColor:'#ff432c',borderBottom:'none'},character:{color:'#fff'}}}
                    backUrl = {backbarBackUrl}
                >
                    <div className="information">
                        <div className="top">
                            <ul>
                                <li><span>{this.state.interest}</span><span style={{display:addyState}}>+{addY}</span></li>
                                <li>{this.state.projectT}</li>
                                <li>{this.state.projectSurplus}</li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <ul>
                                <li>预期年化回报率(%)</li>
                                <li>项目期限(天)</li>
                                <li>可投金额(元)</li>
                            </ul>
                        </div>
                        <div className="right_border1">
                            <img src={require('../../../image/icon/information_rightBorder.png')} alt=""/>
                        </div>
                        <div className="right_border2">
                            <img src={require('../../../image/icon/information_rightBorder.png')} alt=""/>
                        </div>
                    </div>
                    <div className="InvestmentMoney">
                        <h4>投资金额</h4>
                        <div className="money">
                            <button onTouchEnd={this.reduce.bind(this)}>-</button>
                            <input type="number" placeholder={'请输入投资金额('+that.state.investMinAmount+'元起投)'} onChange={this.chenge.bind(this)} value={this.state.money} />
                            <button onTouchEnd={this.increase.bind(this)}>+</button>
                        </div>
                    </div>
                    <div className="profit">
                        <ul>
                            {/*<li className="list">
                                <div className="list_left">
                                    <div className="img">
                                        <img src={require('../../../image/icon/icon_profit_money_1.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="list_right">
                                    <div className="list_text">可用余额：<span>{this.state.actualAmt}</span>元</div>
                                    <div className="list_btn"><button onTouchEnd={this.toPay.bind(this)}>充值</button></div>
                                </div>
                            </li>*/}
                            <li className="list">
                                <div className="list_left">
                                    <div className="img">
                                        <img src={require('../../../image/icon/icon_profit_money_2.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="list_right">
                                    <div className="list_text">预期回报：</div>
                                    <div className="list_btn">{this.state.remuneration+'元'}</div>
                                </div>
                            </li>
                            <li className="list">
                                <div className="list_left">
                                    <div className="img">
                                        <img src={require('../../../image/icon/icon_profit_money_3.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="list_right">
                                    <div className="list_text">优惠券：</div>
                                    {isCoupon}
                                </div>
                            </li>
                            <li className="list">
                                <div className="list_left">
                                    <div className="img">
                                        <img src={require('../../../image/icon/icon_profit_money_3.png')} alt=""/>
                                    </div>
                                </div>
                                <div className="list_right">
                                    <div className="list_text">付款银行卡：</div>
                                    <div>
                                        <span className="bankLogo"><img src={that.state.firstBankLgo} alt=""/></span>
                                        {isBank}
                                    </div>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="paymentMoney">实际支付：<span>{actualMoney}</span>元</div>
                    <div className="clause">
                        <div className="input" ref="inputBox">
                            <input type="checkbox" checked={this.state.check} onClick={(ev)=>{
                                componentStore.update(that,{
                                    check: ev.target.checked
                                })
                            }}/>
                        </div>
                        <div className="clauseText">我已阅读并同意<a href="javascript:;" onClick={(e)=>{
                            window.location.href="/h5Static/risk_prompt_book.html";e.stopPropagation();return false;
                        }}>《风险提示书》</a><a href="javascript:;" onClick={(e)=>{window.location.href="/h5Static/capital_book.html" ;e.stopPropagation();return false; }}>《资金来源合法承诺书》</a><a style={{display:'inline-block'}} href="javascript:;" onClick={(e)=>{window.location.href="/h5Static/networkLending-xy.html",e.stopPropagation();return false;}}>《钱夹网贷 居间服务协议》</a></div>
                    </div>
                </Backbar>
                {btn_submit}
                <div className="information_password">
                    <div className="bankPassword" style={{display:bank}}>
                        <ul>
                            <li>请输入存管账户支付密码</li>
                            {/*<li>银行卡：<span>{that.state.bankName}({that.state.bankCard})</span></li>*/}
                            <li className="bankInput">
                                <BankPassword $id="bankPassword" parentChange={that.parentChange.bind(that)} passwordLength={that.state.passwordLength}></BankPassword>
                            </li>
                            <li>
                            <span onTouchEnd={()=>{Utils.switchRoute('/resetPaymentPassword1?productId='+this.state.projectId+'&addYield='+this.state.addYield+'&investProjectId='+this.state.investProjectId)}}>忘记密码？</span></li>
                        </ul>
                        <div className="close" onTouchEnd={this.closeBank.bind(this)}>
                            <img src={require('../../../image/icon/icon_close.png')} alt=""/>
                        </div>
                        
                    </div>
                </div>
                {/*优惠券*/}
                <div className="coupon" ref="couponContent" style={{display:this.state.couponSate}} id="couponParent">
                    <h4>选择优惠券</h4>
                    <ul id="couponChildren">
                        {
                            this.state.couponData.map(function(item,i){
                                 let normal;
                                 let noCoupon;
                                 let psMoney;
                                 if(item.couponLimitAmount == ''){
                                     psMoney=0;
                                 }else{
                                   psMoney = parseInt(item.couponLimitAmount)
                                 }
                                if(psMoney <= Omoney){
                                    normal="block";
                                    noCoupon="none";
                                }else{
                                    normal="none";
                                    noCoupon="block";
                                }

                                return(
                                    <CouponList $id={"couponList"+i} ljMoney={that.lj.bind(that)} inptMoney={Omoney} noCoupon={noCoupon} normal={normal} key={'coupon'+i} selectNo={couponSelect} selectOk={couponSelected} copListRef={'ref'+i} money={(item.couponAmount!="")?(item.couponAmount+"元抵用券"):""} couponId={item.discountCouponId} limit={item.couponLimitAmount}></CouponList>
                                )
                            })
                        }
                        <li>
                            <div className="coupon_text"></div>
                        </li>
                    </ul>

                    <div className="close" onTouchEnd={this.closeCoupon.bind(this)}>
                        <img src={require('../../../image/icon/icon_close.png')} alt=""/>
                    </div>
                </div>
                <div className="couponMotail" style={{display:this.state.motail}}></div>
                {/*付款银行卡列表*/}
                <div className="coupon" ref="isBankList" style={{display:this.state.isBankSt}} id="isBankList">
                    <h4>付款银行卡列表</h4>
                    <ul>
                        {that.state.bankList.map(function(item,i){
                            return (<li key={'fk'+i} className="couponList" onTouchEnd={that.listBank.bind(that)}>
                                    <div className="couponName" data-couponId={item.memberBankCardId} data-value={item.bankName} data-logUrl={item.logoUrl}><span className="bankLogo"><img src={item.logoUrl} alt=""/></span>{item.bankName} <span style={{display:item.isDefault == 1?'inline-block':'none'}} className="moRen" onTouchEnd={that.moRen.bind(that)}>{'默认'}</span></div>
                                    <div className="couponInput" style={{display:that.props.normal}} >
                                        {/*<div className="selectNo" style={{display:'block'}}></div>*/}
                                        <div className="selectOk">
                                            <img src={require("../../../image/icon/selected_btn_ok.png")} alt=""/>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                        
                    </ul>

                    <div className="close" onTouchEnd={this.closeBankList.bind(this)}>
                        <img src={require('../../../image/icon/icon_close.png')} alt=""/>
                    </div>
                    <div className="goBangDingBank" onTouchEnd={this.goBankBingding.bind(this)}><a href="javascript:;">添加银行卡</a></div>
                </div>
            </div>
        )
    }

}

export default InvestmentConfirmation;

//优惠券列表组件
class CouponList extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            selectNo:true,
            selectOk:false,
            slects:false
        }
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
    couponClick(){
        let current = this.refs[this.props.copListRef];
        let listLis = this.refs[this.props.copListRef].parentNode.children;
        //循环所有的状态都为隐藏
        //注意 最后添加了一个暂无更多多一个元素 所以listLis.length-1;
        for(var i=0;i<listLis.length-1;i++){
           listLis[i].lastElementChild.lastElementChild.style.display='none';
           listLis[i].lastElementChild.firstElementChild.style.display = 'block';

        }
        //切换当前的选中状态
        current.getElementsByClassName('selectOk')[0].style.display = 'block';
        current.getElementsByClassName('selectNo')[0].style.display = 'none';
        if(current.getElementsByClassName('selectOk')[0].style.display == 'block'){
            let ljMoney = current.getElementsByClassName('selectOk')[0].parentNode.parentNode.firstElementChild.getAttribute('data-value');
            let couponId = current.getElementsByClassName('selectOk')[0].parentNode.parentNode.firstElementChild.getAttribute('data-couponId');
            this.props.ljMoney(ljMoney,couponId);
        }


    }
    //couponId
    render(){
        let Omoney = this.props.inptMoney;
        let limiet = this.props.limit===''?'不使用优惠券':<span>(满{this.props.limit}可用)</span>;
        //let limiet = this.props.limit >= 0 ?<span>(满{this.props.limit}可用)</span> : '';
        return(
            <li className="couponList" ref={this.props.copListRef}>
                <div className="couponName" data-couponId={this.props.couponId} data-value={this.props.money}>{this.props.money}{limiet}</div>
                 <div style={{display:this.props.noCoupon}}>暂不可使用</div>
                <div className="couponInput" onTouchEnd={this.couponClick.bind(this)} style={{display:this.props.normal}}>
                    <div className="selectNo" style={{display:'block'}}></div>
                    <div className="selectOk" style={{display:'none'}}>
                        <img src={require("../../../image/icon/selected_btn_ok.png")} alt=""/>
                    </div>
                </div>
            </li>
        )
    }
}
