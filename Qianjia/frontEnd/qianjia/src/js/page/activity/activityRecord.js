/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar2/backbar2';

import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';

//导入样式 start
import './activity.scss'
//导入样式 end



class activityRecord extends Component{
    constructor(){

        super();

    }
    componentWillMount(){
        var that = this;
    
        //在此处初始化状态
        this.state = {
            curLocation : Utils.Url.parseUrl(location.href),
            params : Utils.Url.parseUrl(location.href).params,
            orderInput : "",
            isReceiveBtn : true,
            activityRecordList : ""
        }

        if(this.state.params.isWap=="true"){  //从app端进入
            
            componentStore.update(that,{
                memberId : that.state.params.memberId,
                qpToken : that.state.params.qpToken
            });

        }else{

            // 判断用户是否登录
            Utils.tokenExpireJumpToLogin(function () {});
           
            componentStore.update(that,{
                memberId : Utils.Storage.get('user').memberId,
                qpToken : Utils.Storage.get('user').token,
                title : that.state.params.title
            });

        }

        this.getRecordList();
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        let activityRecord = this.refs.activityRecord;
        if(this.state.params.isWap=="true"){  //从app端进入
        
            activityRecord.style.minHeight = document.documentElement.clientHeight + 'px';
        }else{
            activityRecord.style.minHeight = (document.documentElement.clientHeight - activityRecord.offsetTop) + 'px';
        }

        var app = document.getElementById('app');
        app.style.maxWidth = "100%";
        app.style.minWidth = "100%";

        
        // alert( "documentElement::"+ document.documentElement.clientWidth );
        // alert( "activityRecordWap::"+ document.getElementById("activityRecordWap").offsetWidth );

        
        window.addEventListener("popstate", function(e) {
            console.log('--------------------------------');
            console.log(e);
            console.log('--------------------------------');
        }, false);

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    // 活动记录列表
    getRecordList(){

        var that = this;
        
        Utils.requestData({
            url: config.api + 'qj/front/v1/activityRecord/getActivityRecordList',
            method: 'post',
            qpToken: that.state.qpToken,
            data : {
                "memberId": that.state.memberId
            },
            callback: function(data){
               
                console.log('活动记录列表::',data);

                if(data.resultCode==0){
                    componentStore.update(that,{
                        activityRecordList: data.data
                    })
                }
            },
            errorAlert : function(data){
                
                if(data.resultCode!=0){

                    componentStore.update(that,{
                        activityRecordList: []
                    })

                    this.errorAlert.jail = true;
                }
                this.errorAlert.jail = true;
            }
        });
        
    };

    renderList(){
        var that = this;
        var query = that.state.curLocation.query;
     
        if(that.state.activityRecordList==="")return "";

        if(that.state.activityRecordList.length>0){
            
            return that.state.activityRecordList.map(function(item,index){
                
                return (
                    
                    <div className="r-item" key={index}>
                        <div onClick={()=>{
                        
                            // 进入0元购订单详情
                            if(that.state.params.isWap=="true"){  //从app端进入
                                
                                Utils.switchRoute("/investBillDetailZero?oId="+item.orderNo+"&isWap=true&memberId="+that.state.params.memberId+"&qpToken="+that.state.params.qpToken);
                    
                            }else{
                                Utils.switchRoute("/investBillDetailZero?oId="+item.orderNo);
                            }
                            
                        }}>
                            <div className="r-title">
                                <h3>
                                    {item.activityName}
                                    {(()=>{
                                        if(item.orderFrom==1){
                                            if(item.isRecharge==0){  //不可消费
                                                return (
                                                    <span className="r-icon r-record1"></span>
                                                )
                                            }else if(item.isRecharge==1){  //可消费
                                                return (
                                                    <span className="r-icon r-record2"></span>
                                                )
                                            }
                                        }else{  //可消费
                                            return (
                                                <span className="r-icon r-record2"></span>
                                            )
                                        }
                                        
                                    })()}
                                    
                                </h3>
                            </div>
                            <ul className="r-list clearfix">
                                <li>
                                    <h3>
                                        {(()=>{
                                            if(that.state.activityRecordList.length==1&&item.isRecharge==1){
                                                return (
                                                    <b>{item.amount-1}+1</b>
                                                )
                                            }else{
                                                return (
                                                    <b>{item.amount}</b>
                                                )
                                            }
                                        })()}
                                        
                                        <span>元</span>
                                    </h3>
                                    <p>投资本金</p>
                                </li>
                                <li>
                                    <h3>
                                        <b>{item.interestRate}</b>
                                        <span>%</span>
                                    </h3>
                                    <p>预期年化收益率</p>
                                </li>
                                <li className="li-last">
                                    <h3>
                                        <b>{item.term}</b>
                                        <span>天</span>
                                    </h3>
                                    <p>投资周期</p>
                                </li>
                            </ul>
                            <div className="r-date">
                                <span>投资日期：{item.formatActivateDate}</span>
                                <span>到期日期：{item.formatExpireDate}</span>
                            </div>
                        </div>
                        {(()=>{
                            
                            if(item.orderFrom==1){
                                if(item.isRecharge==0){  //不可消费
                                    return (
                                        <a className="payBtn" href="javascript:;" onClick={()=>{
                                            
                                            Utils.switchRoute("/activityPay"+query+"&recordId="+item.recordId);
                                        }}>
                                            充值1元本金即可消费
                                        </a>
                                    )
                                }else if(item.isRecharge==1){  //可消费
                                    
                                }
                            }
                        })()}
                        
                    </div>
                )
            })
   
            
            
        }else{

            return (
                <div className="r-item-no">
                    <img src={require('../../../image/img/bige.png')} className="bige-img" />
                    <p>下载哔咯返现APP参加0元购活动</p>
                </div>
            )

        }
        

        
    }

    // 立即领取
    /* receive(){
        var that = this;
       
        if(!that.state.isReceiveBtn)return false;
        
        componentStore.update(that,{
            isReceiveBtn: false
        })

        if(that.state.orderInput==""){

            Modal.alert('提示',"请输入订单号！", [
                { text: '确定', onPress: () => {} }
            ])

            componentStore.update(that,{
                isReceiveBtn: true
            })

        }else{
           
            Utils.requestData({
                url: config.api + 'qj/front/v1/activityRecord/receive',
                method: 'post',
                qpToken: that.state.qpToken,
                data : {
                    "activateCode": that.state.orderInput,
                    "memberId": that.state.memberId
                },
                callback: function(data){
                
                    console.log('立即领取::',data);

                    if(data.resultCode==0){

                        Modal.alert('提示',data.data, [
                            { text: '确定', onPress: () => {

                                componentStore.update(that,{
                                    isReceiveBtn: true
                                })

                                // 重新刷新数据
                                that.getRecordList();
                      
                            } },
                        ])

                    }

                },
                errorAlert:function(data){

                    if(data.resultCode!=0){

                        Modal.alert('提示',data.resultMsg, [
                            { text: '确定', onPress: () => {
                                
                                componentStore.update(that,{
                                    isReceiveBtn: true
                                })

                            } }
                        ])

                    }
                    
                    //传递捕捉信号  给捕捉器
                    this.errorAlert.jail = true;
                }
            });

        }
      
        
    }; */

    
    render(){
        var that = this;

        return (
            <div className="activityRecord-wrap" id="activityRecordWap">

                {(()=>{

                    if(that.state.params.isWap!="true"){    //当页面不是从app端进入时 有标题栏
                        return (
                            <Backbar $id="activityRecord">

                                {decodeURIComponent(that.state.title)}
                                <a href="/h5Static/zeroActivityRule.html" className="zeroActivityLink">活动规则</a>
                            </Backbar>
                        )
                    }

                })()}
                
                
                <div className="activityRecord" ref="activityRecord">
                    <img src={require('../../../image/img/zero.jpg')} className="big-img" />
                    {/* <div className="f-top">
                        <div className="money-box">
                            <div className="m-item">
                                <h2><span>￥</span>{this.state.totalProfit}</h2>
                                <p className="m-p">总体收益</p>
                            </div>
                            <div className="m-item">
                                <h2><span>￥</span>{this.state.currentBalance}</h2>
                                <p className="m-p">当前余额</p>
                            </div>
                        </div>
                        <input 
                            placeholder="请输入激活码" 
                            className="order-input" 
                            value={that.state.orderInput} 
                            onChange={(ev)=>{
                                
                                componentStore.update(that,{
                                    orderInput: ev.target.value
                                })
                                
                            }}
                        />
                        <button className="getBtn" onClick={()=>{

                            that.receive();
                            
                        }}>
                            领取
                        </button>
                        <div className="rule-box">
                            {(()=>{

                                if(that.state.params.isWap=="true"){    //页面是从app端进入
                                
                                    return (
                                        <a href="/h5Static/activityRule.html?isWap=true" className="rule-link">活动规则</a>
                                    )

                                }else{

                                    return (
                                        <a href="/h5Static/activityRule.html" className="rule-link">活动规则</a>
                                    )

                                }

                            })()}
                            
                        </div>
                    </div> */}

                    
                    <div className="r-bottom">
                        <div className="record-title">
                            0元购激活记录
                            <span className="t-line t-l1"></span>
                            <span className="t-line t-l2"></span>
                        </div>
                        <div className="record-box">

                            {that.renderList()}

                            {/* <div className="r-item">
                                <div className="r-title">
                                    <h3>
                                        0元购活动名称0元购活动名称
                                        <span className="r-icon">不可消费</span>
                                    </h3>
                                </div>
                                <ul className="r-list clearfix">
                                    <li>
                                        <h3>
                                            <b>68</b>
                                            <span>元</span>
                                        </h3>
                                        <p>投资本金</p>
                                    </li>
                                    <li>
                                        <h3>
                                            <b>15</b>
                                            <span>%</span>
                                        </h3>
                                        <p>预期年化收益率</p>
                                    </li>
                                    <li className="li-last">
                                        <h3>
                                            <b>15</b>
                                            <span>天</span>
                                        </h3>
                                        <p>投资周期</p>
                                    </li>
                                </ul>
                                <div className="r-date">
                                    <span>投资日期：2017-12-12</span>
                                    <span>到期日期：2017-12-12</span>
                                </div>
                                <a className="payBtn" href="/activityPay">
                                    充值1元本金即可消费
                                </a>
                            </div> */}

                            {/* <div className="r-item-no">
                                <img src={require('../../../image/img/bige.png')} className="bige-img" />
                                <p>下载哔咯返现APP参加0元购活动</p>
                            </div> */}
                            
                        </div>
                    </div>
                    

                </div>
            
            </div>
        )
    }

}

export default activityRecord;
