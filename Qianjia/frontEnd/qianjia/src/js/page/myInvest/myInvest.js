/**
 * Created by 唐丹 on 2017/5/12.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';

//导入样式 start
import './myInvest.scss'
//导入样式 end



class MyInvestTest extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态

        let that = this;
        this.state = {
            titleInfo : "",
            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1,
                height : 500,
                type : "1",  // 1 投资中 2 还款中 3 已完成
                isRequestUrl : false    //判断是否已经去加载了 url， false 没有去加载url，true 去加载url
            }
        }

        Utils.tokenExpireJumpToLogin(function () {
            //获取投资列表
            that.getInvestList();
        })

    }

    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end

        var oContent = document.getElementById('b-content');
        oContent.style.minHeight = 'auto';
        oContent.style.overflowY = 'visible';

        var oProjectList = document.getElementById('project-list');
        var clientHeight = document.documentElement.clientHeight;
        var eleHeight = oProjectList.offsetTop;

        this.state.viewList.height = clientHeight-eleHeight;
        componentStore.update(this,{
            viewList: this.state.viewList
        })



    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    getInvestList(){  //获取列表数据

        var that = this;

        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })

        Utils.requestData2({
            requestArr:  [
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/investOrder/getInvestOrderList",
                    method: 'post',
                    data: {
                      "pn": that.state.viewList.currentPageNum,
                      "pageSize": "10",
                      "type": that.state.viewList.type
                    }
                }
            ],
            callback: function(dataArr){
                console.log(dataArr);
                var investData = dataArr[0];

                if(investData.resultCode == 0){

                    if(investData.data.investOrderList && investData.data.investOrderList.length){

                        that.state.viewList.data = that.state.viewList.data.concat(investData.data.investOrderList) ;
                        that.state.viewList.isListen = investData.data.investOrderList.length<10?false:true;
                        that.state.viewList.loading = false;
                        that.state.viewList.currentPageNum++;

                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })
                    }else{
                        that.state.viewList.isRequestUrl = true;

                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })
                    }
                }else{
                    that.state.viewList.isRequestUrl = true;

                    componentStore.update(that,{
                        viewList: that.state.viewList
                    })
                }
            }
        })
    }

    menuHandle(ev){ //给 投资中 还款中 已完成 按钮加事件

        let that = this;
        let aLi = that.refs.menu.getElementsByTagName('li');
        let targetObj = ev.target;
        Utils.tokenExpireJumpToLogin(function () {


            for(var i=0;i<aLi.length;i++){
                Utils.removeClass(aLi[i],'active');
            }
            Utils.addClass(targetObj,'active');


            that.state.viewList.data = [];
            that.state.viewList.isListen = false;
            that.state.viewList.loading = false;
            that.state.viewList.currentPageNum = "1";

            switch (targetObj.innerHTML) {
                case "投资中":
                    componentStore.update(that,{
                        type : "1"
                    });
                    that.state.viewList.type = "1";
                    componentStore.update(that,{
                        viewList: that.state.viewList
                    })
                    that.getInvestList();
                    break;
                case "还款中":
                    that.state.viewList.type = "2";
                    componentStore.update(that,{
                        viewList: that.state.viewList
                    })
                    that.getInvestList();
                    break;
                case "已完成":
                    that.state.viewList.type = "3";
                    componentStore.update(that,{
                        viewList: that.state.viewList
                    })
                    that.getInvestList();
                    break;
                default:

            }
        });
    }

    render(){
        var that = this;
        return (
            <div>
                <ul className="g-three-item" ref="menu" onTouchEnd={(ev)=>{

                        this.menuHandle(ev);

                    }}>
                    <li className="active">投资中</li>
                    <li>还款中</li>
                    <li>已完成</li>
                </ul>
                <Backbar $id="myInvest" title="我的投资" isScroll={true}>

                    <div className="invest-wrap">

                        <div className="invest-project">
                            {
                                (()=>{
                                    if(that.state.viewList.data.length==0){
                                        if(that.state.viewList.isRequestUrl==false){
                                            return (
                                                <div className="project-list" id="project-list">
                                                    <div style={{padding:'0.5rem 0',textAlign:'center'}}></div>
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <div className="project-list" id="project-list">
                                                    <div style={{padding:'0.5rem 0',textAlign:'center'}}></div>
                                                </div>
                                            )
                                        }

                                    }else{
                                        return (
                                            <div className="project-list" id="project-list">
                                                {/*ViewList  start*/}
                                                {(function(){
                                                    let itemData = {
                                                        className : "",
                                                        titleInfo : ""
                                                    };
                                                    return (

                                                        <ViewList
                                                            $id="myGift-viewList"
                                                            isListen={that.state.viewList.isListen}
                                                            listenDistance={60}
                                                            loading={that.state.viewList.loading}
                                                            data={that.state.viewList.data}
                                                            height={that.state.viewList.height}
                                                            render={(item,index)=>{
                                                                //给className="list-item" 加上 zidongtoubaio ，是自动投标的样式
                                                                return (
                                                                    <div className={
                                                                        (()=>{
                                                                            if(item.isAutoInvest=="2"){   //2为自动投标
                                                                                return "list-item zidongtoubaio"
                                                                            }else{
                                                                                return "list-item"
                                                                            }
                                                                        })()
                                                                    } key={index}>
                                                                        <div className="p-title">
                                                                            <h3>{item.projectTitle}</h3>
                                                                            {
                                                                                (()=>{
                                                                                    //判断订单状态
                                                                                    let type = that.state.viewList.type;
                                                                                    let status = item.orderStatus;


                                                                                    if(type==1){
                                                                                        if(status==1){
                                                                                            itemData = {
                                                                                                className : "p_yellow",
                                                                                                titleInfo : "投资处理中"
                                                                                            }
                                                                                        }else if(status==2){
                                                                                            itemData = {
                                                                                                className : "p_blue",
                                                                                                titleInfo : "支付成功"
                                                                                            }
                                                                                        }else if(status==4){
                                                                                            itemData = {
                                                                                                className : "p_yellow",
                                                                                                titleInfo : "超额交易"
                                                                                            }

                                                                                        }else if(status==6){
                                                                                            itemData = {
                                                                                                className : "p_yellow",
                                                                                                titleInfo : "退款中"
                                                                                            }
                                                                                        }
                                                                                    }else if(type==2){
                                                                                        if(status==2 || status==5){
                                                                                            itemData = {
                                                                                                className : "p_blue",
                                                                                                titleInfo : "投资成功，正在还款"
                                                                                            }
                                                                                        }
                                                                                    }else if(type==3){
                                                                                        if(status==2 || status==5){
                                                                                            itemData = {
                                                                                                className : "p_yellow",
                                                                                                titleInfo : "还款完成"
                                                                                            }
                                                                                        }else if(status==3){
                                                                                            itemData = {
                                                                                                className : "p_gray",
                                                                                                titleInfo : "交易关闭"
                                                                                            }
                                                                                        }else if(status==7){
                                                                                            itemData = {
                                                                                                className : "p_yellow",
                                                                                                titleInfo : "退款完成"
                                                                                            }
                                                                                        }else if(status==8){
                                                                                            itemData = {
                                                                                                className : "p_yellow",
                                                                                                titleInfo : "退款完成"
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    return (
                                                                                        <span className={itemData.className}>{itemData.titleInfo}</span>
                                                                                    )
                                                                                })()
                                                                            }
                                                                        </div>
                                                                        <div className="p-rate">
                                                                            <div className="p-box">
                                                                                <div className="p-item">
                                                                                    <p>预期年化回报率</p>

                                                                                    {
                                                                                        (()=>{
                                                                                            if(item.inviteAddYield>0){
                                                                                                return (
                                                                                                    <h3 className="unit_perc">{item.orderBaseYield}<span>%</span>+{item.inviteAddYield}<span>%</span></h3>
                                                                                                )
                                                                                            }else{
                                                                                                return (
                                                                                                    <h3 className="unit_perc">{item.orderBaseYield}<span>%</span></h3>
                                                                                                )
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="p-box">
                                                                                <div className="p-item">
                                                                                    <p>投资金额</p>
                                                                                    <h3 className="unit_yuan"><span>￥</span>{item.investAmount}</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-btm">
                                                                            <span>{item.orderDateStr}</span>
                                                                            <a href="javascript:;" className="p-detail" onClick={()=>{

                                                                                let type = that.state.viewList.type;
                                                                                let status = item.orderStatus;
                                                                                let titleInfo = "";

                                                                                if(type==1){
                                                                                    if(status==1){
                                                                                        titleInfo = "投资处理中";
                                                                                    }else if(status==2){
                                                                                        titleInfo = "支付成功";
                                                                                    }else if(status==4){
                                                                                        titleInfo = "超额交易"

                                                                                    }else if(status==6){
                                                                                        titleInfo = "退款中"
                                                                                    }
                                                                                }else if(type==2){
                                                                                    if(status==2 || status==5){
                                                                                        titleInfo = "投资成功，正在还款"
                                                                                    }
                                                                                }else if(type==3){
                                                                                    if(status==2 || status==5){
                                                                                        titleInfo = "还款完成"
                                                                                    }else if(status==3){
                                                                                        titleInfo = "交易关闭"
                                                                                    }else if(status==7){
                                                                                        titleInfo = "退款完成"
                                                                                    }else if(status==8){
                                                                                        titleInfo = "退款完成"
                                                                                    }
                                                                                }

                                                                                let billParam = "orderId="+item.orderId+"&projectId="+item.projectId+"&titleInfo="+titleInfo+"&type="+that.state.viewList.type;
                                                                                if(item.isAutoInvest=="2"){   //2为自动投标
                                                                                    Utils.switchRoute("/bill?"+billParam+"&isAutoInvest="+item.isAutoInvest);
                                                                                }else{
                                                                                    Utils.switchRoute("/bill?"+billParam);
                                                                                }

                                                                            }}>
                                                                                查看账单详情
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }}
                                                            getDataFn={(data)=>{
                                                                that.getInvestList();
                                                            }}
                                                            componentDidMount={()=>{
                                                                setTimeout(function(){
                                                                    lazyloader.init({
                                                                        ele: document.querySelector('.project-list')
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
                                        )
                                    }
                                })()
                            }

                        </div>
                    </div>

                </Backbar>
            </div>
        )
    }

}

export default MyInvestTest;
