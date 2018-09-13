import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
//导入样式 start
import './modifyPassword.scss'

class Password extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            form:{
                password:'',
                newPassword:'',
                repeatNewPassword:''
            }
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

    render(){
        var that = this;

        return (
            <div className="setPassword">
                <Backbar $id="modifyPassword" title="修改登录密码" >
                    <div className="">
                        <Validate $id="password" ref="validator"
                            onError={(obj)=>{
                                //console.error('元素'+rule+'验证未通过')
                                Modal.alert('提示',obj.errorMsg, [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                ])
                            }}>
                            {/*旧密码*/}
                                <div className="inputItem flex-father mt30">
                                    <div className="label">原密码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="password" placeholder="请输入原密码(6-16位数字、字母组合)"
                                            value={that.state.form.password}
                                            onChange={(obj)=>{
                                               that.state.form.password = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="password"
                                            data-validRules={[
                                                {name: 'require'},
                                                {name: 'password'}
                                            ]}
                                            data-validMsgPrefix={'原密码：'}
                                        />
                                    </div>
                                </div>
                            {/*新密码*/}
                                <div className="inputItem flex-father mt30">
                                    <div className="label">新密码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="password" value={that.state.form.newPassword} placeholder="请输入新密码(6-16位数字、字母组合)"
                                            onChange={(obj)=>{
                                               that.state.form.newPassword = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="newPassword"
                                            data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'equal',
                                               params: {
                                                   name: 'repeatNewPassword',
                                                   chinese: '确认密码'
                                               }
                                           }]}
                                            data-validMsgPrefix={'新密码：'}
                                        />
                                    </div>
                                </div>
                            {/*再次确认密码*/}
                                <div className="inputItem flex-father mt30">
                                    <div className="label">新密码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="password" value={that.state.form.repeatNewPassword} placeholder="再次输入新密码(6-16位数字、字母组合)"
                                            onChange={(obj)=>{
                                                 that.state.form.repeatNewPassword = obj.target.value;
                                                 componentStore.update(that,that.state)
                                             }}
                                            data-validName="repeatNewPassword"
                                            data-validRules={[
                                                {name: 'require'}
                                           ]}
                                            data-validMsgPrefix={'确认新密码：'}
                                        />
                                    </div>
                                </div>
                            {/*确认修改*/}
                                <div className="inputItem noBorder bnt-red mt30" onClick={()=>{
                                    Utils.eventHanlder(function(){
                                        that.refs.validator.validate({
                                            callback: function(res){
                                                if(res){
                                                    Utils.requestData({
                                                            url: config.api + 'qj/front/v1/user/changePassword',
                                                            method: 'post',
                                                            data: {                                                           
                                                                "curPassword": that.state.form.password,
                                                                "password":  that.state.form.newPassword,
                                                                "password2":that.state.form.repeatNewPassword
                                                                },
                                                            callback: function(data){
                                                                if(data.resultCode == 0){
                                                                    Modal.alert('提示',data.data, [
                                                                        { text: '确定', onPress: () => Utils.switchRoute('/userSecurity'), style: { fontWeight: 'bold' } },
                                                                    ])
                                                                }else{
                                                                    Modal.alert('提示',data.resultMsg, [
                                                                        { text: '确定', onPress: () => console.log('OK'), style: { fontWeight: 'bold' } },
                                                                    ])
                                                                }
                                                            }
                                                            
                                                        });
                                                }
                                            }
                                        });

                                    })
                                }}>
                                    设置新密码
                                </div>
                        </Validate>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default Password;
