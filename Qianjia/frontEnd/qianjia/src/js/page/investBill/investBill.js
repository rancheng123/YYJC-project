/**
 * Created by 唐丹 on 2017/5/12.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';

//导入样式 start
import './investBill.scss'
//导入样式 end



class InvestBill extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态


        let that = this;
        this.state = {
            
            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1,
                height : "100%",
                type : "100",
                isRequestUrl : false    //判断是否已经去加载了 url， false 没有去加载url，true 去加载url
            }
        }

        Utils.tokenExpireJumpToLogin(function () {
            //获取投资列表
            that.getList();
        })


       
    }

    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end

        var oContent = document.getElementById('b-content');
        var strHeight = oContent.style.minHeight.toString();
     
        oContent.style.height = strHeight;

        /* this.state.viewList.height = strHeight.toString().substring(0,strHeight.length-2);
        componentStore.update(this,{
            viewList: this.state.viewList
        }) */

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    getList(){

        var that = this;
        
        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })

        Utils.requestData({
            url: config.api +"qj/front/v1/investOrder/getInvestOrderList",
            method: 'post',
            data: {
                "type" : that.state.viewList.type,
                "pn" : that.state.viewList.currentPageNum,
                "pageSize" : 10

            },
            callback: function(data){
                
                if(data.resultCode=="0"){
                    if(data.data.investOrderList&&data.data.investOrderList.length>0){
                        console.log(data.data.investOrderList);
                        that.state.viewList.data = that.state.viewList.data.concat(data.data.investOrderList) ;
                        that.state.viewList.isListen = data.data.investOrderList.length<10?false:true;
                        that.state.viewList.loading = false;
                        that.state.viewList.currentPageNum++;

                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })

                    }
                }
               
                console.log("getInvestOrderList--",data);
                
            }
        });

    }

    render(){
        var that = this;
        return (
            <Backbar $id="investBill" title="投资账单">
                <div className="investBill-wrap" style={{height:"100%"}}>
                   

                    {/*ViewList  start*/}
                    {(function(){
                       
                        return (

                            <ViewList
                                $id="investBill-viewList"
                                isListen={that.state.viewList.isListen}
                                listenDistance={60}
                                loading={that.state.viewList.loading}
                                data={that.state.viewList.data}
                                height={that.state.viewList.height}
                                render={(item,index)=>{
                                    
                                    return (
                                        <div className="bill-item">
                                            <div className="b-time">下单时间：{item.orderDateStr}</div>
                                            <div className="b-title">
                                                <h3 className="b-company">{item.productTitle}</h3>
                                                <div className="b-type">
                                                    <i></i>
                                                    <span>
                                                        {(()=>{
                                                            if(item.repayStatus==1){
                                                                return "待还款"
                                                            }else if(item.repayStatus==2){
                                                                return "已还款"
                                                            }
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="c-info">
                                                <div className="info-top">
                                                    <div className="i-left">
                                                        <div>
                                                            <h3>预期年化回报率</h3>
                                                          
                                                            {(()=>{
                                                                if(item.inviteAddYield==0&&item.orderAddYield==0){
                                                                    
                                                                    return (
                                                                        <div className="i-rate">
                                                                            {item.orderBaseYield+"%"}
                                                                        </div>
                                                                    )

                                                                }if(item.inviteAddYield!=0&&item.orderAddYield==0){

                                                                    return (
                                                                        <div className="i-rate">
                                                                            {item.orderBaseYield+"%"}
                                                                            <span className="samllFS">{"+"+item.inviteAddYield+"%"}</span>
                                                                        </div>
                                                                    )

                                                                }if(item.inviteAddYield==0&&item.orderAddYield!=0){

                                                                    return (
                                                                        <div className="i-rate">
                                                                            {item.orderBaseYield+"%"}
                                                                            <span className="samllFS">{"+"+item.orderAddYield+"%"}</span>
                                                                        </div>
                                                                    )

                                                                }else{
                                                                    return (
                                                                        <div className="i-rate threeGroupNumber">
                                                                            {item.orderBaseYield+"%"}
                                                                            <span className="samllFS">{"+"+10+"%+"+20+"%"}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                            })()}
                                                    
                                                        </div>
                                                    </div>
                                                    <div className="i-right">
                                                        <div>
                                                            <h3>总利息</h3>
                                                            <div className="i-money">
                                                                {item.interestAmount}元
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="info-btm">
                                                    <div className="time-box">
                                                        <div className="t-top">
                                                            <i></i>
                                                            <span>{item.interestStartDateStr}</span>
                                                        </div>
                                                        <p>计息日期</p>
                                                    </div>
                                                    <div className="time-box">
                                                        <div className="t-top">
                                                            <i></i>
                                                            <span>{item.interestEndDateStr}</span>
                                                        </div>
                                                        <p>到期日期</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="c-detail">
                                                <p>投资金额: {item.investAmount}元</p>
                                                <div className="c-r" onTouchEnd={()=>{
                                                    
                                                    Utils.switchRoute("/investBillDetail?orderId="+item.orderId+"&oId="+item.oid+"&projectId="+item.projectId);
                    
                                                }}>
                                                    <span>账单详情</span>
                                                    <i></i>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                                getDataFn={(data)=>{
                                    that.getList();
                                }}
                                componentDidMount={()=>{
                                    setTimeout(function(){
                                        lazyloader.init({
                                            ele: document.querySelector('.investBill-wrap')
                                        });
                                    },10)

                                }}
                                onScroll={(ev)=>{
                                    lazyloader.processScroll();
                                }}
                            >
                            </ViewList>

                        )
                       
                    }())}

                    {/*ViewList  end*/}


                </div>
            </Backbar>
        )
    }

}

export default InvestBill;
