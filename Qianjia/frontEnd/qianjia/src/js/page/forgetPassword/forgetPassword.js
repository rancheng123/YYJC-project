import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './forgetPassword.scss'
//导入样式 end

import Backbar from '../../module/backbar2/backbar2';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
import TimeCount from '../../module/timeCount/timeCount'





class Login extends Component{
    constructor(){
        super();
    }
    componentWillMount(){


        var state = {
            phoneNum: '',
            password: '',
            confirmPassword: '',
            validCode: '',
            msgCode: '',
            uuid: Date.now(),
            gainMsgCode: true
        };

        //测试 start
        if(isInterface){
            state.phoneNum = '15010054582'
            state.validCode = '222'
            state.msgCode = "107814"
            state.password = 'l123456'
            state.confirmPassword = 'l123456'
        }


        //测试 end


        //在此处初始化状态
        this.state=state;
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

    render(){
        var that = this;


        return (
            <div className="forgetPassword bgWhite">



                    <Backbar $id="messageCenter">
                        找回密码
                    </Backbar>

                    <Validate ref="validator" $id="module3_validate" onError={(obj)=>{
                        //console.error('元素'+rule+'验证未通过')
                        Modal.alert('提示',obj.errorMsg, [
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])
                    }}>
                        <div className="inputItem flex-father">
                            <div className="label">
                                手机号
                                <span className="visibilityHide">隐</span>
                            </div>
                            <div className="flex-child1">
                                <input className="inputText" type="number" placeholder="请输入手机号"
                                       value={that.state.phoneNum}
                                       onChange={(ev)=>{
                                           componentStore.update(that,{
                                               phoneNum: ev.target.value
                                           })
                                       }}
                                       data-validName="phoneNum"
                                       data-validRules={[
                                           {
                                               name: 'require'
                                           },
                                           {
                                               name: 'iphone'
                                           }
                                       ]}
                                       data-validMsgPrefix={'手机号：'}
                                />
                            </div>
                        </div>
                        <div className="inputItem flex-father">
                            <div className="label">图形验证</div>
                            <div className="flex-child1 w400">
                                <input className="inputText pR30" type="text" placeholder="请输入图形验证码"
                                       value={that.state.validCode}
                                       onChange={(ev)=>{
                                           componentStore.update(that,{
                                               validCode: ev.target.value
                                           })
                                       }}
                                       data-validName="validCode"
                                       data-validRules={[{
                                           name: 'require'
                                       }]}
                                       data-validMsgPrefix={'图形验证码：'}
                                />
                            </div>
                            <div className="flex-child1">
                                <img id="checkCodeImg"  src={
                                    config.api+ "qj/front/v1/servlet/validateCodeServletAjax?uuid="+ that.state.uuid +"&width=50&height=20"
                                }
                                     className="validCode"
                                     onClick={(ev)=>{
                                         componentStore.update(that,{
                                             uuid: Date.now()
                                         })
                                     }}
                                />
                            </div>
                        </div>

                        <div className="inputItem flex-father">
                            <div className="label">
                                验证码
                                <span className="visibilityHide">隐</span>
                            </div>
                            <div className="flex-child1 w424">
                                <input className="inputText pR30" type="number" placeholder="请输入手机验证码"
                                       value={that.state.msgCode}
                                       onChange={(ev)=>{
                                           componentStore.update(that,{
                                               msgCode: ev.target.value
                                           })
                                       }}
                                       data-validName="msgCode"
                                       data-validRules={[
                                           {
                                               name: 'require'
                                           }
                                       ]}
                                       data-validMsgPrefix={'短信验证码：'}
                                />
                            </div>


                            {(function () {

                                if(that.state.gainMsgCode){
                                    return (
                                        <div className="flex-child1 btn-getMsgCode"
                                             onClick={()=>{
                                                 that.refs.validator.validate({
                                                     eleNames: ['phoneNum','validCode'],
                                                     callback: function(res){
                                                         if(res){

                                                             Utils.requestData({
                                                                 url: config.api + 'qj/front/v1/user/sendSMC',
                                                                 method: 'post',
                                                                 data: {
                                                                     "phone": that.state.phoneNum,
                                                                     "imgCode": that.state.validCode,
                                                                     "type": "FORGOT_PWD",
                                                                     "uuid": that.state.uuid
                                                                 },
                                                                 callback: function(data){

                                                                     if(data.resultCode == "0" ){
                                                                         componentStore.update(that,{
                                                                             gainMsgCode: false
                                                                         })
                                                                         Modal.alert('提示',data.data, [
                                                                             { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                                                         ])
                                                                     }
                                                                 }
                                                             });

                                                         }
                                                     }
                                                 });
                                             }}
                                        >
                                            获取验证码
                                        </div>
                                    )

                                }else{
                                    return (
                                        <TimeCount $id="login-timeCount"
                                                   onEnd={()=>{
                                                       componentStore.update(that,{
                                                           gainMsgCode: true
                                                       })
                                                   }}
                                        ></TimeCount>
                                    )

                                }
                            })()}


                        </div>

                        <div className="inputItem flex-father ">
                            <div className="label">
                                新密码
                                <span className="visibilityHide">隐</span>
                            </div>
                            <div className="flex-child1">
                                <input className="inputText" type="password" placeholder="请输入新密码(6-16位数字、字母组合)"
                                       value={that.state.password}
                                       onChange={(ev)=>{
                                           componentStore.update(that,{
                                               password: ev.target.value
                                           })
                                       }}
                                       data-validName="password"
                                       data-validRules={[
                                           {
                                               name: 'require'
                                           },
                                           {
                                               name: 'strRange',
                                               params: [6,16]
                                           },{
                                               name: 'letterAndNumber'
                                           }
                                       ]}
                                       data-validMsgPrefix={'新密码：'}
                                />
                            </div>
                        </div>

                        <div className="inputItem flex-father ">
                            <div className="label">确认密码</div>
                            <div className="flex-child1">
                                <input className="inputText" type="password" placeholder="请再次输入新密码(6-16位数字、字母组合)"
                                       value={that.state.confirmPassword}
                                       onChange={(ev)=>{
                                           componentStore.update(that,{
                                               confirmPassword: ev.target.value
                                           })
                                       }}
                                       data-validName="confirmPassword"
                                       data-validRules={[
                                           {
                                               name: 'require'
                                           },{
                                               name: 'strRange',
                                               params: [6,16]
                                           },{
                                               name: 'letterAndNumber'
                                           },
                                           {
                                               name: 'equal',
                                               params: {
                                                   name: 'password',
                                                   chinese: '新密码'
                                               }
                                           }
                                       ]}
                                       data-validMsgPrefix={'确认密码：'}
                                />
                            </div>
                        </div>




                        <div className="inputItem noBorder bnt-red mt30"
                             onClick={()=>{


                                 Utils.eventHanlder(function(){
                                     that.refs.validator.validate({
                                         callback: function(res){
                                             if(res){


                                                 Utils.requestData({
                                                     url: config.api + 'qj/front/v1/user/resetPassword',
                                                     method: 'post',
                                                     data: {
                                                         "phone": that.state.phoneNum,
                                                         "imgCode": that.state.validCode,
                                                         "smsCode": that.state.msgCode,
                                                         "password": that.state.password,
                                                         "password2": that.state.confirmPassword,
                                                         "uuid": that.state.uuid,
                                                     },
                                                     callback: function(data){
                                                         if(data.resultCode == 0){
                                                             Modal.alert('提示',data.data, [

                                                                 { text: '确定', onPress: () => {
                                                                    Utils.switchRoute('/login')
                                                                 }, style: { fontWeight: 'bold' } },
                                                             ])
                                                         }


                                                     }
                                                 });





                                             }
                                         }
                                     });

                                 })
                             }}
                        >
                            重置密码
                        </div>


                    </Validate>






            </div>
        )
    }

}

export default Login;
