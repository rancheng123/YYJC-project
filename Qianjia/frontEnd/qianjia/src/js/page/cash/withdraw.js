/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Toast,Modal } from 'antd-mobile';
import Backbar from '../../module/backbar/backbar';
import BankPassword from '../../module/bankPassword/bankPassword';
import Alert from '../../module/alert/alert';

//导入样式 start
import './cash.scss'
//导入样式 end

let globalObj;

class Withdraw extends Component{
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
            money : "",
            actualAmt : 0,   //可用余额
            myBankCard : { //我的银行卡
                bankName : "",
                bankCard : ""
            },
            cashModel : "T0",   //提现方式
            incAmount : 0,   //手续费
            isClickGetCashFee : true, //点击 提现按钮 时 判断 调用 getCashFee 接口
            passwordLength: false   //false 为可以输入密码， true 为不可以输入密码
        })

    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
        var _this = this;
        var withdrawTypeItem = document.getElementsByClassName('w-t-item');

        // for(var i=0;i<withdrawTypeItem.length;i++){
        //     withdrawTypeItem[i].index = i;
        //     withdrawTypeItem[i].addEventListener('touchend',function(){
        //         for(var j=0;j<withdrawTypeItem.length;j++){
        //             Utils.removeClass(withdrawTypeItem[j],"checked");
        //         }
        //
        //         Utils.addClass(this,"checked");
        //         if(this.index==0){
        //             componentStore.update(_this,{
        //                 cashModel:"T1"
        //             })
        //         }else if(this.index==1){
        //             componentStore.update(_this,{
        //                 cashModel:"T0"
        //             })
        //         }
        //
        //     })
        // }


    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    //关闭输入银行卡密码
    closeBank(e){
        //alert('您关闭了密码输入！')

        if(this.state.passwordLength==true)return false;
        componentStore.update(this,{
            bankPassword:false
        })
        e.preventDefault();
    }
    //银行输入框的事件
    parentChange(e,emptyPasswordHandle){
        let that = this;
        var num = e.target.value.trim();

        Utils.tokenExpireJumpToLogin(function () {
            //this.closeBank(e);
            componentStore.update(that,{
                passwordLength: true
            })
            Utils.requestData({ //请求用户信息
                url: config.api + 'qj/front/v1/cash/doCash',
                method: 'post',
                data:{
                    "payPwd": num,
                    "amount": that.state.money,
                    "cashModel":that.state.cashModel
                },
                callback: function(data){
                    componentStore.update(that,{
                        passwordLength: true
                    })
                    if(data.resultCode==0){
                        if(data.data.respCode=="000000"){
                            Utils.switchRoute('/withdrawing');
                            
                             var user = Utils.Storage.get('user');
                             var timestamp = new Date().getTime();
                             var tprm = "transAmt=" + that.state.money + "&userId=" + user.memberId + "&userName=" + user.phone + "&timestamp=" + timestamp;
                             __ozfac2(tprm,'#cashSuccess');
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

    withdrawHandle(){   //确认提现
        var that = this;

        Utils.tokenExpireJumpToLogin(function () {

            let money = Number(that.state.money);
            let actualAmt = Number(that.state.actualAmt)


            if(money==""){
                Modal.alert('提示',"请输入金额！", [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => console.log('ok') },
                ])
            }else if(Number(that.state.money[0]) == 0){
                Modal.alert('提示',"请输入正确的金额！", [
                    { text: '取消'},
                    { text: '确定'},
                ])
            }else if(that.state.money.split(".")[1]&&that.state.money.split(".")[1].length > 2){
                Modal.alert('提示',"最多只能保留2位小数！", [
                    { text: '取消'},
                    { text: '确定'},
                ])
            }else if(money<10){
                Modal.alert('提示',"最低提现额10元起！", [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => console.log('ok') },
                ])
            }else if(money>actualAmt){
                Modal.alert('提示',"提现金额不能大于可提现金额！", [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => console.log('ok') },
                ])
            }else{

                if(that.state.cashModel=="T1"){  //普通提现

                    componentStore.update(that,{
                        bankPassword:true
                    });

                }else if(that.state.cashModel=="T0"){    //快捷提现


                    if(that.state.isClickGetCashFee==true){
                        componentStore.update(that,{ //点击之后立马把此按钮点击功能去掉，在回调之后再开启点击功能
                            isClickGetCashFee:false
                        });

                        Utils.requestData({ //请求用户信息
                            url: config.api + 'qj/front/v1/cash/getCashFee',
                            method: 'post',
                            data:{
                                "amount": that.state.money
                            },
                            callback: function(data){
                                if(data.resultCode==0){
                                    if(data.data){
                                        componentStore.update(that,{
                                            incAmount:data.data.incAmount
                                        });
                                        document.getElementById('alert').style.display = 'block';

                                    }
                                }
                                componentStore.update(that,{
                                    isClickGetCashFee:true
                                });
                            },
                            errorAlert: function(){
                                componentStore.update(that,{
                                    isClickGetCashFee:true
                                });
                            }
                        })

                    }

                }


            }
        })

    }

    render(){
        let that = this;
        let bank = this.state.bankPassword? 'block' : 'none';
        let getUserInfo = this.state.getUserInfo;

        return (
            <div className="g-cash-main-box">
                <Backbar
                    $id="withdraw"
                    title="提现"
                    style={{
                        appearance:{
                            backgroundColor:"#fd4633",
                            borderBottom:"none"
                        },
                        character:{
                            color:"#fff"
                        }
                    }}
                    backUrl="/my"
                >

                    <div className="g-cash-wrap">
                        <div className="g-cash-head">
                            <div className="g-h-box g-balance">
                                <i></i>
                                <p>账户余额</p>
                            </div>
                            <div className="g-arrow"></div>
                            <div className="g-h-box g-bank">
                                <i></i>
                                <p>银行卡</p>
                            </div>
                        </div>
                        <div className="g-info">
                            <div className="g-line">
                                <i className="g-icon g-star"></i>
                                <p className="g-text">可提现金额: <span className="g-bold">{this.state.actualAmt}元</span></p>
                            </div>
                            <div className="g-line g-card">
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
                                        placeholder="最低提现额10元"
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
                                <span className="g-text3" onTouchEnd={()=>{
                                    componentStore.update(this,{
                                        money: this.state.actualAmt
                                    })
                                }}>全部提现</span>
                            </div>
                            {/*<div className="g-line withdraw-type">
                                <div className="w-t-item checked">
                                    <i className="i-circle"></i>
                                    <h4>普通提现 </h4>
                                    <span>(T+1)</span>
                                    <i className="i-line"></i>
                                </div>
                                <div className="w-t-item">
                                    <i className="i-circle"></i>
                                    <h4>快捷提现 </h4>
                                    <span>(T+0)</span>
                                </div>
                            </div>*/}
                        </div>
                        <div className="g-btn-tip clearfix">
                            <div className="g-txt">
                                <h3>温馨提示：</h3>
                                <p>1.无特殊原因，提现金额将在提现当日到账</p>
                                <p>2.用户需自行支付提现手续费，费用为提现金额的0.5‰+2元/笔</p>
                                <p>3.如有疑问请致电客服电话：400-831-6608</p>
                            </div>
                            <a className="g-link" href="/h5Static/withdrawRule.html">提现规则></a>
                        </div>

                    </div>

                </Backbar>

                <div className="g-bottom-btn">
                    <div className="g-btn" onTouchEnd={()=>{

                        this.withdrawHandle();

                    }}>确认提现</div>
                </div>


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
                                    Utils.switchRoute('/resetPaymentPassword1?backUrl=withdraw');
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

                <div id="alert" style={{display:"none"}}>
                    <div data-reactroot="" className="g-alert">
                        <div className="g-standard">
                            <div className="g-b-top">
                                <div className="g-circle">
                                    <span className="g-c-icon g-kaihu"></span>
                                </div>
                            </div>
                            <div className="g-content">
                                <div className="g-desc">
                                    <div className="desc-item">
                                        <span>本次提现：</span>
                                        <p>{this.state.money}元</p>
                                    </div>
                                    <div className="desc-item" style={{color:"#fb343e"}}>
                                        <span>手续费：</span>
                                        <p>{this.state.incAmount}元</p>
                                    </div>
                                    <div className="desc-item">
                                        <span>实际到账：</span>
                                        <p>{Utils.numSubtraction( Number(this.state.money),Number(this.state.incAmount) )}元</p>
                                    </div>
                                </div>
                            </div>
                            <div className="g-btn-box">
                                <div className="g-btn-mian">
                                    <span className="g-btn g-btn-first" onTouchEnd={()=>{
                                        document.getElementById('alert').style.display='none';
                                    }}>取消</span>
                                    <span className="g-btn g-btn-last" onTouchEnd={()=>{
                                        document.getElementById('alert').style.display='none';
                                        componentStore.update(this,{
                                            bankPassword:true
                                        });
                                    }}>确认</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}




export default Withdraw;
