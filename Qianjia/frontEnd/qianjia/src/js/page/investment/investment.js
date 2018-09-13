import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './investment.scss'
//导入样式 end
import NavBar from '../../module/navBar/navBar';
import TitleBar from '../../module/titleBar/titleBar';

import Picker from '../../widget/picker/picker';
import ViewList from '../../widget/viewList/viewList';




class Investmenr extends Component{
    constructor(){
        super();
    }
    componentWillMount(){


        //在此处初始化状态
        this.state={
            picker1: {
                select: {
                    label: '最热',
                    value: '1'
                },
                data: [
                    {
                        label: '最热',
                        value: '1'
                    },{
                        label: '最新',
                        value: '2'
                    }
                ]
            },
            picker2: {
                select: {
                    label: '不限',
                    value: ''
                },
                data: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '小于10%',
                        value: 'to10'
                    },
                    {
                        label: '10-15%',
                        value: '10to15'
                    },
                    {
                        label: '大于15%',
                        value: '15'
                    }
                ]
            },
            picker3: {
                select: {
                    label: '不限',
                    value: ''
                },
                data: [

                    {
                        label: '不限',
                        value: ''
                    },{
                        label: '1-30天',
                        value: 'to1'
                    },{
                        label: '30-60天',
                        value: '1to2'
                    },{
                        label: '60-90天',
                        value: '2to3'
                    },{
                        label: '90天以上',
                        value: '3'
                    }
                ]
            },
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
        let that = this;

        Utils.requestData2({
            requestArr:  [
                // 获取加息标识位
                {
                    url: config.api +"qj/front/v1/user/getAddYield",
                    method: 'post',
                    data: {
                        "memberId": Utils.Storage.get('user').memberId
                    }
                }
            ],
            callback: function(dataArr){

                var getAddYield = dataArr[0];
                if(getAddYield.resultCode == 0){

                    componentStore.update(that,{
                        getAddYield: getAddYield.data.addYield
                    })
                }
            }
        })

