import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'
import globalData from './data'; //数据
//导入样式 start
import './openBank.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Picker from '../../widget/picker/picker';
import Alert from '../../module/alert/alert';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';


class OpenBank extends Component{
    constructor(){
        super();
    }
    
    componentWillMount(){
         //在此处初始化状态
        let that = this;
        this.state={
            check:true,
            buttonState:true,
            form:{
                parson:'',
                certificates:'',
                phone:'',
                Email:'',
                code:'',
                newPassword:'',
                repeatNewPassword:''
            },
            isCode:true,
            codeCount:60,
            data: globalData.data

        }
        Utils.tokenExpireJumpToLogin(function () {
            let isTrueMan = Utils.Url.parseUrl(location.href).params.isTrueMan;
            console.log('拦截：：：',isTrueMan);
            if(isTrueMan==1){ //是连连老用户
                Utils.requestData2({
                    requestArr:  [
                        //获取投资订单详情
                        {
                            url: config.api +"qj/front/v1/user/getUserInfo",
                            method: 'post',
                            data: {

                            }
                        }
                    ],
                    callback: function(dataArr){
                        //获取投资订单详情
                        var getUserInfo = dataArr[0];
                        console.log('getUserInfo:',getUserInfo);
                        // alert('1111')
                        if(getUserInfo.resultCode==0){

                            that.state.form.parson = getUserInfo.data.trueNameReal;
                            that.state.form.certificates = getUserInfo.data.certCodeReal;
                            that.state.form.Email = getUserInfo.data.emailReal;
                            that.state.form.phone = getUserInfo.data.phone;
                            // that.state.form.code = getUserInfo.data.certCodeReal;
                            componentStore.update(that,that.state);

                            // componentStore.update(that,{
                            //     form:{
                            //             parson:getUserInfo.data.trueNameReal,
                            //             certificates:getUserInfo.data.certCodeReal,
                            //             phone:getUserInfo.data.phone,
                            //             Email:getUserInfo.data.emailReal,
                            //             code:getUserInfo.data.certCodeReal
                            //         }
                            // });

                        }

                    }
                })
            }
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

    onChange(data){}
    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }
    render(){
        var that = this;
        var checkFalse = that.state.check?'' : ' bnt-ccc';
        //console.log(that.state.isCode);
        return (
            <div className="openBank">
                <Backbar $id="modifyPassword" title="开户不用这个了用完善收款账户" >
                    <div className="">
                        <Validate $id="password" ref="validator"
                            onError={(obj)=>{
                                //console.error('元素'+rule+'验证未通过')
                                Modal.alert('提示',obj.errorMsg, [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                ])
                            }}>
                                <div className="bankImg">
                                    <img src={require('../../../image/img/bankImgLog.png')} alt=""/>
                                </div>
                            {/*姓名*/}
                                <div className="inputItem flex-father">
                                    <div className="label">姓名</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" value={that.state.form.parson} placeholder="请输入姓名"
                                            onChange={(obj)=>{
                                                that.state.form.parson = obj.target.value;
                                                componentStore.update(that,that.state)
                                            }}
                                            data-validName="parson"
                                            data-validRules={[
                                                {name: 'require'}
                                        ]}
                                            data-validMsgPrefix={'姓名'}
                                        />
                                    </div>
                                </div>
                            {/*身份证号*/}
                                <div className="inputItem flex-father">
                                    <div className="label">身份证号</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" value={that.state.form.certificates} placeholder="请输入身份证号"
                                            onChange={(obj)=>{
                                                that.state.form.certificates = obj.target.value;
                                                componentStore.update(that,that.state)
                                            }}
                                            data-validName="certificates"
                                            data-validRules={[
                                                {name: 'require'},
                                                {name:'isCardNo'}
                                        ]}
                                            data-validMsgPrefix={'身份证'}
                                        />
                                    </div>
                                </div>
                            {/*邮箱*/}
                                <div className="inputItem flex-father">
                                    <div className="label">邮箱</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" value={that.state.form.Email} placeholder="请输入电子邮箱地址"
                                            onChange={(obj)=>{
                                                that.state.form.Email = obj.target.value;
                                                componentStore.update(that,that.state)
                                            }}
                                            data-validName="Email"
                                            data-validRules={[
                                                {name: 'require'},
                                                {name: 'email'}
                                        ]}
                                            data-validMsgPrefix={'邮箱地址'}
                                        />
                                    </div>
                                </div>
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
                                       {
                                            name: 'require'
                                       },
                                       {
                                           name: 'iphone'
                                       }
                                   ]}
                                            data-validMsgPrefix={'手机号'}
                                        />
                                    </div>
                                </div>
                            {/*新密码*/}
                                <div className="inputItem flex-father">
                                    <div className="label">设置支付密码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="password" value={that.state.form.newPassword} placeholder="请设置6位数字密码"
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
                                <div className="inputItem flex-father">
                                    <div className="label">确认支付密码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="password" value={that.state.form.repeatNewPassword} placeholder="请确认6位数字密码"
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
                            {/*协议*/}
                            <div className="clause">
                                <div className="input" ref="inputBox">
                                    <input type="checkbox" checked={this.state.check} onClick={(ev)=>{
                                        componentStore.update(that,{
                                            check: ev.target.checked
                                        })
                                    }} onChange={(ev)=>{
                                            console.log(ev);
                                        }}/>
                                </div>
                                <div className="clauseText">我已阅读并同意<a href="javascript:;" onClick={(e)=>{
                                    window.location.href="/h5Static/userLicenseAgreement.html";e.stopPropagation();return false;
                                }}>《用户授权协议》</a><a href="javascript:;" onClick={(e)=>{window.location.href="/h5Static/shanbaAgreement.html" ;e.stopPropagation();return false; }}>《连连网络交易资金账户服务三方协议》</a></div>
                            </div>
                            {/*确认修改*/}
                                <div className={"inputItem noBorder bnt-red mt30"+checkFalse} style={{display:that.state.buttonState?'block' : 'none'}} onClick={()=>{
                                    if(that.state.check){
                                        Utils.eventHanlder(function(){
                                            that.refs.validator.validate({
                                                callback: function(res){
                                                    if(res){
                                                        componentStore.update(that,{
                                                            buttonState:false
                                                        })
                                                        Utils.requestData({
                                                            url: config.api + 'qj/front/v1/account/openAccount',
                                                            method: 'post',
                                                            data: {
                                                                    "custName": that.state.form.parson,
                                                                    "mobile": that.state.form.phone,
                                                                    "certNo": that.state.form.certificates,
                                                                    "payPassword":that.state.form.newPassword ,
                                                                    "payPassword2":that.state.form.repeatNewPassword,
                                                                    "mailAddr": that.state.form.Email
                                                                    },
                                                            callback: function(data){
                                                                if(data.resultCode == 0){
                                                                    Alert({
                                                                        type:'standard',
                                                                        title:'开户成功',
                                                                        desc:'成功开通连连存管账户，您将享受全面的资金安全保障。',
                                                                        button:[
                                                                            {
                                                                                text:'确定',
                                                                                handle:()=>{
                                                                                    Utils.backRoute();
                                                                                }
                                                                            }
                                                                        ]

                                                                    });
                                                                }
                                                            },
                                                            errorAlert:function(){
                                                                console.log('服务器已返回');
                                                                componentStore.update(that,{
                                                                    buttonState:true
                                                                })
                                                            }

                                                        });
                                                    }
                                                }
                                            });
                                        })
                                    }
                                }}>
                                    确定开户
                                </div>
                                <div className={"inputItem noBorder bnt-red mt30"+checkFalse} style={{display:that.state.buttonState?'none' : 'block'}} onClick={()=>{console.log('无效的点击')}}>
                                    确定开户
                                </div>
                        </Validate>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default OpenBank;
