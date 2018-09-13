import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './regist.scss'
//导入样式 end

import Backbar from '../../module/backbar2/backbar2';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
import TimeCount from '../../module/timeCount/timeCount'


class Regist extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        var state = {
            phoneNum: '',
            inviterPhoneNum: '',
            password: '',
            confirmPassword: '',
            validCode: '',
            msgCode: '',
            uuid: Date.now(),
            gainMsgCode: true
        };

        //测试 start


          /*  state.phoneNum = '13671398016'
            state.inviterPhoneNum = ''
            state.validCode = '222'
            state.msgCode = "107814"
            state.password = 'l123456'
            state.confirmPassword = 'l123456'*/


        /*// 2.登录
        var timestamp = 1508403979727;
        var tprm = "loginType=" + "密码登录" + "&userId=" + "401769" + "&userName=" + "13671398016" + "&timestamp=" + timestamp;
        __ozfac2(tprm,'#loginSuccess');

        //注册
        var tprm = "userId=" + "401769" + "&userName=" + "13671398016";
        __ozfac2(tprm,'#regSuccess');*/


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

    analysisRoute(){
        var fromPathName = Utils.momery.from.path;
        // 登录，  跳转至首页
        if( fromPathName == '/login' ){
            Utils.switchRoute('/home');
        }else{
            Utils.backRoute();
        }
    }

    render(){
        var that = this;


        return (
            <div className="regist bgWhite">

                <Backbar $id="messageCenter">
                    注册
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
                            <img id="checkCodeImg" src={
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
                                                             "type": "REG",
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
                        <div className="label">设置密码</div>
                        <div className="flex-child1">
                            <input className="inputText" type="password" placeholder="请设置密码(6-16位数字、字母组合)"
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
                    </div>

                    <div className="inputItem flex-father ">
                        <div className="label">确认密码</div>
                        <div className="flex-child1">
                            <input className="inputText" type="password" placeholder="请再次输入密码(6-16位数字、字母组合)"
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
                    </div>

                    <div className="inputItem flex-father ">
                        <div className="label">邀请人手机号</div>
                        <div className="flex-child1">
                            <input className="inputText" type="number" placeholder="请输入邀请人手机号（非必填）"
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
                        </div>
                    </div>

                    <div className="inputItem noBorder inputItem2">
                        <span className="color-ff7404 font20">* 填写邀请人手机号，首次注册可获得加息特权</span>
                    </div>

                    <div className="inputItem noBorder bnt-red mt30" onClick={()=>{
                        Utils.eventHanlder(function(){
                            that.refs.validator.validate({
                                callback: function(res){
                                    if(res){


                                        Utils.requestData({
                                            url: config.api + 'qj/front/v1/user/reg',
                                            method: 'post',
                                            data: {
                                                "phone": that.state.phoneNum,
                                                "password": that.state.password,
                                                "password2": that.state.confirmPassword,
                                                "smsCode": that.state.msgCode,
                                                "inviterPhone":that.state.inviterPhoneNum,
                                                "postType": "3"
                                            },
                                            callback: function(data){
                                                if(data.resultCode == 0){

                                                   // 1.注册成功
                                                    var tprm = "userId=" + data.data.memberId + "&userName=" + data.data.phone;
                                                    __ozfac2(tprm,'#regSuccess');






                                                    Modal.alert('提示',"注册成功", [

                                                        { text: '确定', onPress: () => {
                                                            var userInfo = data.data;
                                                            //设置过期时间
                                                            userInfo.expire_custom = 1000 * 60 * 60 *24;
                                                            Utils.Storage.set('user',userInfo);

                                                            that.analysisRoute();
                                                        }, style: { fontWeight: 'bold' } },
                                                    ])
                                                }


                                            }
                                        });

                                    }
                                }
                            });

                        })
                    }}>
                        同意协议并注册
                    </div>
                    <div className="inputItem inputItem2 noBorder ">
                    <span className="font20 color-ff7404">
                        <span onClick={()=>{
                            window.location.href="/h5Static/platformRegsitTreaty.html";
                        }}>《钱夹平台注册服务协议》</span>
                        <span  onClick={()=>{
                            window.location.href="/h5Static/privacyStatement-xy.html";
                        }}>《钱夹平台隐私保护声明》</span>
                    </span>
                    </div>


                    <div className="inputItem noBorder textCenter ">
                    <span className="font26">
                       已有账号，
                    </span>
                        <span className="color-ff7404 font26" onClick={()=>{
                            Utils.switchRoute('/login')
                        }}>马上登录</span>
                    </div>
                </Validate>






            </div>
        )
    }

}

export default Regist;
