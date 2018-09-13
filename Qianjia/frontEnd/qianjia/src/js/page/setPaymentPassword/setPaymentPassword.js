import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import BankPassword from '../../module/bankPassword/bankPassword';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
//导入样式 start
import './setPaymentPassword.scss'

class   SetPaymentPassword extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态

        this.state={
            oldPs:Utils.Url.parseUrl(location.hash).params.oldPayPs,
            focusRef:true
        }

        Utils.tokenExpireJumpToLogin(function () {

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
    click(){
        //备用
    };
    //清除输入内容
    nullVal(){
        console.log('id:',document.getElementById('textInput'));
        let input = document.getElementById('textInput');
            input.value = '';
        let inputs = input.parentNode.lastChild.children;
        for(var i=0;i<inputs.length;i++){
            inputs[i].value = '';
        }
    }
    change(e){
        var that=this;
        var newPs = e.target.value.trim();
        console.log(this.state.oldPs);
         Utils.requestData({
                //config.api
                url: config.api+'qj/front/v1/account/changePayPassword',
                method: 'post',
                data:{
                    "oldPayPs": this.state.oldPs,
                    "newPayPs": newPs
                },
                callback: function(data){
                    console.log('changePayPassword:',data);
                    if(data.resultCode == 0){
                        // Modal.alert('提示',data.data, [
                        //     { text: '确定', onPress: () => Utils.switchRoute('/resetPaymentPasswordOk'), style: { fontWeight: 'bold' } },
                        // ])
                        Utils.switchRoute('/PaymentPasswordOk?title='+document.title)

                    }else{
                        // Modal.alert('提示',data.resultMsg, [
                        //     { text: '取消', onPress: () => console.log('cancel') },
                        //     { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        // ])
                    }

                },
                //错误处理 特殊情况特殊处理
                // errorAlert: function(data){
                //     if(data.resultCode == 2031003){
                //         //Utils.switchRoute('/setPaymentPassword?oldPayPs='+num);
                //         //传递捕捉信号  给捕捉器
                //         this.errorAlert.jail = true;
                //     }

                // }

                //自定义错误
                errorAlert: function(data){
                    // if(data.resultCode == 2031003){
                    //     Utils.switchRoute('/setPaymentPassword?oldPayPs='+num);
                    //     //传递捕捉信号  给捕捉器
                    //     this.errorAlert.jail = true;
                    // }
                    console.log('errorAlert::',data)
                    if(data.resultCode == "E90015"){
                        Modal.alert('提示',data.resultMsg, [
                            { text: '确定', onPress: () => {
                                that.nullVal();
                            }, style: { fontWeight: 'bold' } },
                        ])
                        //传递捕捉信号  给捕捉器
                        this.errorAlert.jail = true;
                    }

                }
            });

    }
    render(){
        var that = this;
        console.log('光标状态：：：===',that.state.focusRef);
        return (
            <div className="setPassword">
                <Backbar $id="setPaymentPassword" title="修改支付密码" >
                    <div className="statePassword_2">
                        <div className="passwordTop">
                            <div className="iconState">
                                <ul className="numState">
                                    <li>
                                        <div className="liInit curenter">1</div>
                                    </li>
                                    <li></li>
                                    <li> <div className="liInit curenter">2</div></li>
                                    <li></li>
                                    <li><div className="liInit">3</div></li>
                                </ul>
                            </div>
                            <div>
                                <ul className="textState">
                                    <li>验证</li>
                                    <li></li>
                                    <li> 设置</li>
                                    <li></li>
                                    <li>成功</li>
                                </ul>
                            </div>
                            <div>
                                <ul className="reset">
                                    <li>原支付密码</li>
                                    <li> 新支付密码</li>
                                </ul>
                            </div>
                        </div>
                        <div className="passwordBottom_2">
                            <h4>请输入新存管账户支付密码</h4>
                            <BankPassword $id="setBankPassword" focusRef={that.state.focusRef} parentChange={that.change.bind(that)} ></BankPassword>
                            {/*<div className="err">
                                支付密码错误
                            </div>*/}
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default SetPaymentPassword;
