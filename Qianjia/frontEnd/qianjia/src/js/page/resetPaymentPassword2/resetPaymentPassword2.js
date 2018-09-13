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
import './resetPaymentPassword2.scss'

//test_master

class   VerifypPaymentPassword2 extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that=this;
        //在此处初始化状态
        this.state={
            trueName:'',
            form:{
                smsCode:'',
                identity:''
            },
            productId:Utils.Url.parseUrl(location.hash).params.productId,
            addYield:Utils.Url.parseUrl(location.hash).params.addYield,
            investProjectId:Utils.Url.parseUrl(location.hash).params.investProjectId,

        }

        Utils.tokenExpireJumpToLogin(function () {
            //code存储
            let code = Utils.Url.parseUrl(location.hash).params.phoneCode;
            componentStore.update(that,{
                smsCode:code
            })
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
                            trueName:data.data.trueName
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
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    //下一步
    nextClick(){
        //alert('您点击了下一步');
    }
    render(){
        var that = this;
        //console.log('id:',this.state.productId);
        return (
            <div className="setPassword">
                <Backbar $id="verifypPaymentPassword" title="重置支付密码" >
                    <div className="resetPaymentPassword_2">
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
                        <div className="passwordBottom_2">
                            <h4>请输入&nbsp;{that.state.trueName}&nbsp;的身份证</h4>
                             <div className="code">
                                <Validate $id="identity" ref="validator"
                                        onError={(obj)=>{
                                            //console.error('元素'+rule+'验证未通过')
                                            Modal.alert('提示',obj.errorMsg, [
                                                { text: '取消', onPress: () => console.log('cancel') },
                                                { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                            ])
                                        }}>
                                    {/*身份证*/}
                                    <div className="inputItem flex-father mt30">
                                        <div className="label">身份证</div>
                                        <div className="flex-child1">
                                            <input className="inputText" type="number" value={that.state.form.identity} placeholder="请输入身份证号"
                                                onChange={(obj)=>{
                                                that.state.form.identity = obj.target.value;
                                                componentStore.update(that,that.state)
                                            }}
                                                data-validName="identity"
                                                data-validRules={[{
                                                name: 'require'
                                            }]}
                                                data-validMsgPrefix={'身份证'}
                                            />
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
                                                    //console.log('smsCode:---',Utils.Url.parseUrl(location.hash).params.phoneCode);
                                                    //console.log(that.state.smsCode);

                                                    Utils.requestData({
                                                        url: config.api + 'qj/front/v1/account/resetPayPassword',
                                                        method: 'post',
                                                        data:{
                                                            'smsCode':that.state.smsCode,
                                                            'certNo':that.state.form.identity
                                                        },
                                                        callback: function(data){
                                                            //Utils.switchRoute('/resetPaymentPassword3?phoneCode='+that.state.smsCode+'&certNo='+that.state.form.identity)
                                                        },
                                                        errorAlert: function(data){
                                                            if(data.resultCode == '2031003'){
                                                                let backUrl = Utils.Url.parseUrl(location.hash).params.backUrl;
                                                                //解绑页面
                                                                let closeBank = Utils.Url.parseUrl(location.hash).params.name;
                                                                //投资页面
                                                                let projectId = that.state.investProjectId;
                                                                if(backUrl){
                                                                    Utils.switchRoute('/resetPaymentPassword3?phoneCode='+that.state.smsCode+'&certNo='+that.state.form.identity+'&backUrl='+backUrl);
                                                                }else if(closeBank){
                                                                     Utils.switchRoute('/resetPaymentPassword3?phoneCode='+that.state.smsCode+'&certNo='+that.state.form.identity+'&name='+closeBank);
                                                                }else if(projectId){
                                                                     Utils.switchRoute('/resetPaymentPassword3?phoneCode='+that.state.smsCode+'&certNo='+that.state.form.identity+'&productId='+that.state.productId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId);
                                                                }else{
                                                                    Utils.switchRoute('/resetPaymentPassword3?phoneCode='+that.state.smsCode+'&certNo='+that.state.form.identity);
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

export default VerifypPaymentPassword2;
