import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import BankPassword from '../../module/bankPassword/bankPassword';
import Button from '../../module/button/button';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
//导入样式 start
import './resetPaymentPassword3.scss'

///test

class   VerifypPaymentPassword3 extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            smsCode:'',
            identity:'',
            productId:Utils.Url.parseUrl(location.hash).params.productId,
            addYield:Utils.Url.parseUrl(location.hash).params.addYield,
            investProjectId:Utils.Url.parseUrl(location.hash).params.investProjectId,
        }
        //存储手机验证码code
        let code = Utils.Url.parseUrl(location.hash).params.phoneCode;
        //存储身份证号
        let certNo = Utils.Url.parseUrl(location.hash).params.certNo;
        //在此处初始化状态
        componentStore.update(this,{
            smsCode:code,
            identity:certNo
        })

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
        //console.log('id:',document.getElementById('textInput'));
        let input = document.getElementById('textInput');
            input.value = '';
        let inputs = input.parentNode.lastChild.children;
        for(var i=0;i<inputs.length;i++){
            inputs[i].value = '';
        }
    }
    change(e){
        let that = this;
        var newPs = e.target.value.trim();
        if(newPs.length == 6){
            //console.log("您输入的值是："+num);
            //console.log('你输入完成！');
            Utils.requestData({
                    url: config.api + 'qj/front/v1/account/resetPayPassword',
                    method: 'post',
                    data:{
                        'smsCode':that.state.smsCode,
                        'certNo':that.state.identity,
                        'newPayPs':newPs
                    },
                    callback: function(data){
                        if(data.resultCode == 0){
                            let backUrl = Utils.Url.parseUrl(location.hash).params.backUrl;
                            //解绑页面
                            let closeBank = Utils.Url.parseUrl(location.hash).params.name;
                            //投资页面
                            let projectId = that.state.investProjectId;
                            if(backUrl){
                                Utils.switchRoute('/resetPaymentPasswordOk?title='+document.title+'&backUrl='+backUrl);
                            }else if(projectId){
                                Utils.switchRoute('/resetPaymentPasswordOk?title='+document.title+'&productId='+that.state.productId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId);
                            }else if(closeBank){
                                Utils.switchRoute('/resetPaymentPasswordOk?title='+document.title+'&name='+closeBank);
                            }else{
                                Utils.switchRoute('/resetPaymentPasswordOk?title='+document.title);
                            }

                        }
                    },
                    //错误处理 特殊情况特殊处理
                    errorAlert: function(data){
                        //console.log('支付密码之后的提示信息：',data);
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


    }
    //下一步
    // nextClick(){
    //     alert('您点击了下一步');
    // }
    render(){
        var that = this;

        return (
            <div className="setPassword">
                <Backbar $id="verifypPaymentPassword" title="重置支付密码" >
                    <div className="resetPaymentPassword_3">
                        <div className="passwordTop">
                            <div className="iconState">
                                <ul className="numState">
                                    <li>
                                        <div className="liInit curenter">1</div>
                                    </li>
                                    <li></li>
                                    <li> <div className="liInit curenter">2</div></li>
                                    <li></li>
                                    <li><div className="liInit curenter">3</div></li>
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
                        <div className="passwordBottom_3">
                            <h4>请设置新存管账户支付密码</h4>
                            <BankPassword $id="resetBankPassword" parentChange={that.change.bind(that)} ></BankPassword>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default VerifypPaymentPassword3;
