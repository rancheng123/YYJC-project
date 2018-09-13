
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
 import BankPassword from '../../module/bankPassword/bankPassword';

//导入样式 start
import './autoBid.scss'
//导入样式 end



class AutoBidProtocol extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态

        this.state = {
            bankPassword:false,

            passwordLength: false,   //false 为可以输入密码， true 为不可以输入密码

            isShowAlert : false //是否显示支付密码弹窗
        }


    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
        var oAutoBidProtocol = document.getElementById('autoBidProtocol');
        var parentHeight = oAutoBidProtocol.parentNode.offsetHeight;
        console.log(parentHeight);
        oAutoBidProtocol.style.minHeight = parentHeight+"px";
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
        console.log('密码：',num);
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
                    console.log('checkPayPassword:::',data);
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
        let that = this;
        let bank = this.state.bankPassword? 'block' : 'none';
        return (

            <Backbar $id="autoBidProtocol" title="自动投标服务协议">
                <div className="autoBidProtocol-wrap" id="autoBidProtocol">
                    <h3>自动投标服务协议</h3>
                    <p className="a-indent">鉴于：____网络借贷平台（下称“平台”）由____负责运营。平台注册用户（下称“用户”）、_______及内蒙古陕坝农村商业银行股份有限公司已于    年    月    日签订《内蒙古陕坝农村商业银行股份有限公司网络交易资金账户服务三方协议》（下称“《三方协议》”）。</p>
                    <p className="a-indent">就《三方协议》的相关内容，用户做出如下授权及同意：</p>
                    <p>一、用户在此授权，内蒙古陕坝农村商业银行股份有限公司有权根据用户在平台方的投融资活动、指令及平台方的指令，对用户的电子账户进行免密操作，以便用户在平台上正常开展投融资活动。</p>
                    <p>二、用户同意，开通《三方协议》项下的所有服务及其相应的委托支付产品、电子账户，同时授权内蒙古陕坝农村商业银行股份有限公司按照平台方（****）的指令对用户开通的电子账户进行操作，用户已知晓上述服务可能无需用户再次输入支付密码。</p>
                    <p>三、用户同意，在使用《三方协议》项下的服务时的意思表示均出自于用户本人的真实意愿。同时，用户确保在使用服务时所填写的信息均真实有效，否则因此</p>
                    <div className="a-agree" onClick={()=>{
                        componentStore.update(this,{
                            isShowAlert : true
                        })
                    }}>
                        我已阅读并同意
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
                                            Utils.switchRoute('/resetPaymentPassword1?backUrl=pay')
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

export default AutoBidProtocol;
