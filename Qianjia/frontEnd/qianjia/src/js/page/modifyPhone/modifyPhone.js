import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'


//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
//导入样式 start
import './modifyPhone.scss'
var time;
class ModifyPhone extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            form:{
                phone:'',
                code:''
            },
            isCode:true,
            codeCount:60
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
        clearInterval(time);
    };
    //获取验证码
    getCode(){
        //alert('1');
        let that = this;
        that.refs.validator.validate({
            eleNames: ['phone'],
            callback: function(res){
                if(res){
                    Utils.requestData({
                        url: config.api + 'qj/front/v1/user/sendSMC',
                        method: 'post',
                        data: {                                                           
                            "phone": that.state.form.phone,
                            "type":'REST_PHONE'
                            },
                        callback: function(data){
                            if(data.resultCode == 0){
                                Modal.alert('提示',data.data, [
                                    { text: '确定', onPress: () =>that.code(), style: { fontWeight: 'bold' } },
                                ])
                                
                            }
                        }
                        
                    });
                }
            }
        })
    }
    //验证码倒计时
    code(){
        let that = this;
            componentStore.update(that,{isCode:false});
            let count = 60;
         time=setInterval(function(){
                count--;
                componentStore.update(that,{codeCount:count});
            if(count<=0){
                componentStore.update(that,{isCode:true});
                componentStore.update(that,{codeCount:60});
                clearInterval(time);
            }
        },1000)
    }
    render(){
        let that = this;
        let codeText = that.state.isCode? <i onClick={this.getCode.bind(this)}>获取验证码</i> : <i style={{color:'#ccc'}}>{that.state.codeCount+'秒'}</i>
        return (
            <div className="setPhone">
                <Backbar $id="modifyPhone" title="修改登录手机号" >
                    <div className="">
                        <Validate $id="phone" ref="validator"
                            onError={(obj)=>{
                                //console.error('元素'+rule+'验证未通过')
                                Modal.alert('提示',obj.errorMsg, [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                ])
                            }}>
                            {/*手机号*/}
                                <div className="inputItem flex-father">
                                    <div className="label">手机号</div>
                                    <div className="flex-child1">
                                        <input className="inputText code" type="number" placeholder="请输入您的手机号"
                                            value={that.state.form.phone}
                                            onChange={(obj)=>{
                                               that.state.form.phone = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="phone"
                                            data-validRules={[
                                                {name: 'require'},
                                                {name:'iphone'}
                                            ]}
                                            data-validMsgPrefix={'手机号'}
                                        />
                                        <span className="getCode"
                                            
                                        >{codeText}</span>
                                    </div>
                                </div>
                            {/*验证码*/}
                                <div className="inputItem flex-father">
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
                                    </div>
                                </div>
                            {/*确认修改*/}
                                <div className="inputItem noBorder bnt-red btn_mgtop" onClick={()=>{
                                    Utils.eventHanlder(function(){
                                        that.refs.validator.validate({
                                            callback: function(res){
                                                if(res){
                                                    //alert('设置成功！')
                                                    Utils.requestData({
                                                            url: config.api + 'qj/front/v1/user/resetMemberPhone',
                                                            method: 'post',
                                                            data: {                                                           
                                                                "phone": that.state.form.phone,
                                                                "smsCode":that.state.form.code
                                                                },
                                                            callback: function(data){
                                                                if(data.resultCode == 0){
                                                                    Modal.alert('提示',data.data, [
                                                                        { text: '确定', onPress: () => Utils.switchRoute('/login'), style: { fontWeight: 'bold' } },
                                                                    ])
                                                                }
                                                            }
                                                            
                                                        });
                                                }
                                            }
                                        });

                                    })
                                }}>
                                    确定
                                </div>
                        </Validate>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default ModifyPhone;
