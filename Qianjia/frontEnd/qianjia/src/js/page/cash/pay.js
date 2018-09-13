/**
 * Created by 唐丹 on 2017/6/1.
 */
 import React, { Component, PropTypes } from 'react';
 import { Icon,Toast,Modal } from 'antd-mobile';
 import Backbar from '../../module/backbar/backbar';
 import BankPassword from '../../module/bankPassword/bankPassword';
 import Alert from '../../module/alert/alert';

 import Clipboard from 'clipboard';


//导入样式 start
import './cash.scss'
//导入样式 end

let globalObj;

class Pay extends Component{
    constructor(){
        super();
        let that = this;
        globalObj = this;

        Utils.tokenExpireJumpToLogin(function () {

            Utils.requestData({ //请求用户信息
                url: config.api + 'qj/front/v1/user/getUserInfo',
                method: 'post',
                data:{},
                callback: function(data){
                    if(data.resultCode==0){
                        var data = data.data;
                        componentStore.update(that,{
                            getUserInfo : data
                        })
                    }
                }
            });

            Utils.requestData({ //查询余额接口
                url: config.api + 'qj/front/v1/account/queryAccountBalance',
                method: 'post',
                data:{},
                callback: function(data){
                    componentStore.update(that,{
                        actualAmt : data.data.actualAmt
                    })
                }
            });

            Utils.requestData({ //获取我的银行卡信息
                url: config.api + 'qj/front/v1/account/getMyBankCard',
                method: 'post',
                data:{},
                callback: function(data){
                    that.state.myBankCard.bankName = data.data.bankName;
                    that.state.myBankCard.bankCard = data.data.bankCard;
                    componentStore.update(that,{
                        myBankCard : that.state.myBankCard
                    })
                }
            });

        })

    }
    componentWillMount(){

        //在此处初始化状态
        this.setState({
            bankPassword:false,
            getUserInfo : {},    //获取用户信息
            money : "", //输入金额
            actualAmt : 0,   //可用余额
            myBankCard : { //我的银行卡
                bankName : "",
                bankCard : ""
            },
            isPaySuccess: false,
            passwordLength: false   //false 为可以输入密码， true 为不可以输入密码
        })

    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end


    };
    componentWillUnmount(){
        clearTimeout(this.timer);

        // 清除 start
        componentStore.clear(this);
        // 清除 end


    };
    //关闭输入银行卡密码
    closeBank(e){
        //alert('您关闭了密码输入！')
        if(this.state.passwordLength==true){
            return false;
        }
        componentStore.update(this,{
            bankPassword:false
        })
        e.preventDefault();
    }
    //银行输入框的事件
    parentChange(e,emptyPasswordHandle){
        var that = this;
        var num = e.target.value.trim();

        //this.closeBank(e);

        Utils.tokenExpireJumpToLogin(function () {
            componentStore.update(that,{
                passwordLength: true
            })
            Utils.requestData({
                url: config.api + 'qj/front/v1/netSave/doNetSave',
                method: 'post',
                data:{
                    "payPwd": num,
                    "amount": that.state.money
                },
                callback: function(data){
                    componentStore.update(that,{
                        passwordLength: true
                    })
                    if(data.resultCode==0){
                        if(data.data.respCode=="000000" || data.data.respCode=="000002"){

                            componentStore.update(that,{
                                isPaySuccess: true,
                                bankPassword: false
                            })
                            
                            var user = Utils.Storage.get('user');
                             var timestamp = new Date().getTime();
                             var tprm = "transAmt=" + that.state.money + "&userId=" + user.memberId + "&userName=" + user.phone + "&timestamp=" + timestamp;
                             __ozfac2(tprm,'#netsaveSuccess');
                        }
                    }
                },
                //自定义错误
                errorAlert: function(data){

                    emptyPasswordHandle(); //清空密码

                    if(data.resultCode==0){
                        if(data.data.respCode!="000000"){
                            componentStore.update(that,{
                                passwordLength: false
                            })
                            if(data.data.respCode == "50001"){  //请求超时
                                componentStore.update(that,{
                                    bankPassword:false
                                })
                                Modal.alert('提示',data.data.respDesc, [
                                    { text: '确定',onPress:()=>{Utils.backRoute();}}
                                ])
                            }else {

                                let wrap = document.createElement('div');
                                wrap.setAttribute("id",'wrapAlert');

                                wrap.innerHTML = '<div style="background: rgb(0, 0, 0);position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);color: rgb(255, 255, 255);font-size: 0.3rem;padding: 0.16rem;border-radius: 0.5rem;">'+data.data.respDesc+'</div>';

                                wrap.style.position = 'fixed';
                                wrap.style.left = '0px';
                                wrap.style.bottom = '0px';
                                wrap.style.width = '100%';
                                wrap.style.height = '4.3rem';
                                wrap.style.zIndex = '5';

                                document.body.appendChild(wrap);

                                setTimeout(function(){
                                    var oWrap = document.getElementById('wrapAlert');
                                    document.body.removeChild(oWrap);
                                },2000)
                            }
                            //传递捕捉信号  给捕捉器
                            this.errorAlert.jail = true;
                        }
                    }else{
                        componentStore.update(that,{
                            passwordLength: false,
                            bankPassword:false
                        })

                        Modal.alert('提示',"请求错误，请稍后再试！", [
                            { text: '取消'},
                            { text: '确定'},
                        ])
                    }

                }
            });
        })

    }
    payHandle(){   //确认提现
        let money = Number(this.state.money);
        if(money==""){
            Modal.alert('提示',"请输入金额！", [
                { text: '取消'},
                { text: '确定'},
            ])
        }else if(Number(this.state.money[0]) == 0){
            Modal.alert('提示',"请输入正确的金额！", [
                { text: '取消'},
                { text: '确定'},
            ])
        }else if(this.state.money.split(".")[1]&&this.state.money.split(".")[1].length > 2){
            Modal.alert('提示',"最多只能保留2位小数！", [
                { text: '取消'},
                { text: '确定'},
            ])
        }else if(money<100){
            Modal.alert('提示',"最低充值100元起！", [
                { text: '取消'},
                { text: '确定'},
            ])
        }else if(money>=100000){
            Modal.alert('提示',"充值金额超出单笔限额！", [
                { text: '取消'},
                { text: '确定'},
            ])
        }else{
            componentStore.update(this,{
                bankPassword:true
            });
        }

    }

