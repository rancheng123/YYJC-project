
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import BankPassword from '../../module/bankPassword/bankPassword';
//导入样式 start
import './autoBid.scss'
//导入样式 end



class AutoBidOpen extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            isCheckProtocol : false, //是否选中协议

            bankPassword:false,

            passwordLength: false,   //false 为可以输入密码， true 为不可以输入密码

            isShowAlert : false //是否显示支付密码弹窗
        }

    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
        var oAutoBid = document.getElementById('autoBidOpen');
        var parentHeight = oAutoBid.parentNode.offsetHeight;

        oAutoBid.style.height = parentHeight+"px";

    };
    componentWillUnmount(){
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
                url: config.api + 'qj/front/v1/autoInvest/checkPayPassword',
                method: 'post',
                data:{
                    "payPassword": num
                },
                callback: function(data){
    
                    componentStore.update(that,{
                        passwordLength: true
                    })
                    if(data.resultCode==0){
                        Utils.switchRoute('/autoBidInfo');
                    }
                },
                //自定义错误
                errorAlert: function(data){

                    emptyPasswordHandle(); //清空密码

                    if(data.resultCode!=0){
                        that.tipBox(data.resultMsg);
                        componentStore.update(that,{
                            passwordLength: false,
                            bankPassword:false
                        })
                    }

                    //传递捕捉信号  给捕捉器
                    this.errorAlert.jail = true;

                }
            });
        })

    }

    tipBox(desc){
        let wrap = document.createElement('div');
        wrap.setAttribute("id",'wrapAlert');

        wrap.innerHTML = '<div style="background: rgb(0, 0, 0);position: absolute;left: 50%;top: 50%;transform: translate(-50%,-90%);color: rgb(255, 255, 255);font-size: 0.26rem;padding: 0.16rem;border-radius: 0.5rem;">'+desc+'</div>';

        wrap.style.position = 'fixed';
        wrap.style.left = '0px';
        wrap.style.top = '50%';
        wrap.style.width = '100%';
        wrap.style.height = '4.08rem';
        wrap.style.zIndex = '10';
        wrap.style.transform = 'translate(0px, -2.54rem)';

        document.body.appendChild(wrap);

        setTimeout(function(){
            var oWrap = document.getElementById('wrapAlert');
            document.body.removeChild(oWrap);
        },2000)
    }

    render(){
        var that = this;
        // let bank = this.state.bankPassword? 'block' : 'none';
        let backbarBackUrl = "";
        if(Utils.Url.parseUrl(location.href).params.backUrl=="resetPaymentPasswordOk"){
             backbarBackUrl = "/my";
        }
        return (

            <Backbar
                $id="autoBidOpen"
                title="自动投标"
                backUrl = {backbarBackUrl} 
                action="autoBid"
            >
                <div className="autoBidOpen-wrap" id="autoBidOpen">
                    <div className="a-center">
                        <div className="a-money">
                            <i></i>
                        </div>
                        <h3 className="a-title">您尚未开启自动投标</h3>
                        <div className="a-protocol-box clearfix">
                            <div className={
                                (()=>{
                                    if(that.state.isCheckProtocol==true){
                                        return "a-protocol checked"
                                    }else{
                                        return "a-protocol"
                                    }
                                })()
                            } onClick={()=>{
                                if(that.state.isCheckProtocol==true){
                                    componentStore.update(that,{
                                        isCheckProtocol : false
                                    })
                                }else{
                                    componentStore.update(that,{
                                        isCheckProtocol : true
                                    })
                                }
                            }}>
                                <i></i>
                                <span>我已阅读并同意</span>
                            </div>
                            <a className="a-protocol-text" href="/h5Static/autoBidProtocol.html">
                                《钱夹自动投标服务协议》
                            </a>
                        </div>
                        <div  
                            className={
                                (()=>{

                                    if(that.state.isCheckProtocol==true){
                                        return "a-button";
                                    }else{
                                        return "a-button disabled";
                                    }

                                })()
                            } 
                            onClick={()=>{
                                if(that.state.isCheckProtocol==true){

                                    componentStore.update(that,{
                                        isShowAlert : true
                                    })

                                }
                            }}
                        >
                            立即开启
                        </div>
                    </div>
                </div>

                <div className="autoBid-alert" style={{display:this.state.isShowAlert==false?"none":"block"}}>
                    <div className="a-box">
                        <div className="bankPassword" style={{display:'block'}}>
                            <div className="mengceng"></div>
                            <div className="main-box">
                                <ul>
                                    <li>请输入存管账户支付密码</li>
                                    <li className="bankInput">
                                        <BankPassword $id="withdrawBankPassword" parentChange={this.parentChange.bind(this)} passwordLength={this.state.passwordLength}></BankPassword>
                                    </li>
                                    <li>
                                        <span className="passwordBtn" onTouchEnd={()=>{
                                            if(this.state.passwordLength==true){
                                                return false;
                                            }
                                            Utils.switchRoute('/resetPaymentPassword1?backUrl=autoBidOpen')
                                        }}>
                                            忘记密码？
                                        </span>
                                    </li>
                                </ul>
                                <div className="a-button">
                                    <span onClick={()=>{
                                        componentStore.update(this,{
                                            isShowAlert : false
                                        })
                                    }}>
                                        取消
                                    </span>
                                    <span onClick={()=>{

                                        this.tipBox('请输入密码');
                                    }}>
                                        确认
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Backbar>

        )
    }

}

export default AutoBidOpen;
