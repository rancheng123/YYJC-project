import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'
import globalData from './data'; //数据
//导入样式 start
import './bankBingding.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Picker from '../../widget/picker/picker';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
import Alert from '../../module/alert/alert';


class BankBingding extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that=this;
        //在此处初始化状态
        this.state={
            buttonState:true,
            trueName:'',
            certCode:'',
            ll_banckCode:'',
            form:{
                parson:'',
                phone:'',
                bankName:'',
                bankCodeBD:'',
                code:'',
                bankCodeAndName:''
            },
            isCode:true,
            codeCount:60,
            data:[],
            getUserInfo : ""

        }
        //获取用户银行卡信息
        // Utils.requestData({
        //     url: config.api + 'qj/front/v1/account/getMyBankCard',
        //     method: 'post',
        //     data: {},
        //     callback: function(data){
        //         if(data.resultCode == 0){
                     

        //         }
        //     }

        // });

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData2({
                requestArr:[{//获取银行卡信息接口
                    url: config.api + 'qj/front/v1/account/getMyBankCard',
                    method: 'post',
                    data: {},
                },
                    {
                        url: config.api + 'qj/front/v1/user/getUserInfo',
                        method: 'post',
                        data: {},
                    },
                ],
                callback: function(dataArr){
                    var bankDetail = dataArr[0];
                    if(bankDetail.resultCode == 0){
                        // componentStore.update(that,{
                        //     ll_banckCode:bankDetail.data.bankCardReal
                        // })
                    }
                    var userInfo = dataArr[1];
                    if(userInfo.resultCode == 0){
                        componentStore.update(that,{
                            trueName:userInfo.data.trueName,
                            certCode:userInfo.data.certCode,
                            getUserInfo:userInfo.data
                        })
                        if(userInfo.data.isTrueMan==1){//判断是否是连连老用户
                            componentStore.update(that,{
                                form:{
                                    phone:userInfo.data.phone,//是老用户提取手机号
                                    bankCode:bankDetail.data.bankCardReal,//提取连连的银行卡号
                                }
                            })
                        }
                    }
                }
            })
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


    //贴

    onYes(data){
        let dataL=this.state.data;
        for(var i=0;i<dataL.length;i++){
            if(dataL[i].id == data.idArr[0]){
                 this.state.form.bankName = dataL[i].label;
                componentStore.update(this);
            }
        }
    }
    onChange(data){

     }
    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }
    //获取验证码
    getCode(){
        //alert('1');
        let that = this;
        that.refs.validator.validate({
            eleNames: ['phone'],
            callback: function(res){
                if(res){
                    that.code();
                }
            }
        })
    }
    //验证码倒计时
    code(){
        let that = this;
            componentStore.update(that,{isCode:false});
            let count = 60;
        let time=setInterval(function(){
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
        var that = this;
        let codeText = that.state.isCode? <i onClick={this.getCode.bind(this)}>获取验证码</i> : <i style={{color:'#ccc'}}>{that.state.codeCount+'秒'}</i>
        return (
            <div className="bankBinding">
                <Backbar $id="modifyPassword" title="银行卡绑定" >
                    <div className="bankBind">
                        <Validate $id="password2" ref="validator"
                            onError={(obj)=>{
                                //console.error('元素'+rule+'验证未通过')
                                Modal.alert('提示',obj.errorMsg, [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                ])
                            }}>
                            {/*<div className="bankBingdImg">
                                <img src={require('../../../image/img/bankBingdLog.png')} alt=""/>
                            </div>*/}
                            {/*姓名*/}
                                <div className="inputItem flex-father">
                                    <div className="label">姓名</div>
                                    <div className="flex-child1">
                                        {/*<input className="inputText" type="text" value={that.state.trueName} placeholder="请输入您的姓名"
                                                onChange={(obj)=>{
                                                    that.state.trueName = obj.target.value;
                                                    componentStore.update(that,that.state)
                                                }}
                                                data-validName="trueName"
                                                data-validRules={[
                                                    {name: 'require'}
                                            ]}
                                                data-validMsgPrefix={'姓名'}
                                        />*/}
                                        {that.state.trueName}
                                    </div>
                                </div>
                            {/*身份证号*/}
                                <div className="inputItem flex-father">
                                    <div className="label">身份证号</div>
                                    <div className="flex-child1">
                                        {/*<input className="inputText" type="text" value={that.state.certCode} placeholder="请输入您的身份证号"
                                                onChange={(obj)=>{
                                                    that.state.certCode = obj.target.value;
                                                    componentStore.update(that,that.state)
                                                }}
                                                data-validName="certCode"
                                                data-validRules={[
                                                    {name: 'require'},
                                                    {name:'isCardNo'}
                                            ]}
                                                data-validMsgPrefix={'身份证号'}
                                        /> */}
                                        {that.state.certCode}
                                    </div>
                                </div>
                            
                            {/*银行卡号*/}
                                <div className="inputItem flex-father">
                                    <div className="label">银行卡号</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" value={that.state.form.bankCodeBD} placeholder="请输入您的银行卡号"
                                            onChange={(obj)=>{
                                                that.state.form.bankCodeBD = obj.target.value;
                                                componentStore.update(that,that.state)
                                                console.log('输入的：',obj.target.value);
                                                
                                                // if( obj.target.value == '1' ){
                                                //     that.state.form.bankCodeAndName = 11111;
                                                // }
                                                // componentStore.update(that,that.state)
                                            }}
                                            onBlur={()=>{
                                                Utils.requestData2({
                                                    requestArr:[
                                                        {
                                                            url: config.api + 'qj/front/v1/lianlianInvest/getBankCardBin',
                                                            method: 'post',
                                                            data: {
                                                                'bankCard':that.state.form.bankCodeBD
                                                            },
                                                        },
                                                    ],
                                                    callback: function(dataArr){
                                                        var bankDetail = dataArr[0];
                                                        if(bankDetail.resultCode == 0){
                                                            componentStore.update(that,{
                                                                bankCodeAndName:bankDetail.data.bankName,
                                                            })
                                                        }
                                                    }
                                                })
                                            }}
                                            data-validName="bankCodeBD"
                                            data-validRules={[
                                                {name: 'require'}
                                        ]}
                                            data-validMsgPrefix={'银行卡号'}
                                        />
                                    </div>
                                </div>
                            {/*银行*/}
                                <div className="inputItem flex-father">
                                    <div className="label">银行</div>
                                    <div className="flex-child1">
                                        {/*<input className="inputText code" type="text" value={that.state.form.bankCodeAndName} readOnly="readonly"
                                        //     onChange={(obj)=>{
                                        //        that.state.form.phone = obj.target.value;
                                        //        componentStore.update(that,that.state)
                                        //    }}
                                            data-validName="bankCodeAndName"
                                            data-validRules={[
                                                {name: 'require'},
                                            ]}
                                            data-validMsgPrefix={'银行'}
                                        />*/}
                                        {this.state.bankCodeAndName}
                                        {/*<span className="getCode">{codeText}</span>*/}
                                    </div>
                                </div>
                            {/*验证码*/}
                               {/* <div className="inputItem flex-father mt30">
                                    <div className="label">验证码</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="number" value={that.state.form.code} placeholder="请输入验证码)"
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
                                <div className="prompt">因涉及投资回款，请确认所绑定的银行卡为本人储蓄卡</div>*/}
                            <p className="bankNotes">因涉及投资回款，所绑定银行卡为本人储蓄卡</p>
                            {/*确认修改*/}
                                <div className="inputItem noBorder bnt-red mt30" style={{display:that.state.buttonState?'block':'none'}} onClick={()=>{
                                    Utils.eventHanlder(function(){
                                        that.refs.validator.validate({
                                            callback: function(res){
                                                if(res){
                                                    console.log('变更的：',that.state.form.bankCode);
                                                    componentStore.update(that,{
                                                            buttonState:false
                                                        })
                                                        console.log('ok,等后台接口修改');
                                                    Utils.requestData({
                                                        url: config.api + 'qj/front/v1/lianlianInvest/ajaxUser/addMemberBankCard',
                                                        method: 'post',
                                                        data:{
                                                            "bankCard": that.state.form.bankCodeBD,
                                                            "bankName": that.state.bankCodeAndName
                                                        },
                                                        callback: function(data){
                                                            if(data.resultCode==0){
                                                                console.log(data)
                                                                Alert({
                                                                    type:'standard',
                                                                    title:'绑卡成功',
                                                                    desc:'成功绑定银行卡，您将享受钱夹安全便捷的投资体验',
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
                                }}>
                                    确定绑卡
                                </div>
                                <div className="inputItem noBorder bnt-red mt30" style={{display:that.state.buttonState?'none':'block'}} onClick={()=>{console.log('无效的点击')}}>
                                    确定绑卡
                                </div>
                                {/*<p className="look-bankList" onClick={()=>{
                                    //Utils.switchRoute('')
                                }}>
                                    查看支持银行
                                </p>*/}
                        </Validate>
                        {/*<div className="btn_bankList"><a href="/bankList">查看支持的银行卡列表</a></div>*/}
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default BankBingding;
