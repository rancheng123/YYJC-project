import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './inviteFriends.scss'
//导入样式 end

import Backbar from '../../module/backbar2/backbar2';

import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
import TimeCount from '../../module/timeCount/timeCount'



class InviteFriends extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        var state = {
            isPasswordLogin: false,
            phoneNum: '',
            password: '',
            validCode: '',
            msgCode: '',
            uuid: Date.now(),
            step: 1,
            gainMsgCode: true
        };

        //测试 start
        /*isInterface= true
        if(isInterface){
            state.phoneNum = 13671398016
            state.validCode = 222
            state.msgCode = "107814"
            state.password = 'l123456'
             state.confirmPassword = 'l123456'
        }*/
        //测试 end

        //在此处初始化状态
        this.state=state
    }

    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end


        /*测试 start*/

       /* componentStore.update(that,{
            step: 3
        })
        setTimeout(function () {
            that.refs.validator.scan();
        },300)*/
        /*测试 end*/


    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end

    };

    render(){
        var that = this;


        return (
            <div className="login bgWhite  inviteFriends">
                <Backbar $id="messageCenter" inviteIndex="true">
                    邀请好友
                </Backbar>

                <div className="bg">
                    <Validate ref="validator" $id="module3_validate" onError={(obj)=>{
                        //console.error('元素'+rule+'验证未通过')
                        Modal.alert('提示',obj.errorMsg, [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])

                    }}>
                        <a href="javascript:;" className="share_qianjia"></a>
                        <img alt="" src={require('../../../image/img/share_bg.png')}  className="share_bg" />


                        {(function () {
                            if(that.state.step == 1){
                                return (
                                    <div>
                                        <div className="mt52">
                                            <input type="number" className="textInput" placeholder="请输入手机号"
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
                                        <div className="mt22 posRel">
                                            <input className="textInput pR30" type="text" placeholder="请输入图形验证码"
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
                                )
                            }
                        })()}



                        {(function () {
                            if(that.state.step == 2){
                                return (<div>
                                    <div className="mt22 posRel flex-father" >
                                        <div className="flex-child1 w424">
                                            <input className="pR30 textInput" type="number" placeholder="请输入手机验证码"
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

                                                             //无需在校验，因为第一步已经校验
                                                             Utils.requestData({
                                                                 url: config.api + 'qj/front/v1/user/sendSMC',
                                                                 method: 'post',
                                                                 data: {
                                                                     "phone": that.state.phoneNum,
                                                                     "imgCode": that.state.validCode,
                                                                     "type": "INVITE_REG",
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

                                    <div className="mt22 posRel">
                                        <input className="textInput" type="password" placeholder="请设置密码(6-16位数字、字母组合)"
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
                                               data-validMsgPrefix={'设置密码：'}
                                        />
                                    </div>

                                    <div className="mt22 posRel">
                                        <input className="textInput" type="password" placeholder="请再次输入密码(6-16位数字、字母组合)"
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
                                                           chinese: '设置密码'
                                                       }
                                                   }
                                               ]}
                                               data-validMsgPrefix={'确认密码：'}
                                        />
                                    </div>
                                </div>)
                            }
                        })()}

                        {(function () {
                            if(that.state.step == 3){
                                return (<div className="mt22 posRel">
                                    <input className="textInput" type="number" placeholder="请输入邀请人手机号（非必填）"
                                           value={that.state.inviterPhoneNum}
                                           onChange={(ev)=>{
                                               componentStore.update(that,{
                                                   inviterPhoneNum: ev.target.value
                                               })
                                           }}
                                           data-validName="inviterPhoneNum"
                                           data-validRules={[
                                               {
                                                   name: 'iphone'
                                               }
                                           ]}
                                           data-validMsgPrefix={'邀请人手机号：'}
                                    />
                                </div>)
                            }
                        })()}






                        <div className="mt52">
                            <div className="redBtn" onClick={()=>{


                                if(that.state.step == 1){
                                    that.refs.validator.validate({
                                        eleNames: ['phoneNum','validCode'],
                                        callback: function(res){
                                            if(res){

                                                //校验图形验证码
                                                Utils.requestData({
                                                    url: config.api + 'qj/front/v1/user/inviteReg',
                                                    method: 'post',
                                                    data: {
                                                        "phone": that.state.phoneNum,
                                                        "password": that.state.password,
                                                        "password2": that.state.confirmPassword,
                                                        "smsCode": that.state.msgCode,
                                                        "inviterPhone":that.state.inviterPhoneNum,
                                                        "postType": "3",
                                                        "imgCode": that.state.validCode,
                                                        "uuid": that.state.uuid,
                                                    },
                                                    //自定义错误
                                                    errorAlert: function(data){
                                                        //此码代表 图形验证码通过
                                                        if(data.resultCode==101013){

                                                            componentStore.update(that,{
                                                                step: 2
                                                            });
                                                            setTimeout(function () {
                                                                that.refs.validator.scan();
                                                            },300)


                                                            //传递捕捉信号  给捕捉器
                                                            this.errorAlert.jail = true;

                                                        }
                                                    }
                                                });



                                            }
                                        }
                                    });
                                }else if(that.state.step == 2){


                                    that.refs.validator.validate({
                                        eleNames: ['msgCode','password','confirmPassword'],
                                        callback: function(res){
                                            if(res){


                                                //校验短信验证码
                                                Utils.requestData({
                                                    url: config.api + 'qj/front/v1/user/inviteReg',
                                                    method: 'post',
                                                    data: {
                                                        "phone": that.state.phoneNum,
                                                        "password": that.state.password,
                                                        "password2": that.state.confirmPassword,
                                                        "smsCode": that.state.msgCode,
                                                        "postType": "3",
                                                        "imgCode": that.state.validCode,
                                                        "uuid": that.state.uuid,
                                                        "inviterCode": Utils.Url.parseUrl(location.href).params.inviterCode
                                                    },
                                                    callback: function(data){

                                                        if(data.resultCode == 0){
                                                            Modal.alert('提示',"注册成功", [
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
                                }



                            }}>
                                注册领加息特权
                            </div>
                        </div>
                        <div className="mt52" id="login" onClick={()=>{
                            Utils.switchRoute('/login')
                        }}>
                            已有账户请点击此处登录
                        </div>

                        <img className="topImg share_qj" alt=""
                             src={require('../../../image/img/share_qianjia.jpg')}
                              />


                    </Validate>
                </div>



            </div>
        )
    }

}

export default InviteFriends;
