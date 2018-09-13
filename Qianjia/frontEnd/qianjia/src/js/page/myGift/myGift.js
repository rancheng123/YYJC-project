/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';

//导入样式 start
import './myGift.scss'
//导入样式 end


class MyGift extends Component{
    constructor(){
        super();
        let that = this;

        this.state = {
            giftList : [],
            user : Utils.Storage.get('user'),
            //用户是否写了收货地址 默认true（已写收货地址）
            isAddress : true,
            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1,
                height : 500,
                isRequestUrl : false    //判断是否已经去加载了 url， false 没有去加载url，true 去加载url
            }
        }

        Utils.tokenExpireJumpToLogin(function () {
            //在此处初始化状态
            that.getGiftList();
            //判断是否有设置地址
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getMemberAddress',
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){
                        if(data.data.consigneeName){
                            componentStore.update(that,{
                                isAddress : true
                            })
                        }else{
                            componentStore.update(that,{
                                isAddress : false
                            })
                        }
                    }else{
                        componentStore.update(that,{
                            isAddress : false
                        })
                    }
                }
            });
        })

    }
    componentWillMount(){

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

    getGiftList(){
        var that = this;

        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })

        Utils.requestData2({
            requestArr:  [
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/appUser/getMemberGiftList",
                    method: 'post',
                    data: {
                        "memberId": this.state.user.memberId,
                        //"memberId": 7574,
                        "pn": that.state.viewList.currentPageNum,
                        "size": "10"
                    }
                }
            ],
            callback: function(dataArr){

                var productData = dataArr[0];
                if(productData.resultCode == 0){
                    console.log('productData:::',productData);
                    if(productData.data.list && productData.data.list.length){

                        that.state.viewList.data = that.state.viewList.data.concat(productData.data.list) ;
                        that.state.viewList.isListen = productData.data.list.length<10?false:true;
                        that.state.viewList.loading = false;
                        that.state.viewList.currentPageNum++;
                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })

                        if(that.state.viewList.data.length>0){
                            var oProductList = document.getElementById('product-list');
                            var clientHeight = document.documentElement.clientHeight;
                            var eleHeight = oProductList.offsetTop;

                            that.state.viewList.height = clientHeight-eleHeight;
                            componentStore.update(that,{
                                viewList: that.state.viewList
                            })
                        }
                    }else if(productData.data.list.length==0){
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



    };

    render(){
        var that = this;

        return (

            <Backbar $id="gift" title="我的赠品" isScroll={true}>
                {
                    (()=>{
                        if(that.state.viewList.data.length==0){
                            if(that.state.viewList.isRequestUrl==false){
                                return (
                                    <div style={{padding:"0.5rem",textAlign:"center"}}></div>
                                )
                            }else{
                                return (
                                    <div style={{padding:"0.5rem",textAlign:"center"}}>暂无</div>
                                )
                            }

                        }else{
                            return (
                                <div className="gift-wrap">
                                    <div style={{display:this.state.isAddress?"none":"block"}}>
                                        <div className="tip-bar t-addAdress">
                                            <span>请您及时填写收货地址，以便赠品发放</span>
                                            <a href="javascript:;" className="addr-btn" onClick={()=>{
                                                Utils.switchRoute("/address");
                                            }}>
                                                立即填写
                                            </a>
                                        </div>
                                    </div>
                                    <div className="g-product-list" id="product-list">
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
                                                        <div className={
                                                            (function(){
                                                                switch (item.memberGiftReceiptStatus) {
                                                                    case 2:
                                                                        return "list-item ljdh"
                                                                        break;
                                                                    case 3:
                                                                        return "list-item daifahuo"
                                                                        break;
                                                                    case 4:
                                                                        return "list-item yfh"
                                                                        break;
                                                                    case 5:
                                                                        return "list-item ysx"
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                            })()
                                                        } key={index}>
                                                            <div className="g-left">
                                                                <div className="g-img">
                                                                    <img src={config.img+item.gift.qjGiftImgPath} />
                                                                </div>

                                                                <div className="g-text">
                                                                    <h3>{item.gift.qjGiftName}</h3>
                                                                    <p>有效期至：{item.exchangeEndDate.split(" ")[0]}</p>
                                                                </div>
                                                            </div>
                                                            {
                                                                (function(){
                                                                    switch (item.memberGiftReceiptStatus) {
                                                                        case 2:
                                                                            return (
                                                                                <a href="javascript:;" className="g-link" onTouchEnd={()=>{

                                                                                    if(that.state.isAddress==false){
                                                                                        Modal.alert('提示','请先填写收货地址', [
                                                                                            { text: '取消', onPress: () => console.log('cancel') },
                                                                                            { text: '确定', onPress: () => {Utils.switchRoute('/address')} , style: { fontWeight: 'bold' } },
                                                                                        ])

                                                                                    }else{
                                                                                        Utils.Storage.set('immediatelyExchange',item);
                                                                                        Utils.switchRoute('/confirmExchange');
                                                                                    }


                                                                                }}>
                                                                                    <span className="g-btn">立即兑换</span>
                                                                                </a>
                                                                            )
                                                                            break;
                                                                        case 3:
                                                                            return (
                                                                                <a href="javascript:;" className="g-link" onTouchEnd={()=>{
                                                                                    Utils.Storage.set('immediatelyExchange',item);
                                                                                    Utils.switchRoute('/exchangeDetail');
                                                                                }}>
                                                                                    <span className="g-btn">待发货</span>
                                                                                </a>
                                                                            )
                                                                            break;
                                                                        case 4:
                                                                            return (
                                                                                <a href="javascript:;" className="g-link" onTouchEnd={()=>{
                                                                                    Utils.Storage.set('immediatelyExchange',item);
                                                                                    Utils.switchRoute('/exchangeDetail');
                                                                                }}>
                                                                                    <span className="g-btn">已发货</span>
                                                                                </a>
                                                                            )
                                                                            break;
                                                                        case 5:
                                                                            return (
                                                                                <a href="javascript:;" className="g-link">
                                                                                    <span className="g-btn">已过期</span>
                                                                                </a>
                                                                            )
                                                                            break;
                                                                        default:
                                                                            break;
                                                                    }
                                                                })()
                                                            }
                                                        </div>
                                                    )
                                                }}
                                                getDataFn={(data)=>{
                                                    that.getGiftList();
                                                }}
                                                componentDidMount={()=>{
                                                    setTimeout(function(){
                                                        lazyloader.init({
                                                            ele: document.querySelector('.g-product-list')
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

        )
    }

}

export default MyGift;
