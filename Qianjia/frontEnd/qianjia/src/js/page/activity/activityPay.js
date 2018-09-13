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



class activityPay extends Component{
    constructor(){

        super();

    }
    componentWillMount(){
        var that = this;

      
        //在此处初始化状态
        this.state = {
            curLocation : Utils.Url.parseUrl(location.href),
            params : Utils.Url.parseUrl(location.href).params,
            activityRecord : {},
            rechargeAmountList : [],
            // 默认抵现卷
            selectPjRedPacketAmount : 0,
            // 默认充值金额
            selectAmount : 0,
            // 默认选中的充值金额项
            selectIndex : 0

            
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

        // 充值1元本金即可消费接口
        that.getRecharge();
        
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        let activityPay = this.refs.activityPay;
        if(this.state.params.isWap=="true"){  //从app端进入
        
            activityPay.style.minHeight = document.documentElement.clientHeight + 'px';
        }else{
            activityPay.style.minHeight = (document.documentElement.clientHeight - activityPay.offsetTop) + 'px';
        }

        var app = document.getElementById('app');
        app.style.maxWidth = "100%";
        app.style.minWidth = "100%";

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    getRecharge(){
        var that = this;

        Utils.requestData({
            url: config.api + 'qj/front/v1/activityRecord/toRecharge',
            method: 'post',
            qpToken: that.state.qpToken,
            data : {
                "recordId": that.state.params.recordId
            },
            callback: function(data){
               
                console.log('getRecharge::',data);

                if(data.resultCode==0){
          
                    componentStore.update(that,{
                        activityRecord: data.data.activityRecord,
                        rechargeAmountList : data.data.rechargeAmountList,
                        selectPjRedPacketAmount : data.data.rechargeAmountList[0].pjRedPacketAmount,
                        selectAmount : data.data.rechargeAmountList[0].amount
                    })
                }
            },
            errorAlert : function(data){
                
                if(data.resultCode!=0){

                    /* componentStore.update(that,{
                        activityRecordList: []
                    }) */

                    this.errorAlert.jail = true;
                }
                this.errorAlert.jail = true;
            }
        });
    }
    // 选择充值金额
    selectPayHandle(item,index){

        componentStore.update(this,{
            selectPjRedPacketAmount : item.pjRedPacketAmount,
            selectAmount : item.amount,
            selectIndex : index
        })

    }
    // 立即充值
    rechargeHandle(){
        var that = this;
        
        Utils.requestData({
            url: config.api + 'qj/front/v1/activityRecord/recharge',
            method: 'post',
            qpToken: that.state.qpToken,
            data : {
                "recordId": that.state.params.recordId,
                "amount": that.state.selectAmount
            },
            callback: function(data){
                
                console.log('recharge::',data);

                if(data.resultCode==0){
                    
                    var query = that.state.curLocation.query;
                    
                    window.location.href = config.api+'qj/front/v1/lianlianInvest/llPayAutoPayByZreoBuy'+query+"&type=wap&oid="+data.data.orderNo+"&fromJump=wap";
                   
                    // window.location.href = 'http://192.168.0.157:8081/qj-front-api/qj/front/v1/lianlianInvest/llPayAutoPayByZreoBuy'+query+"&type=wap&oid="+data.data.orderNo+"&fromJump=wap";
                    
    
                }
            },
            errorAlert : function(data){
                
                if(data.resultCode!=0){

                    Modal.alert('提示',data.resultMsg, [
                        { text: '确定',onPress:()=>{}}
                    ])

                    this.errorAlert.jail = true;
                }
                this.errorAlert.jail = true;
            }
        });
    }
    render(){
        var that = this;

        var activityRecord = that.state.activityRecord;
        var rechargeAmountList = that.state.rechargeAmountList;

        
        return (
            <div className="activityPay-wrap">

                {(()=>{

                    if(that.state.params.isWap!="true"){    //当页面不是从app端进入时 有标题栏
                        return (
                            <Backbar $id="activityPay">

                                {decodeURIComponent(that.state.title)}

                            </Backbar>
                        )
                    }

                })()}
                
                
                <div className="activityPay" ref="activityPay">
                    <div className="p-top">

                        <div className="p-write">
                            <h3 className="p-title">充值<b>{that.state.selectAmount}</b>元</h3>
                            <div className="p-get">
                                <span>可获得</span>
                            </div>
                            <ul className="p-list clearfix">
                                <li>
                                    <i></i>
                                    <p>{activityRecord.amount+that.state.selectAmount}元本金立可消费</p>
                                </li>
                                <li>
                                    <i></i>
                                    <p>{that.state.selectPjRedPacketAmount}元哔咯现金券</p>
                                </li>
                            </ul>
                            <p className="p-expire">
                                到期可获得：本金{activityRecord.amount+that.state.selectAmount}元
                                +
                                收益{ ((activityRecord.amount+that.state.selectAmount) * activityRecord.interestRate / 100 * activityRecord.term / 365).toFixed(2) }元
                            </p>
                        </div>
                    </div>
                    <h3 className="pay-title">充值金额：</h3>
                    <ul className="pay-list clearfix">
                        {rechargeAmountList.length>0&&rechargeAmountList.map(function(item,index){
                           
                            return (
                                <li className={index==that.state.selectIndex?"active":""} key={index} onClick={that.selectPayHandle.bind(that,item,index)}>
                                    <div className="pay-item">
                                        <div className="pay-cen">
                                            <h4><span>￥</span>{item.amount}</h4>
                                           
                                            <p>获得{Number(activityRecord.amount)+Number(item.amount)+Number(item.pjRedPacketAmount)}元</p>
                                        </div>
                                    </div>
                                </li>
                            )

                        })}
                        {/* <li className="active">
                            <div className="pay-item">
                                <div className="pay-cen">
                                    <h4><span>￥</span>1</h4>
                                    <p></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="pay-item">
                                <div className="pay-cen">
                                    <h4><span>￥</span>100</h4>
                                    <p>获得218元</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="pay-item">
                                <div className="pay-cen">
                                    <h4><span>￥</span>500</h4>
                                    <p>获得218元</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="pay-item">
                                <div className="pay-cen">
                                    <h4><span>￥</span>1000</h4>
                                    <p>获得218元</p>
                                </div>
                            </div>
                        </li> */}
                    </ul>
                    <div className="immediate-button" onClick={that.rechargeHandle.bind(that)}>
                        立即充值
                    </div>
                    <div className="p-tip"><span>点击立即充值，即表示您已经同意</span><a href="#">《充值消费协议》</a></div>
                </div>
            
            </div>
        )
    }

}

export default activityPay;
