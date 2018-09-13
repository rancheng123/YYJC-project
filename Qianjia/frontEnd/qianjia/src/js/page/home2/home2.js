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
import ViewList from '../../widget/viewList2/viewList2';
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

            //是否有加息特权，默认无
            AddYieldObj: {
                isAlertShow: false,
                data: null
            },
            //测一测弹窗
            isTestShow: false
        }
    }

    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end


        //已登录
        if(Utils.Storage.get('user')){
            //获取是否已经进行风险评测标识位
            Utils.requestData({
                url: config.api +"qj/front/v1/my/getIsPopRiskTest",
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){

                        //0 代表未曾测过
                        if(data.data.isPopRiskTest == 0){
                            componentStore.update(that,{
                                isTestShow: true
                            })
                        }

                    }
                }
            });
        }

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

    render(){
        var that = this;

        return (
            <div className="homeModule">
                <TitleBar $id="titleBar">

                    <div className="flex-child1">
                        <City $id="home-city"
                              jumpTo="/home"
                              positionCityCallback={()=>{

                                  that.getHeadList();


                                  // 获取加息标识位
                                  Utils.requestData2({
                                      requestArr:  [{
                                          url: config.api +"qj/front/v1/user/getAddYield",
                                          method: 'post',
                                          data: {
                                              "memberId": Utils.Storage.get('user').memberId
                                          }
                                      }],
                                      callback: function(dataArr){
                                          var getAddYield = dataArr[0];
                                          if(getAddYield.resultCode == 0){
                                              if(getAddYield.data.addYield != 0){
                                                  that.state.AddYieldObj.isAlertShow = true;
                                              }
                                              that.state.AddYieldObj.data = getAddYield.data;
                                              componentStore.update(that,that.state);


                                              if(Utils.momery.from.params && Utils.momery.from.params.currentPageNum){
                                                  var pages = Utils.momery.from.params.currentPageNum
                                              }else{
                                                  var pages = 1
                                              }
                                              componentStore.getById('module3-viewList').getData({
                                                  pages: pages,
                                                  scrollToSlot: true
                                              });


                                          }
                                      }
                                  });

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





                <section className="financeList">


                    {/*ViewList  start*/}
                    {(function(){

                        return (

                            <ViewList
                                $id="module3-viewList"
                                listenDistance={60}
                                requestConfig={{
                                    requestObj: {
                                        //获取商品列表
                                        url: config.api +"qj/front/v1/product/getProductList",
                                        method: 'post',
                                        data: {
                                            "pageSize": "10",
                                            //是否推荐
                                            "recommendedFilter": "1",
                                            //排序类型
                                            "projectOrder": "1",
                                            "productCity": Utils.Storage.get('currentCity')
                                        }
                                    },
                                    requestProxy: {
                                        currentPageNum: 'pn'
                                    }
                                }}
                                computeTotalPage={(dataArr)=>{
                                    return Math.ceil( (dataArr[0].data.totalRecord/10) );
                                }}

                                collectData={(dataArr)=>{
                                    var productList = [];
                                    for(var i=0;i<dataArr.length;i++){
                                        var productData = dataArr[i];
                                        if(productData.resultCode == 0){
                                            productList = productList.concat(productData.data.costProductList);
                                        }
                                    }
                                    return productList;
                                }}

                                render={(ele,i)=>{
                                    return (
                                        <div className="financeItem"
                                             onClick={()=>{
                                                Utils.switchRoute('/projectIntroduction',{
                                                    productId: ele.productId,
                                                    slot: document.body.scrollTop,
                                                    currentPageNum: componentStore.getById("module3-viewList").state.currentPageNum -1
                                                })
                                             }}
                                        >
                                            {(function () {
                                                if(ele.projectProgressStatus == 0){
                                                    return(
                                                        <img className="jjkq" src={require('../../../image/img/jjkq.png')} alt=""/>
                                                    )
                                                }
                                            })()}


                                            <img src={config.img +  ele.productDescUrl} className="financeImg" alt=""/>
                                            <div className="financeTitle">
                                                {ele.productTitle}
                                            </div>


                                            <div className="item_desc flex-father">
                                                <div className="item_desc_item flex-child1 item_desc_item1">
                                                    <div className="item_desc_item_value">
                                                        <span className="percentNum">{ele.financingAnnualYield}</span><span className="percentHao">%</span>

                                                        {(function () {
                                                            if(that.state.AddYieldObj.data.addYield !=0){
                                                                return (
                                                                    <img className="year-shouyi" src={require('../../../image/icon/jiaxi.png')} alt=""/>
                                                                )
                                                            }
                                                        })()}

                                                    </div>
                                                    <div className="item_desc_item_name">预期年化回报率</div>
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

                                                            {(function () {
                                                                if(ele.projectAmount>=10000){
                                                                    return (
                                                                        <div>
                                                                            <span className="ft40">{ele.projectAmount/10000  }</span>万
                                                                        </div>

                                                                    )
                                                                }else{
                                                                    return (
                                                                        <div>
                                                                            <span className="ft40">{ele.projectAmount}</span>元
                                                                        </div>
                                                                    )
                                                                }
                                                            })()}

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

                                                {(function () {
                                                    if((ele.projectAmount - ele.financingAmount)>=10000){
                                                        return (
                                                            <div  style={{fontSize: '0.2rem'}}>
                                                                可投金额 { (ele.projectAmount - ele.financingAmount)/10000 }万
                                                            </div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div  style={{fontSize: '0.2rem'}}>
                                                                可投金额 { (ele.projectAmount - ele.financingAmount) }元
                                                            </div>
                                                        )
                                                    }
                                                })()}


                                            </div>

                                        </div>
                                    )
                                }}
                                componentDidMount={()=>{
                                    setTimeout(function(){
                                        lazyloader.init({
                                            ele: document.querySelector('.viewListWrap2')
                                        });
                                    },10)

                                }}
                                onScroll={(ev)=>{
                                    lazyloader.processScroll();
                                }}
                            >

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

                                                                    /*
                                                                     轮播图、公告：adDetailType=1 详情取 adDetailUrl，不拼IP端口。
                                                                     轮播图、公告：adDetailType=3 详情调项目详情接口。
                                                                     轮播图：adDetailType=4 详情取 adSignlePictureUrl 拼IP端口。

                                                                    */
                                                                     if(ele.adDetailType == 1){
                                                                         //显示图片
                                                                         Utils.switchRoute('/proclaimDetail?url='+ ele.adDetailUrl+'&title='+ele.adTitle)
                                                                     }else if(ele.adDetailType == 3){
                                                                         Utils.switchRoute('/projectIntroduction?productId='+ele.product.productId)
                                                                     }else if(ele.adDetailType == 4){
                                                                         //显示图片
                                                                         Utils.switchRoute('/proclaimDetail?url='+ config.img + ele.adSignlePictureUrl+'&title='+ele.adTitle)
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

                                                                         if(ele.adDetailType == 1){
                                                                             //显示图片
                                                                             Utils.switchRoute('/proclaimDetail?url='+ ele.adDetailUrl+'&title='+ele.adTitle)
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
                            </ViewList>

                        )
                    }())}

                    {/*ViewList  end*/}

                    <ul>







                    </ul>
                </section>

                {(function () {
                    if(that.state.AddYieldObj.isAlertShow){
                        return(
                            <div className="my-book-box">
                                <div className="b-main">
                                    <div className="congBannerYield">+{that.state.AddYieldObj.data.addYield}%</div>
                                    <div className="describle">
                                        您已经获得邀请人
                                    </div>
                                    <div  className="describle">
                                        {that.state.AddYieldObj.data.phone}赠予的“加息{that.state.AddYieldObj.data.addYield}%
                                    </div>
                                    <div className="describle">特权”，投资即享！</div>
                                    <div className="inputItem noBorder bnt-red mt30"
                                        onClick={()=>{
                                            that.state.AddYieldObj.isAlertShow = false;
                                            componentStore.update(that,that.state)
                                        }}
                                    >确定</div>
                                </div>

                            </div>
                        )
                    }
                })()}


                {(function () {
                    if(that.state.isTestShow){
                        return (
                            <div className="my-book-box" onClick={()=>{
                                componentStore.update(that,{
                                    isTestShow: false
                                })
                            }}>
                                <div className="b-main" id="hei580">
                                    <img src={require('../../../image/img/test.png')} alt=""/>
                                    <div className="goTestBtn" onClick={()=>{
                                        window.location.href="/h5Static/risk_open.html?"+"token="+Utils.Storage.get('user').token
                                    }}>
                                        去测测
                                    </div>
                                </div>
                            </div>
                        )
                    }

                })()}



            </div>
        )
    }

}

export default Home;
