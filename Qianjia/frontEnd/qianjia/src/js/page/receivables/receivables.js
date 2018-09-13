import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'
import globalData from './data'; //数据
//导入样式 start
import './receivables.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Picker from '../../widget/picker/picker';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';
import Alert from '../../module/alert/alert';


class Receivables extends Component{
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
                bankName:'',
                bankCode:'',
                code:''
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
                                    // phone:userInfo.data.phone,//是老用户提取手机号
                                    // bankCode:bankDetail.data.bankCardReal,//提取连连的银行卡号
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
            <div className="receivables">
                <Backbar $id="receivables" title="完善收款账户" >
                    <div className="bankReceivables">
                        <Validate $id="receivablesBank" ref="validator"
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
                                        <input className="inputText" type=" " value={that.state.userName} placeholder="请输入真实姓名"
                                                onChange={(obj)=>{
                                                    that.state.userName = obj.target.value;
                                                    componentStore.update(that,that.state)
                                                }}
                                                data-validName="userName"
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
                                        <input className="inputText" type="text" value={that.state.certCode} placeholder="请输入您的身份证号"
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
                                        /> 
                                    </div>
                                </div>
                            
                            {/*银行卡号*/}
                               <div className="inputItem flex-father">
                                    <div className="label">银行卡号</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" value={that.state.form.bankCode} placeholder="请输入您的银行卡号"
                                            onChange={(obj)=>{
                                                that.state.form.bankCode = obj.target.value;
                                                componentStore.update(that,that.state)
                                            }}
                                            onBlur={()=>{
                                                Utils.requestData2({
                                                        requestArr:[{//获取银行卡信息接口
                                                            url: config.api + 'qj/front/v1/lianlianInvest/getBankCardBin',
                                                            method: 'post',
                                                            data: {
                                                                'bankCard':that.state.form.bankCode
                                                            },
                                                        }],
                                                        callback: function(dataArr){
                                                            var bankDetail = dataArr[0];
                                                            if(bankDetail.resultCode == 0){
                                                                console.log('开户信息：',bankDetail.data.bankName)
                                                                that.state.form.bankName = bankDetail.data.bankName
                                                                componentStore.update(that,that.state)
                                                            }
                                                        }
                                                })
                                            }}
                                            data-validName="bankCode"
                                            data-validRules={[
                                                {name: 'require'}
                                        ]}
                                            data-validMsgPrefix={'银行卡号'}
                                        />
                                    </div>
                                </div>
                            {/*开户行*/}
                               <div className="inputItem flex-father">
                                    <div className="label">开户行</div>
                                    <div className="flex-child1">
                                        {/*<input className="inputText code" type="text" value={that.state.form.bankName1} placeholder="请输入开户行"
                                            onChange={(obj)=>{
                                               that.state.form.bankName = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="bankName1"
                                            data-validRules={[
                                                {name: 'require'},
                                            ]}
                                            data-validMsgPrefix={'开户行'}
                                        />*/}
                                        {/*<span className="getCode">{codeText}</span>*/}
                                        {that.state.form.bankName}
                                    </div>
                                </div>
                            {/*验证码*/}
                                {/*<div className="inputItem flex-father">
                                    <div className="label">验证码</div>
                                    <div className="flex-child1">
                                        <input className="inputText inputCodeText" type="number" value={that.state.form.code} placeholder="请输入验证码"
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
                                        <span className="codeLast">二维码图</span>
                                    </div>
                                </div>*/}
                                {/*<div className="prompt">因涉及投资回款，请确认所绑定的银行卡为本人储蓄卡</div>*/}
                                <p className="bankNotes">你未来投资的本金及收益将直接打入您的默认银行卡中可在&lt;我的 &gt;-&lt;银行卡绑定&gt;中设置</p>
                            {/*确认修改*/}
                                <div className="inputItem noBorder bnt-red mt30" style={{display:that.state.buttonState?'block':'none'}} onClick={()=>{
                                    Utils.eventHanlder(function(){
                                        that.refs.validator.validate({
                                            callback: function(res){
                                                if(res){
                                                    componentStore.update(that,{
                                                            buttonState:false
                                                        })
                                                        console.log('可以提交了')
                                                    Utils.requestData({
                                                        url: config.api + 'qj/front/v1/lianlianInvest/ajaxUser/addMemberBankCard',
                                                        method: 'post',
                                                        data:{
                                                            'trueName':that.state.userName,
                                                            'certCode':that.state.certCode,
                                                            "bankCard": that.state.form.bankCode,
                                                            "bankName": that.state.form.bankName
                                                        },
                                                        callback: function(data){
                                                            if(data.resultCode==0){
                                                                console.log('完善资料返回：',data.data);
                                                                Utils.backRoute();
                                                                // Alert({
                                                                //     type:'standard',
                                                                //     title:'您的资料已完善',
                                                                //     desc:'成功绑定银行卡，您将享受钱夹安全便捷的投资体验',
                                                                //     button:[
                                                                //         {
                                                                //             text:'确定',
                                                                //             handle:()=>{
                                                                //                 Utils.backRoute();
                                                                //             }
                                                                //         }
                                                                //     ]

                                                                // });
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
                                    确定
                                </div>
                                <div className="inputItem noBorder bnt-red mt30" style={{display:that.state.buttonState?'none':'block'}} onClick={()=>{console.log('无效的点击')}}>
                                    确定
                                </div>
                                {/*<p className="look-bankList" onClick={()=>{
                                    //Utils.switchRoute('')
                                }}>
                                    查看支持银行
                                </p>*/}
                        </Validate>
                       {/* <div className="btn_bankList"><a href="/bankList">查看支持的银行卡列表</a></div>*/}
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default Receivables;
