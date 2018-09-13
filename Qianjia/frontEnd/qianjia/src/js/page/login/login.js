import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './login.scss'
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
            isPasswordLogin: false,
            phoneNum: '',
            password: '',
            validCode: '',
            msgCode: '',
            uuid: Date.now(),
            gainMsgCode: true
        };

        //测试 start
        if(isInterface){
         /*   state.phoneNum = 13671398016
            state.validCode = 222
            state.msgCode = "107814"
            state.password = 'l123456'*/
            /* state.confirmPassword = 111*/
        }
        //测试 end

        //在此处初始化状态
        this.state=state
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end


       if(!Utils.Storage.isLocalStorageNameSupported()){
           alert('您的浏览器处于无痕浏览模式，此模式不支持本地存储，请关闭此模式，否则会影响您的正常使用')
       };

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    analysisRoute(){
        // 忘记密码  分享邀请好友  修改手机号  注册，  跳转至首页
        var fromPathName = Utils.momery.from.path;
        if( fromPathName == '/forgetPassword' ||
            fromPathName == '/inviteFriends' ||
            fromPathName == '/modifyPhone' ||
            fromPathName == '/regist'
        ){
            Utils.switchRoute('/home');
        }else{
            Utils.backRoute();
        }
    }


    render(){
        var that = this;


        return (
            <div className="login bgWhite">
                <Backbar $id="messageCenter"
                         backUrl="/home"
                >
                    登录
                </Backbar>

                <div className="imgWarp">
                    <img className="bg1" src={require('../../../image/img/k_top_bg-1.png')} alt=""/>
                    <img className="bg2 pos1" src={require('../../../image/img/k_photo2.jpg')} alt=""/>
                    <img style={{display:'none'}} className="bg3 pos2" src={require('../../../image/img/k_top_bg-2.png')} alt=""/>
                </div>

                <Validate ref="validator" $id="module3_validate" onError={(obj)=>{
                    //console.error('元素'+rule+'验证未通过')
                    Modal.alert('提示',obj.errorMsg, [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                    ])


                    {/*Toast.info(obj.errorMsg, 2);*/}
                }}>
                    <div className="inputItem flex-father mt30">
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

                    {(function () {
                        if(that.state.isPasswordLogin){
                            return (
                                <div className="inputItem flex-father">
                                    <div className="label">
                                        密
                                        <span className="visibilityHide">隐</span>
                                        码
                                        <span className="visibilityHide">隐</span>
                                    </div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="password" placeholder="请输入密码"
                                               value={that.state.password}
                                               onChange={(ev)=>{
                                                   componentStore.update(that,{
                                                       password: ev.target.value
                                                   })
                                               }}
                                               data-validName="password"
                                               data-validRules={[{
                                                   name: 'require'
                                               }]}
                                               data-validMsgPrefix={'密码：'}
                                        />
                                    </div>
                                </div>
                            )
                        }else{
                            return (
                                <div>
                                    <div  className="inputItem flex-father">
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

                                    <div  className="inputItem flex-father">
                                        <div className="label">短信验证码</div>
                                        <div className="flex-child1 w424">
                                            <input className="inputText pR30" type="number" placeholder="请输入短信验证码"
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
                                                    <div className="flex-child1 btn-getMsgCode" onClick={()=>{
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
                                                                            "type": "LOGIN",
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
                                                    }}>
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

                                </div>
                            )
                        }
                    })()}








                    <div className="inputItem noBorder clearfix " style={{visibility: that.state.isPasswordLogin?"visible":"hidden"}}>
                        <span className="color-fb343e font26 fr" onClick={()=>{
                            Utils.switchRoute('/forgetPassword')
                        }}>忘记密码？</span>
                    </div>

                    <div className="inputItem noBorder bnt-red mt30" onClick={()=>{


                        Utils.eventHanlder(function(){
                            that.refs.validator.validate({
                                callback: function(res){
                                    if(res){

                                        //密码登录
                                        if(that.state.isPasswordLogin){

                                            Utils.requestData({
                                                url: config.api + 'qj/front/v1/user/login',
                                                method: 'post',
                                                data: {
                                                    "phone": that.state.phoneNum,
                                                    "password": that.state.password,
                                                    //登录类型 1:ios 2:android 3:wap 4:pc
                                                    "postType": "3"
                                                },
                                                callback: function(data){
                                                    if(data.resultCode == 0){



                                                        // 2.登录
                                                        var timestamp = new Date().getTime();
                                                        var tprm = "loginType=" + "密码登录" + "&userId=" +data.data.memberId + "&userName=" + data.data.phone + "&timestamp=" + timestamp;
                                                        __ozfac2(tprm,'#loginSuccess');



                                                        var userInfo = data.data;
                                                        //设置过期时间
                                                        userInfo.expire_custom = 1000 * 60 * 60 *24;
                                                        Utils.Storage.set('user',userInfo);

                                                        that.analysisRoute();
                                                    }


                                                }
                                            });
                                        }
                                        //快捷登录
                                        else{
                                            Utils.requestData({
                                                url: config.api + 'qj/front/v1/user/quickLogin',
                                                method: 'post',
                                                data: {
                                                    "phone": that.state.phoneNum,
                                                    "smsCode": that.state.msgCode,
                                                    "postType" :"3" //登录类型
                                                },
                                                callback: function(data){
                                                    if(data.resultCode == 0){

                                                        // 2.登录
                                                        var timestamp = new Date().getTime();
                                                        var tprm = "loginType=" + "快捷登录" + "&userId=" +data.data.memberId + "&userName=" + data.data.phone + "&timestamp=" + timestamp;
                                                        __ozfac2(tprm,'#loginSuccess');


                                                        var userInfo = data.data;
                                                        //设置过期时间
                                                        userInfo.expire_custom = 1000 * 60 * 60 *24;
                                                        Utils.Storage.set('user',userInfo);

                                                        that.analysisRoute();
                                                    }


                                                }
                                            });
                                        }




                                    }
                                }
                            });

                        })
                    }}>
                        登录
                    </div>
                    <div className="inputItem noBorder textCenter mt30">
                        <span className="font26" onClick={()=>{
                            that.state.isPasswordLogin = !that.state.isPasswordLogin;
                            componentStore.update(that,that.state);

                            setTimeout(function () {
                                that.refs.validator.scan();
                            },300)

                        }}>
                            {(function () {
                                return that.state.isPasswordLogin?"快捷登录":"密码登录"
                            })()}

                        </span>
                        <span className="vertical-line"></span>
                        <span className="color-ff7404 font26" onClick={()=>{
                            Utils.switchRoute('/regist')
                        }}>立即注册</span>
                    </div>

                    <div className="hiddenBlock">

                    </div>

                </Validate>




            </div>
        )
    }

}

export default Login;
