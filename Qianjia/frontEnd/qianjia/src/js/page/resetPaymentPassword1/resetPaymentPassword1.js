import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Button from '../../module/button/button';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
//导入样式 start
import './resetPaymentPassword1.scss'
var time;
class   VerifypPaymentPassword extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that = this;
        //在此处初始化状态
        this.state={
            mobile:'',
            form:{
                code:''
            },
            isCode:true,
            codeCount:60,
            productId:Utils.Url.parseUrl(location.hash).params.productId,
            addYield:Utils.Url.parseUrl(location.hash).params.addYield,
            investProjectId:Utils.Url.parseUrl(location.hash).params.investProjectId,
        }

        Utils.tokenExpireJumpToLogin(function () {
            //查询用户信息
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getUserInfo',
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){
                        //console.log(data.data);
                        // console.log(data.data.trueName);
                        // console.log(data.data.certCode);
                        componentStore.update(that,{
                            mobile:data.data.mobile
                        })

                    }
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
        //componentStore.update(this,{codeCount:0});
        // 清除 start
        this.code(false);
        componentStore.clear(this);
        // 清除 end
    };
    //验证码
    codeBtn(){
        //alert('功能未开发');
        let that=this;
        Utils.requestData({
            url: config.api + 'qj/front/v1/user/noPhoneSendSMC',
            method: 'post',
            data:{ "type": "RESET_PAY_PASSWORD"},
            callback: function(data){
                if(data.resultCode == 0){
                    //console.log(data.data);
                    Modal.alert('提示',data.data, [
                        { text: '确定', onPress: () => that.code(true), style: { fontWeight: 'bold' } },
                    ])
                }
            }
        });

    }

     //验证码倒计时
    code(bl){
        let that = this;
            componentStore.update(that,{isCode:false});
            let count = 60;
            if(bl){
                time=setInterval(function(){
                        count--;
                        componentStore.update(that,{codeCount:count});
                    if(count<=0){
                        //console.log('count小于0了');
                        componentStore.update(that,{isCode:true});
                        componentStore.update(that,{codeCount:60});
                        clearInterval(time);
                    }
                },1000);
            }else{
                //console.log('清除定时器')
                //console.log(time);
                clearInterval(time);
                componentStore.update(that,{isCode:true});
            }
        // let time=setInterval(function(){
        //         count--;
        //         componentStore.update(that,{codeCount:count});
        //     if(count<=0){
        //         //console.log('count小于0了');
        //         componentStore.update(that,{isCode:true});
        //         componentStore.update(that,{codeCount:60});
        //         clearInterval(time);
        //     }else{
        //         console.log(count);
        //     }
        // },1000)
    }
    render(){
        let that = this;
        let codeText = that.state.isCode? <button onTouchEnd={this.codeBtn.bind(this)}>发送验证码</button> : <button style={{color:'#ccc'}}>{that.state.codeCount+'秒'}</button>
        return (
            <div className="setPassword">
                <Backbar $id="verifypPaymentPassword" title="重置支付密码" >
                    <div className="resetPaymentPassword_1">
                        <div className="passwordTop">
                            <div className="iconState">
                                <ul className="numState">
                                    <li>
                                        <div className="liInit curenter">1</div>
                                    </li>
                                    <li></li>
                                    <li> <div className="liInit">2</div></li>
                                    <li></li>
                                    <li><div className="liInit">3</div></li>
                                    <li></li>
                                    <li><div className="liInit">4</div></li>
                                </ul>
                            </div>
                            <div>
                                <ul className="textState">
                                    <li>验证手机</li>
                                    <li> 验证身份证</li>
                                    <li>重置支付密码</li>
                                    <li>成功</li>
                                </ul>
                            </div>
                        </div>
                        <div className="passwordBottom_1">
                            <h4>您的手机号&nbsp;{that.state.mobile}</h4>
                             <div className="code">
                                <Validate $id="sesetPhone" ref="validator"
                                    onError={(obj)=>{
                                        //console.error('元素'+rule+'验证未通过')
                                        Modal.alert('提示',obj.errorMsg, [
                                            { text: '取消', onPress: () => console.log('cancel') },
                                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                        ])
                                    }}>
                                {/*验证码*/}
                                <div className="inputItem flex-father mt30">
                                    <div className="label">验证码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="number" value={that.state.form.code} placeholder="请输入验证码"
                                            onChange={(obj)=>{
                                               that.state.form.code = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="code"
                                            data-validRules={[{
                                               name: 'require'
                                           }]}
                                            data-validMsgPrefix={'验证码'}
                                        />
                                         {codeText}
                                    </div>
                                </div>

                                </Validate>
                             </div>
                            {/*<div className="err">
                                验证码错误
                            </div>
                            */}
                            <div className="inputItem noBorder bnt-red mt30" onClick={()=>{
                                    Utils.eventHanlder(function(){
                                        that.refs.validator.validate({
                                            callback: function(res){
                                                if(res){
                                                    //alert('成功')
                                                    //Utils.switchRoute('/resetPaymentPassword2');
                                                    Utils.requestData({
                                                        //
                                                        url:config.api+'qj/front/v1/account/resetPayPassword',
                                                        method: 'post',
                                                        data:{'smsCode':that.state.form.code},
                                                        callback: function(data){
                                                            if(data.resultCode == 0){
                                                                //缺少弹窗
                                                                // Modal.alert('提示',data.data, [
                                                                //     { text: '取消', onPress: () => console.log('cancel') },
                                                                //     { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                                                // ])
                                                            }else{
                                                                //Utils.switchRoute('');
                                                            }
                                                        },
                                                         //自定义错误
                                                        errorAlert: function(data){
                                                            console.log('验证码：',data);
                                                            if(data.resultCode == '2041001'){
                                                                let backUrl = Utils.Url.parseUrl(location.hash).params.backUrl;
                                                                //解绑页面
                                                                let closeBank = Utils.Url.parseUrl(location.hash).params.name;
                                                                //投资页面
                                                                let projectId = that.state.investProjectId;
                                                                if(backUrl){
                                                                    Utils.switchRoute('/resetPaymentPassword2?phoneCode='+that.state.form.code+'&productId='+that.state.productId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId+'&backUrl='+backUrl);
                                                                }else if(closeBank){
                                                                    Utils.switchRoute('/resetPaymentPassword2?phoneCode='+that.state.form.code+'&name='+closeBank);
                                                                }else if(projectId){
                                                                    Utils.switchRoute('/resetPaymentPassword2?phoneCode='+that.state.form.code+'&productId='+that.state.productId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId);
                                                                }else{
                                                                    Utils.switchRoute('/resetPaymentPassword2?phoneCode='+that.state.form.code);
                                                                }
                                                                //传递捕捉信号  给捕捉器
                                                                this.errorAlert.jail = true;
                                                            }

                                                        }
                                                    });

                                                }
                                            }
                                        });

                                    })
                                }}>
                                    下一步
                            </div>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default VerifypPaymentPassword;