        this.getProductList();

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    getProductList(){
        var that = this;

        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })



        Utils.requestData2({
            requestArr:  [
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/product/getProductList",
                    method: 'post',
                    data: {
                        "pn": that.state.viewList.currentPageNum,
                        "pageSize": "10",
                        //最热,最新
                        "projectOrder": that.state.picker1.select.value,
                        //预期年化率
                        "yieldFilter": that.state.picker2.select.value,
                        //项目期限
                        "periodFilter": that.state.picker3.select.value,
                        "productCity": Utils.Storage.get('currentCity')
                    }
                }
            ],
            callback: function(dataArr){

                var productData = dataArr[0];
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
            <div className="investmenr">
                <TitleBar $id="titleBar">
                    <div className="flex-child1 location" style={{visibility: 'hidden'}}>XX</div>
                    <div className="flex-child1 title">投资</div>

                    {/*按钮组件  start*/}

                    <div className="flex-child1 controllBtn ">
                        <NavBar $id="home-navBar"></NavBar>
                    </div>
                    {/*按钮组件  end*/}
                </TitleBar>

                <div className="pickerWrap flex-father">
                    <div className="pickerItem hot">


                         <Picker $id="picker-test1"
                                 onYes={(data)=>{
                                     that.state.picker1.select.label = data.textArr.join(',');
                                     that.state.picker1.select.value = data.idArr.join(',');


                                     //重置列表
                                     that.state.viewList.data = [];
                                     that.state.viewList.currentPageNum = 1;

                                     componentStore.update(that,that.state);
                                     that.getProductList();

                                 }}
                                 onChange={()=>{

                                 }}
                                 title=""
                                 data={that.state.picker1.data}
                                 cols={1}
                                 className="picker_self"
                         >
                             <span className="picker-text">{this.state.picker1.select.label}</span>
                             <span className="arrow"></span>
                             <span className="rightBorder"></span>
                         </Picker>


                    </div>
                    <div className="pickerItem" style={{width: '3.1rem'}}>

                        <Picker $id="picker-test2"
                                 onYes={(data)=>{
                                     that.state.picker2.select.label = data.textArr.join(',');
                                     that.state.picker2.select.value = data.idArr.join(',');

                                     //重置列表
                                     that.state.viewList.data = [];
                                     that.state.viewList.currentPageNum = 1;

                                     componentStore.update(that,that.state);
                                     that.getProductList();
                                 }}
                                 onChange={()=>{

                                 }}
                                 title=""
                                 data={that.state.picker2.data}
                                 cols={1}
                                 className="picker_self"
                         >
                             <span className="picker-text">{this.state.picker2.select.label == '不限'?'预期年化回报率':this.state.picker2.select.label}</span>
                             <span className="arrow"></span>
                             <span className="rightBorder"></span>
                         </Picker>

                    </div>
                    <div className="pickerItem flex-child1">

                        <Picker $id="picker-test3"
                                 onYes={(data)=>{
                                     that.state.picker3.select.label = data.textArr.join(',');
                                     that.state.picker3.select.value = data.idArr.join(',');

                                     //重置列表
                                     that.state.viewList.data = [];
                                     that.state.viewList.currentPageNum = 1;

                                     componentStore.update(that,that.state);
                                     that.getProductList();
                                 }}
                                 onChange={()=>{

                                 }}
                                 title=""
                                 data={that.state.picker3.data}
                                 cols={1}
                                 className="picker_self"
                         >
                             <span className="picker-text">{this.state.picker3.select.label == '不限'?'项目期限':this.state.picker3.select.label}</span>
                             <span className="arrow"></span>
                         </Picker>

                    </div>
                </div>


                <section className="financeList">

                    {/*ViewList  start*/}
                    {(function(){

                        return (

                            <ViewList
                                $id="investment-viewList"
                                isListen={that.state.viewList.isListen}
                                listenDistance={60}
                                loading={that.state.viewList.loading}
                                data={that.state.viewList.data}
                                height={500}
                                render={(ele,i)=>{
                                    return (
                                        <li className="financeItem"
                                            onClick={()=>{
                                                Utils.switchRoute('/projectIntroduction?productId='+ele.productId)
                                            }}
                                        >




                                            {(function () {

                                                {/*
                                                 0预发布
                                                 1融资中
                                                 3还款中
                                                 4还款完成
                                                */}

                                                if (ele.projectProgressStatus == 0) {
                                                    //即将开启
                                                    return(
                                                        <img className="jjkq" src={require('../../../image/img/jjkq.png')} alt=""/>
                                                    )
                                                }if (ele.projectProgressStatus == 3) {
                                                    //还款中
                                                    return(
                                                        <img className="repayStatus" src={require('../../../image/icon/watermark_repaying.png')} alt=""/>
                                                    )
                                                } else if (ele.projectProgressStatus == 4) {
                                                    //还款完成
                                                    return(
                                                        <img className="repayStatus" src={require('../../../image/icon/watermark_repaid.png')} alt=""/>
                                                    )

                                                }



                                                {/*else if (ele.projectProgressStatus == 4) {
                                                    //满标
                                                    return(
                                                        <img className="repayStatus" src={require('../../../image/icon/watermark_full_bid.png')} alt=""/>
                                                    )

                                                } else if (ele.projectProgressStatus == 5) {
                                                    //退款中
                                                    return(
                                                        <img className="repayStatus" src={require('../../../image/icon/watermark_refund_ing.png')} alt=""/>
                                                    )

                                                } else if (ele.projectProgressStatus == 6) {
                                                    //退款完成
                                                    return(
                                                        <img className="repayStatus" src={require('../../../image/icon/watermark_refund_finish.png')} alt=""/>
                                                    )
                                                }*/}



                                            })()}


                                            <div className="financeTitle">
                                                {ele.productTitle}
                                            </div>


                                            <div className="item_desc flex-father">
                                                <div className="item_desc_item flex-child1 item_desc_item1">
                                                    <div className="item_desc_item_value">
                                                        <span className="percentNum">{ele.financingAnnualYield}</span><span className="percentHao">%</span>

                                                        {(function () {
                                                            if(that.state.getAddYield != 0){
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


                                                <div  style={{fontSize: '0.2rem'}}>
                                                    可投金额 {   Utils.getFloatNum((ele.projectAmount - ele.financingAmount) ,5)  }元
                                                </div>

                                            </div>

                                        </li>
                                    )
                                }}
                                getDataFn={(data)=>{
                                    that.getProductList();
                                }}
                                componentDidMount={()=>{


                                }}
                                onScroll={(ev)=>{

                                }}
                            >
                            </ViewList>

                        )
                    }())}

                    {/*ViewList  end*/}
                </section>

            </div>
        )
    }

}

export default Investmenr;
