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


var _that;

class MyInvestTest extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        var that = this;
        _that = this;


        var currentPage = 1;
        var type = 1;

        var myInvest_currentPage = sessionStorage.getItem("myInvest_currentPage");
        var myInvest_type = sessionStorage.getItem("myInvest_type");

        if(myInvest_currentPage){
            currentPage = myInvest_currentPage;
        }

        if(myInvest_type){
            type = myInvest_type;
        }



        this.state = {
            titleInfo : "",
            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1,
                height : 500,
                type : type,  // 1 投资中 2 还款中 3 已完成
                isRequestUrl : false    //判断是否已经去加载了 url， false 没有去加载url，true 去加载url
            }
        }

        //获取投资列表



        this.loadData();


    }
    //再次包装 getInvestList ，用于记录从投资列表进入账单详情入口位置
    loadData(){

        var that = _that;

        var myInvest_currentPage = sessionStorage.getItem("myInvest_currentPage");

        if( myInvest_currentPage>=2 ){
            that.getInvestList( that.state.viewList.currentPageNum , function(){

                if(that.state.viewList.currentPageNum <= myInvest_currentPage ){
                    that.getInvestList( that.state.viewList.currentPageNum, that.loadData );
                }

            });
        }else{
            that.getInvestList( that.state.viewList.currentPageNum );
        }

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

    getInvestList(currentPageNum,investCallback){  //获取列表数据

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
                      "pn": currentPageNum,
                      "pageSize": "10",
                      "type": that.state.viewList.type
                    }
                }
            ],
            callback: function(dataArr){

                var investData = dataArr[0];
                console.log('investData',investData);
                if(investData.resultCode == 0){

                    if(investData.data.investOrderList && investData.data.investOrderList.length){

                        that.state.viewList.data = that.state.viewList.data.concat(investData.data.investOrderList) ;
                        that.state.viewList.isListen = investData.data.investOrderList.length<10?false:true;
                        that.state.viewList.loading = false;


                        //如果大于存储的currentPage 并且 出现滚动高度
                        if( (that.state.viewList.currentPageNum)>=sessionStorage.getItem("myInvest_currentPage") && sessionStorage.getItem("myInvest_scrollTop")>0 ){

                            var iTarget = sessionStorage.getItem("myInvest_scrollTop");
                            var iSpeed = 0;
                            var init = 0;
                            var timer = null;
                            clearInterval(timer);
                            timer = setInterval(function(){
                                iSpeed = (iTarget - init) / 8;
                    			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                                init += iSpeed;
                                console.log(init);
                                if(init>=iTarget){
                                    console.log(11111);
                                    clearInterval(timer);
                                }

                                document.getElementsByClassName('viewListWrap')[0].scrollTop = init;
                            },50)

                        }


                        that.state.viewList.currentPageNum++;

                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })

                        investCallback && investCallback();



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
        let aLi = this.refs.menu.getElementsByTagName('li');
        let targetObj = ev.target;
        for(var i=0;i<aLi.length;i++){
            Utils.removeClass(aLi[i],'active');
        }
        Utils.addClass(targetObj,'active');

        //重置sessionStorage中的数据
        sessionStorage.removeItem("myInvest_scrollTop");
        sessionStorage.removeItem("myInvest_currentPage");
        sessionStorage.removeItem("myInvest_type");

        //重置viewList
        this.state.viewList.data = [];
        this.state.viewList.isListen = false;
        this.state.viewList.loading = false;
        this.state.viewList.currentPageNum = "1";

        switch (targetObj.innerHTML) {
            case "投资中":
                componentStore.update(this,{
                    type : "1"
                });
                this.state.viewList.type = "1";
                componentStore.update(this,{
                    viewList: this.state.viewList
                })
                this.getInvestList( this.state.viewList.currentPageNum );
                break;
            case "还款中":
                this.state.viewList.type = "2";
                componentStore.update(this,{
                    viewList: this.state.viewList
                })
                this.getInvestList( this.state.viewList.currentPageNum );
                break;
            case "已完成":
                this.state.viewList.type = "3";
                componentStore.update(this,{
                    viewList: this.state.viewList
                })
                this.getInvestList( this.state.viewList.currentPageNum );
                break;
            default:

        }
    }

    render(){
        var that = this;
        return (
            <div>
                <ul className="g-three-item" ref="menu" onTouchEnd={(ev)=>{

                        this.menuHandle(ev);

                    }}>
                    <li className={
                        (()=>{
                            if(that.state.viewList.type==1){
                                return "active"
                            }
                        })()
                    }>投资中</li>
                    <li className={
                        (()=>{
                            if(that.state.viewList.type==2){
                                return "active"
                            }
                        })()
                    }>还款中</li>
                    <li className={
                        (()=>{
                            if(that.state.viewList.type==3){
                                return "active"
                            }
                        })()
                    }>已完成</li>
                </ul>
                <Backbar $id="myInvest" title="我的投资">

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
                                                                return (
                                                                    <div className="list-item" key={index}>
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
                                                                                                className : "p_yellow",
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
                                                                            <a href="javascript:;" className="p-detail" data-titleInof={itemData.titleInfo} onClick={()=>{

                                                                                // window.open( "/bill?orderId="+item.orderId+"&projectId="+item.projectId+"&titleInfo="+itemData.titleInfo+"&type="+that.state.viewList.type );
                                                                                //判断订单状态
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

                                                                                Utils.switchRoute("/bill?orderId="+item.orderId+"&projectId="+item.projectId+"&titleInfo="+titleInfo+"&type="+that.state.viewList.type);

                                                                                sessionStorage.setItem("myInvest_currentPage", (that.state.viewList.currentPageNum-1) );
                                                                                sessionStorage.setItem("myInvest_type", that.state.viewList.type );
                                                                                sessionStorage.setItem("myInvest_scrollTop", document.getElementsByClassName('viewListWrap')[0].scrollTop );

                                                                            }}>
                                                                                查看投资详情
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }}
                                                            getDataFn={(data)=>{
                                                                that.getInvestList( that.state.viewList.currentPageNum );
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
