/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';
//导入样式 start
import './coupon.scss'
//导入样式 end



class Coupon extends Component{
    constructor(){
        super();
        let that = this;
        this.state = {
            couponData : [],
            couponType : 1,  //1:未使用 2:已使用 3:已过期
            isRequestUrl : false,    //判断是否已经去加载了 url， false 没有去加载url，true 去加载url
            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1,
                height : 500
            }
        }

        Utils.tokenExpireJumpToLogin(function () {
            //获取消息列表
            that.requestData();
        })

    }
    componentWillMount(){

        //在此处初始化状态

    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        var oContent = document.getElementById('b-content');
        oContent.style.minHeight = 'auto';
        oContent.style.overflowY = 'visible';

        var oMessageList = document.getElementById('coupon-list');
        var clientHeight = document.documentElement.clientHeight;
        var eleHeight = oMessageList.offsetTop;

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
    menuHandle(ev){ //给 投资中 还款中 已完成 按钮加事件
        let that = this;
        let aLi = that.refs.menu.getElementsByTagName('li');
        let targetObj = ev.target;
        Utils.tokenExpireJumpToLogin(function () {

            for(var i=0;i<aLi.length;i++){
                if(aLi[i]==targetObj){
                    if(i==0){
                        componentStore.update(that,{
                            couponType : "1"
                        });
                    }else if(i==1){
                        componentStore.update(that,{
                            couponType : "2"
                        });
                    }else if(i==2){
                        componentStore.update(that,{
                            couponType : "3"
                        });
                    }
                    that.state.viewList.data = [];
                    that.state.viewList.isListen = false;
                    that.state.viewList.loading = false;
                    that.state.viewList.currentPageNum = 1;
                    componentStore.update(that,{
                        viewList: that.state.viewList
                    })
                    that.requestData();
                    return false;
                }
            }
        });

    }
    requestData(){
        var that = this;

        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })

        Utils.requestData2({
            requestArr:  [
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/user/getDiscountCouponList",
                    method: 'post',
                    data: {
                      "pn": that.state.viewList.currentPageNum,
                      "size": "10",
                      "discountCouponfilterType" : that.state.couponType
                    }
                }
            ],
            callback: function(dataArr){

                var messageData = dataArr[0];

                if(messageData.resultCode == 0){
                    if(messageData.data && messageData.data.length){

                        that.state.viewList.data = that.state.viewList.data.concat(messageData.data) ;
                        that.state.viewList.isListen = messageData.data.length<10?false:true;
                        that.state.viewList.loading = false;
                        that.state.viewList.currentPageNum++;
                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })
                    }
                }
            }
        })
    }

    render(){
        var that = this;
        return (
            <div>
                <ul className="g-three-item" ref="menu" onTouchEnd={(ev)=>{
                    this.menuHandle(ev);
                }}>
                    <li className={this.state.couponType==1?'active':""}>未使用</li>
                    <li className={this.state.couponType==2?'active':""}>已使用</li>
                    <li className={this.state.couponType==3?'active':""}>已过期</li>
                </ul>

                <Backbar $id="coupon" title="我的优惠券" action="explain">
                    {
                        (()=>{

                            if(that.state.viewList.data.length==0){
                                return (
                                    <div className="coupon-wrap">
                                        <div className="coupon-list" id="coupon-list"></div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="coupon-wrap">


                                        <div className="coupon-list" id="coupon-list">
                                        {/*ViewList  start*/}
                                        {(function(){

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
                                                            <div key={index} className={
                                                                (function(){

                                                                    let couponType = that.state.couponType;


                                                                    if(couponType==1){
                                                                        return "li-item wsy-item";
                                                                    }else if(couponType==2){
                                                                        return "li-item ysy-item";
                                                                    }else if(couponType==3){
                                                                        return "li-item ygq-item"
                                                                    }

                                                                })()
                                                            }>
                                                                <div className="c-head">
                                                                    <h3>抵现券</h3>
                                                                    <h4><span>￥</span>{item.couponAmount?item.couponAmount:0}</h4>
                                                                    <i></i>
                                                                    <p>
                                                                        {
                                                                            (function(){

                                                                                let couponType = that.state.couponType;

                                                                                if(couponType==1){
                                                                                    return "未使用";
                                                                                }else if(couponType==2){
                                                                                    return "已使用";
                                                                                }else if(couponType==3){
                                                                                    return "已过期"
                                                                                }

                                                                            })()
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="c-detail">
                                                                    <h2>{item.couponDesc}</h2>
                                                                    <h3>投资{item.couponLimitAmount}元可用券</h3>
                                                                    {
                                                                        (()=>{
                                                                            let couponStartDate = item.couponStartDate;
                                                                            let couponEndDate = item.couponEndDate;
                                                                            if(couponStartDate&&couponEndDate){
                                                                                return (
                                                                                    <p>有效期：{item.couponStartDate.split(" ")[0]}-{item.couponEndDate.split(" ")[0]}</p>
                                                                                )
                                                                            }else{
                                                                                return (
                                                                                    <p>有效期：永久</p>
                                                                                )
                                                                            }
                                                                        })()
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                    getDataFn={(data)=>{
                                                        that.requestData();
                                                    }}
                                                    componentDidMount={()=>{
                                                        setTimeout(function(){
                                                            lazyloader.init({
                                                                ele: document.querySelector('.coupon-list')
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
                                    </div>
                                )
                            }
                        })()
                    }


                </Backbar>
            </div>
        )
    }

}

export default Coupon;
