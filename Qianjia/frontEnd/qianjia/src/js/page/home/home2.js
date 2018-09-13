import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './home.scss'
//导入样式 end
import TitleBar from '../../module/titleBar/titleBar';
import NavBar from '../../module/navBar/navBar';
import { Carousel } from 'antd-mobile';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';
import City from '../../module/city/city'


class Home extends Component{
    constructor(){
        super();
    }
    componentWillMount(){


        //在此处初始化状态
        this.state={
            //轮播列表
            imageList: [],
            adList: [],
            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1
            },
            //是否有加息特权，默认无
            getAddYield: false

        }
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




    getHeadList(){
        var that = this;
        //获取公告列表和 banner列表（轮播图）
        Utils.requestData({
            url: config.api +"qj/front/v1/ad/getHeadList",
            method: 'post',
            data: {
                "adCity":Utils.Storage.get('currentCity')
            },
            callback: function(data){

                if(data.resultCode == 0){

                    if(data.data.imageList && data.data.imageList.length){
                        componentStore.update(that,{
                            imageList: data.data.imageList
                        })
                    }
                    if(data.data.adList && data.data.adList.length){
                        componentStore.update(that,{
                            adList: data.data.adList
                        })
                    }

                }
            }
        });
    };

    getProductList(){
        var that = this;

        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })



        Utils.requestData2({
            requestArr:  [
                // 获取加息标识位
                {
                    url: config.api +"qj/front/v1/user/getAddYield",
                    method: 'post',
                    data: {
                        "memberId": "7531"
                    }
                },
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/product/getProductList",
                    method: 'post',
                    data: {
                        "pn": that.state.viewList.currentPageNum,
                        "pageSize": "10",
                        //是否推荐
                        "recommendedFilter": "1",
                        //排序类型
                        "projectOrder": "1",
                        "productCity ": Utils.Storage.get('currentCity')
                    }
                }
            ],
            callback: function(dataArr){

                var getAddYield = dataArr[0];
                if(getAddYield.resultCode == 0){
                    componentStore.update(that,{
                        getAddYield: getAddYield.data.addYieldFlag
                    })
                }

                var productData = dataArr[1];
                if(productData.resultCode == 0){

                    var productList = productData.data.costProductList;
                    if(productList && productList.length){

                        that.state.viewList.data = that.state.viewList.data.concat(productList) ;
                        that.state.viewList.isListen = productList.length<10?false:true;
                        that.state.viewList.loading = false;
                        that.state.viewList.currentPageNum++;
                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })
                    }
                }
            }
        })



    };
    render(){
        var that = this;

        return (
            <div className="homeModule">
                <TitleBar $id="titleBar">

                    <div className="flex-child1">
                        <City $id="home-city"
                              positionCityCallback={()=>{
                                  that.getProductList();
                                  that.getHeadList();
                              }}
                        ></City>
                    </div>

                    <div className="flex-child1 title">钱夹</div>

                    {/*按钮组件  start*/}

                    <div className="flex-child1 controllBtn ">
                        <NavBar $id="home-navBar"></NavBar>
                    </div>
                    {/*按钮组件  end*/}
                </TitleBar>


                <div className="carouselWrap">
                    {/*轮播组件  start*/}
                    {(function () {

                        //设置轮播图片
                        let settings = {
                            dots: true, //是否需要
                            infinite: true,
                            speed: 500,
                            autoplay : true,
                            vertical:false,
                            autoplayInterval: 3000
                        };
                        return (
                            <Carousel {...settings}>
                                {(function () {
                                    return that.state.imageList.map(function (ele,i) {
                                        return (
                                            <div key={i}
                                                 onClick={()=>{


                                                    //  1  h5
                                                    //  2  项目
                                                    //  3  产品

                                                     if(ele.adDetailType == 1 || ele.adDetailType == 4){
                                                         //显示图片
                                                         Utils.switchRoute('/proclaimDetail?url='+ele.adDetailUrl)
                                                     }else if(ele.adDetailType == 2){
                                                         Utils.switchRoute('/projectIntroduction?productId='+ele.project.projectId)
                                                     }else if(ele.adDetailType == 3){
                                                         Utils.switchRoute('/projectIntroduction?productId='+ele.product.productId)
                                                     }

                                                 }}
                                            >
                                                <img className="slider-item" src={config.img + ele.adPictureUrl} alt=""/>
                                            </div>
                                        )
                                    })
                                })()}
                            </Carousel>
                        )

                    })()}
                    {/*轮播组件  end*/}
                </div>


                <div className="proclaim flex-father">
                    <div className="proclaimIcon"></div>
                    {/*轮播组件  start*/}
                    {(function () {
                            //设置轮播图片
                            let settings = {
                                dots: false, //是否需要
                                infinite: true,
                                speed: 500,
                                autoplay : true,
                                vertical:true,
                                autoplayInterval: 1500,
                                initialSlideWidth: 300
                            };
                            return (
                                <div style={{width: '5.7rem'}}>
                                    <Carousel {...settings}>
                                        {(function () {
                                            return that.state.adList.map(function (ele,i) {

                                                return (
                                                    <div className="proclaimItem" key={i}
                                                        onClick={()=>{
                                                            //Utils.switchRoute('/proclaimDetail?url='+ele.adDetailUrl)

                                                            //  1  h5
                                                            //  2  项目
                                                            //  3  产品

                                                            if(ele.adDetailType == 1 || ele.adDetailType == 4){
                                                                //显示图片
                                                                Utils.switchRoute('/proclaimDetail?url='+ele.adDetailUrl)
                                                            }else if(ele.adDetailType == 2){
                                                                Utils.switchRoute('/projectIntroduction?productId='+ele.project.projectId)
                                                            }else if(ele.adDetailType == 3){
                                                                Utils.switchRoute('/projectIntroduction?productId='+ele.product.productId)
                                                            }

                                                        }}
                                                    >
                                                        {ele.adTitle}
                                                    </div>
                                                )
                                            })
                                        })()}
                                    </Carousel>
                                </div>

                            )
                    })()}
                    {/*轮播组件  end*/}



                    <div className="toProclaimList" onClick={()=>{
                        Utils.switchRoute('/proclaimList?city='+ Utils.Storage.get('currentCity') )
                    }}></div>

                </div>


                <section className="financeList">


                    {/*ViewList  start*/}
                    {(function(){

                        return (

                            <ViewList
                                $id="module3-viewList"
                                isListen={that.state.viewList.isListen}
                                listenDistance={60}
                                loading={that.state.viewList.loading}
                                data={that.state.viewList.data}
                                height={500}
                                render={(ele,i)=>{
                                    return (
                                        <div className="financeItem"
                                             onClick={()=>{
                                                Utils.switchRoute('/projectIntroduction?productId='+ele.productId)
                                             }}
                                        >
                                            <img src={config.img +  ele.productDescUrl} className="financeImg" alt=""/>
                                            <div className="financeTitle">
                                                {ele.productTitle}
                                            </div>


                                            <div className="item_desc flex-father">
                                                <div className="item_desc_item flex-child1 item_desc_item1">
                                                    <div className="item_desc_item_value">
                                                        <span className="percentNum">{ele.financingAnnualYield}</span><span className="percentHao">%</span>

                                                        {(function () {
                                                            if(that.state.getAddYield){
                                                                return (
                                                                    <img className="year-shouyi" src={require('../../../image/icon/goldCoin.png')} alt=""/>
                                                                )
                                                            }
                                                        })()}

                                                    </div>
                                                    <div className="item_desc_item_name">预期年化收益率</div>
                                                </div>
                                                <div className="item_desc_item flex-child1 item_desc_item2">
                                                    <div className="item_desc_item_value">
                                                        <div className="pt10">
                                                            <span className="ft40">{ele.projectPeriodMonth }</span>天
                                                        </div>
                                                    </div>
                                                    <div className="item_desc_item_name">项目期限</div>
                                                </div>
                                                <div className="item_desc_item flex-child1 item_desc_item3">
                                                    <div className="item_desc_item_value">
                                                        <div className="pt10">
                                                            <span className="ft40">{ele.projectAmount/10000  }</span>万
                                                        </div>
                                                    </div>
                                                    <div className="item_desc_item_name">融资总额</div>
                                                </div>

                                            </div>
                                            <div className="item-progress">
                                                <div className="item-progress-inner" style={{width:ele.financingProgress+'%'}}></div>
                                            </div>



                                            <div className="item-ketou flex-father">
                                                <div className="flex-child1" style={{fontSize: '0.2rem'}}>
                                                    已投 {ele.financingProgress+'%' }
                                                </div>
                                                <div  style={{fontSize: '0.2rem'}}>
                                                    可投金额 { (ele.projectAmount - ele.financingAmount)/10000 }万元
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }}
                                getDataFn={(data)=>{
                                    that.getProductList();
                                }}
                                componentDidMount={()=>{
                                    setTimeout(function(){
                                        lazyloader.init({
                                            ele: document.querySelector('.viewListWrap')
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

                    <ul>







                    </ul>
                </section>





            </div>
        )
    }

}

export default Home;
