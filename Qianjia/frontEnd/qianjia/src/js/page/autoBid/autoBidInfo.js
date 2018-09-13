
import React, { Component, PropTypes } from 'react';
import { Icon,Modal,Toast } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

import Picker from '../../widget/picker/picker';

//导入样式 start
import './autoBid.scss'
//导入样式 end



class AutoBidInfo extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            actualAmt : 0,   //账户余额
            investAmount : "",  //投标金额
            reservedAmount : "",  //账户保留金额
            isMatchCoupon : 1,  //是否自动匹配优惠券 0:否 1:是
            projectPeriodMonth: {  //项目期限列表(天)
                select: {
                    label: '请选择项目期限',
                    value: '0'
                },
                data: [

                ]
            },
            yearRate: {  //年化收益列表(%)
                select: {
                    label: '请选择年化回报率',
                    value: '0'
                },
                data: [

                ]
            }
        }

        Utils.tokenExpireJumpToLogin(function () {
            //查询余额接口
            Utils.requestData({
                url: config.api + 'qj/front/v1/account/queryAccountBalance',
                method: 'post',
                data:{},
                callback: function(data){
                    console.log(data);
                    if(data.resultCode==0){
                        componentStore.update(that,{
                            actualAmt : Number(data.data.actualAmt)
                        })
                    }

                }
            });

            //自动投标年化收益、投资期限列表
            Utils.requestData({
                url: config.api + 'qj/front/v1/autoInvest/getMemberAutoInvestConfigList',
                method: 'post',
                data:{},
                callback: function(data){
                    if(data.resultCode==0){
                        console.log(data);
                        //项目期限列表(天)
                        let projectPeriodMonthList = !data.data.projectPeriodMonthList?[]:data.data.projectPeriodMonthList;
                        for(var i=0;i<projectPeriodMonthList.length;i++){
                            that.state.projectPeriodMonth.data.push({
                                label : projectPeriodMonthList[i]+"天",
                                value : i+1
                            })
                        }

                        //年化收益列表(%)
                        let yearRateList = !data.data.yearRateList?[]:data.data.yearRateList;
                        for(var i=0;i<yearRateList.length;i++){
                            that.state.yearRate.data.push({
                                label : yearRateList[i]+"%",
                                value : i+1
                            })
                        }

                        componentStore.update(that,that.state);
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

    isDot(num) {
        var result = (num.toString()).indexOf(".");
        if(result != -1) {
            return false;   //包含小数点
        } else {
            return true;    //不含小数点
        }
    }
    render(){
        let that = this;
        return (

            <Backbar $id="AutoBidInfo" title="自动投标" action="autoBid">
                <div className="autoBidInfo-wrap" id="autoBidInfo">
                    <p className="a-sum">账户可用余额: {this.state.actualAmt}元</p>
                    <ul className="a-list">
                        <li>
                            <h3>项目期限</h3>

                            <div className={
                                (()=>{
                                    if(that.state.projectPeriodMonth.select.value==0){
                                        return "a-select a-default";
                                    }else{
                                        return "a-select";
                                    }
                                })()
                            }>

                                <Picker $id="picker-test1"
                                        onYes={(data)=>{
                                            that.state.projectPeriodMonth.select.label = data.textArr.join(',');
                                            that.state.projectPeriodMonth.select.value = data.idArr.join(',');

                                            componentStore.update(that,that.state);

                                        }}
                                        onChange={()=>{

                                        }}
                                        title=""
                                        data={that.state.projectPeriodMonth.data}
                                        cols={1}
                                        className="picker_self"
                                >
                                    <span>{this.state.projectPeriodMonth.select.label}</span>
                                    <i></i>
                                </Picker>
                            </div>
                        </li>
                        <li>
                            <h3>年化回报率</h3>
                            <div className={
                                (()=>{
                                    if(that.state.yearRate.select.value==0){
                                        return "a-select a-default";
                                    }else{
                                        return "a-select";
                                    }
                                })()
                            }>

                                <Picker $id="picker-test2"
                                        onYes={(data)=>{
                                            that.state.yearRate.select.label = data.textArr.join(',');
                                            that.state.yearRate.select.value = data.idArr.join(',');

                                            componentStore.update(that,that.state);

                                        }}
                                        onChange={()=>{

                                        }}
                                        title=""
                                        data={that.state.yearRate.data}
                                        cols={1}
                                        className="picker_self"
                                >
                                    <span>{this.state.yearRate.select.label}</span>
                                    <i></i>
                                </Picker>
                            </div>
                        </li>
                    </ul>
                    <div className="a-money">
                        <h3>投标金额</h3>
                        <span className="a-yuan"></span>
                        <input
                            type="number"
                            placeholder="最小投资金额100元" 
                         
                            value={this.state.investAmount}
                            onChange={(ev)=>{
                                
                                if(ev.target.value.length>7){

                                    componentStore.update(that,{
                                        investAmount: ev.target.value.slice(0,7)
                                    })

                                }else{

                                    componentStore.update(that,{
                                        investAmount: ev.target.value
                                    })

                                }
                                
                               
                            }}
                        />
                    </div>
                    <div className="a-money a-reserve">
                        <h3>账户保留金额</h3>
                        <span className="a-yuan"></span>
                        <input
                            type="number"
                            placeholder="请输入账户保留金额" 
                          
                            value={this.state.reservedAmount}
                            onChange={(ev)=>{
                                

                                if(ev.target.value.length>7){

                                    componentStore.update(that,{
                                        reservedAmount: ev.target.value.slice(0,7)
                                    })

                                }else{

                                    componentStore.update(that,{
                                        reservedAmount: ev.target.value
                                    })

                                }

                            }}
                         />
                    </div>
                    <div className="a-check clearfix">
                        <div className={
                            (()=>{
                                if(that.state.isMatchCoupon==1){
                                    return "check-box checked";
                                }else{
                                    return "check-box";
                                }
                            })()
                        } onClick={()=>{
                            if(that.state.isMatchCoupon==1){
                                componentStore.update(that,{
                                    isMatchCoupon : 0
                                })
                            }else{
                                componentStore.update(that,{
                                    isMatchCoupon : 1
                                })
                            }
                        }}>
                            <i></i>
                            <span>自动匹配抵现券</span>
                        </div>
                    </div>
                    <div className="a-button">
                        <span className="a-btn" onClick={()=>{
                            Utils.backRoute();
                        }}>
                            返回
                        </span>
                        <span className="a-btn" onClick={()=>{

                            let investAmount = Number(this.state.investAmount);
                            let reservedAmount = Number(that.state.reservedAmount);

                            if(this.state.projectPeriodMonth.select.value==0){
                                Modal.alert('提示',"请选择项目期限", [
                                    { text: '确定',onPress:()=>{}}
                                ])
                            }else if(this.state.yearRate.select.value==0){
                                Modal.alert('提示',"请选择年化回报率", [
                                    { text: '确定',onPress:()=>{}}
                                ])
                            }else if(investAmount==0){
                                Modal.alert('提示',"请输入投标金额", [
                                    { text: '确定',onPress:()=>{}}
                                ])
                            }else if( investAmount<100 ){
                                Modal.alert('提示',"最小投标金额为100", [
                                    { text: '确定',onPress:()=>{}}
                                ])
                            }else if( !this.isDot(investAmount/100) ){
                                Modal.alert('提示',"投标金额必须为100或者100的整数倍", [
                                    { text: '确定',onPress:()=>{}}
                                ])
                            }else{
                                let projectPeriodMonth = this.state.projectPeriodMonth.select.label.substring(0,this.state.projectPeriodMonth.select.label.length-1);
                                let yearRate = this.state.yearRate.select.label.substring(0,this.state.yearRate.select.label.length-1)

                                Utils.requestData({
                                    url: config.api + 'qj/front/v1/autoInvest/editMemberInvestRule',
                                    method: 'post',
                                    data:{
                                        "projectPeriodMonth": projectPeriodMonth,
                                        "investAmount": investAmount,
                                        "yearRate": yearRate,
                                        "reservedAmount": reservedAmount,
                                        "isMatchCoupon": that.state.isMatchCoupon
                                    },
                                    callback: function(data){
                                        if(data.resultCode==0){
                                            
                                            Toast.success('开启成功', 1, ()=>{
                                                Utils.switchRoute('/autoBidList');
                                            },true);
                                        }
                                    }
                                });
                            }
                        }}>
                            确认开启
                        </span>
                    </div>
                </div>
            </Backbar>

        )
    }

}

export default AutoBidInfo;