    render(){
        let that = this;
        let bank = this.state.bankPassword? 'block' : 'none';
        let getUserInfo = this.state.getUserInfo;

        let clipboard = new Clipboard('.clipboard-box');
        clipboard.on('success', function(e) {
            Toast.info('复制成功', 1);
            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            Toast.info('浏览器不支持复制', 1);
        });

        /* 此处代码判断是否从重置密码页回来的 即 投资页-->充值页-->重置密码 start */
        let backbarBackUrl = '';
        let arrowLocationHref = Utils.Url.parseUrl(location.href);
        let arrowBackUrl = arrowLocationHref.params.backUrl;
        if(arrowBackUrl&&arrowBackUrl=="resetPaymentPasswordOk"){ //从重置密码回来
            if(arrowLocationHref.params.backUrlInvest=="investmentConfirmation"){
                backbarBackUrl = '/investmentConfirmation'+arrowLocationHref.query;
            }else{
                backbarBackUrl = '/my';
            }
        }
        /* 此处代码判断是否从重置密码页回来的 即 投资页-->充值页-->重置密码 end */

        return (
            <div className="g-cash-main-box">
                <Backbar
                    $id="myInvest"
                    title="充值"
                    style={{
                        appearance:{
                            backgroundColor:"#fd4633",
                            borderBottom:"none"
                        },
                        character:{
                            color:"#fff"
                        }
                    }}
                    backUrl = {backbarBackUrl}
                >

                    <div className="g-cash-wrap">
                        <div className="g-cash-head">
                            <div className="g-h-box g-bank">
                                <i></i>
                                <p>银行卡</p>
                            </div>
                            <div className="g-arrow"></div>
                            <div className="g-h-box g-balance">
                                <i></i>
                                <p>账户余额</p>
                            </div>
                        </div>
                        <div className="g-info">
                            <div className="g-line">
                                <i className="g-icon g-star"></i>
                                <p className="g-text">可用余额: <span className="g-bold">{this.state.actualAmt}元</span></p>
                            </div>
                            <div className="g-line g-card">
                                {/*<div className="g-line2">
                                    <i className="g-icon g-i"></i>
                                    <p className="g-text2">单笔限额：5万&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单日限额：5万</p>
                                </div>*/}
                                <i className="zhedang-border"></i>
                                <div className="g-line3">
                                    <i className="g-bank-new"></i>
                                    银行卡:
                                    <span className="g-bold">
                                        {that.state.myBankCard.bankName}(尾号{that.state.myBankCard.bankCard.substring( that.state.myBankCard.bankCard.length-4 )})
                                        {/*民生银行(尾号4322)*/}
                                        {/*<i className="g-quick">
                                            <b>快捷卡</b>
                                        </i>*/}
                                    </span>
                                </div>
                            </div>
                            <div className="g-line g-tixian">
                                <div className="g-tx-left">
                                    <i className="g-icon g-yuan"></i>
                                    <input
                                        placeholder="最低充值金额100元"
                                        value={this.state.money}
                                        type="number"
                                        className="g-input"
                                        onChange={(ev)=>{
                                            componentStore.update(this,{
                                                money: ev.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="g-btn-tip clearfix">
                            <div className="g-txt">
                                <h3>温馨提示：</h3>
                                <p>1.充值手续费已由钱夹垫付</p>
                                <button
                                    className="clipboard-box"
                                    data-clipboard-text="https://a.qianjialicai.com/shanba/temp/login.html"
                                >
                                    <p>2.大额充值请使用电脑端操作，点击复制网址：</p>
                                    <a href="javascript:;" style={{color:"#0a92dd"}}>https://a.qianjialicai.com/shanba/temp/login.html</a>
                                </button>
                                <p className="rule3">3.充值金额由金运通网络支付股份有限公司代收转入陕坝农商银行存管账户，请知悉</p>
                                <p>4.如有疑问请致电客服电话：400-831-6608</p>
                            </div>
                            <a className="g-link" href="/h5Static/payRule.html">充值规则></a>
                        </div>


                    </div>



                </Backbar>

                <div className="bankPassword" style={{display:bank}}>
                    <div className="mengceng"></div>
                    <div className="main-box">
                        <ul>
                            <li>请输入存管账户支付密码</li>
                            <li>银行卡：<span>{that.state.myBankCard.bankName}(尾号{that.state.myBankCard.bankCard.substring( that.state.myBankCard.bankCard.length-4 )})</span></li>
                            <li className="bankInput">
                                <BankPassword $id="withdrawBankPassword" parentChange={this.parentChange.bind(this)} passwordLength={this.state.passwordLength}></BankPassword>
                            </li>
                            <li>
                                <span className="passwordBtn" onTouchEnd={()=>{
                                    if(this.state.passwordLength==true){
                                        return false;
                                    }
                                    Utils.switchRoute('/resetPaymentPassword1?backUrl=pay')
                                }}>
                                    忘记密码？
                                </span>
                            </li>
                        </ul>
                        <div className="close" onTouchEnd={this.closeBank.bind(this)}>
                            <img src={require('../../../image/icon/icon_close.png')} alt=""/>
                        </div>
                    </div>
                </div>

                <div className="g-bottom-btn">
                    <div className="g-btn" onTouchEnd={()=>{
                        let that = this;
                        Utils.tokenExpireJumpToLogin(function () {
                            that.payHandle();
                        });


                    }}>立即充值</div>
                </div>

                {(function () {
                   
                    if(that.state.isPaySuccess){
                        let locationHref = Utils.Url.parseUrl(location.href);

                        let backUrl = locationHref.params.backUrl;

                        return (
                            <div className="my-book-box my-book-box-pay">
                                <div className="b-main" id="hei580">
                                    <img className="czcg" src={require('../../../image/icon/czcg.png')} alt=""/>
                                    <div className="msg">充值处理中，请耐心等待</div>
                                    <div className="tip">您的资金已由陕坝农商银行全程存管<br/>如有疑问请致电客服电话：<a href="tel:400-831-6608">400-831-6608</a></div>
                                    <div className="know-btn"  onClick={()=>{

                                        if(backUrl&&backUrl=="resetPaymentPasswordOk"){ //从重置密码回来
                                            if(locationHref.params.backUrlInvest=="investmentConfirmation"){    //从重置密码回到 充值页 到 投资确认页
                                                Utils.switchRoute('/investmentConfirmation'+locationHref.query);
                                            }else{
                                                Utils.switchRoute('/my');
                                            }
                                        }else{  //在充值页无任何跳转
                                            Utils.backRoute();
                                        }

                                    }}>
                                        我知道了
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })()}

            </div>

        )
    }

}

export default Pay;
