import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import LazyLoad from '../../src/index';
import Widget from '../../src/Widget';
import _ from 'underscore';
import classNames from 'classnames';
//引入公共部分组件语法import...from....
import Title from '../../module/navTitle/navTitle';             //引入头部及导航组件
import ProjectList from '../../module/projectList/projectList';//引入项目列表组件
import Banner from '../../module/banner/banner';                //引入banner组件
import Trundle from '../../module/trundle/trundle';              //引入消息轮播组件
import Button from '../../../scss/button/button';                //引入按钮组件
import Input from '../../module/input/input'                     //引入按钮的组件
import { Carousel } from 'antd-mobile';                            //蚂蚁金服插件
import Modal from '../../module/modal/modal'                      //弹窗提示组件

//导入样式 start
//引入scss语法 import...跟样式文件位置
import '../../../scss/base/common.scss';
import './homeModule.scss';
//导入样式 end
//定义组件语法class ... extends Component{...}
class HomeModule extends Component {
    constructor(){
        super();
    };
    componentWillMount(){

        this.state={
            st:'1',
            btnSt:false,
            data : [
                {
                    projectImg:require("../../../image/project-img-1.png"),//项目图片
                    projectTitle:"新项目标题",                                //项目标题
                    income:"18",                                               //项目的年化收益率
                    staten:"block",                                            //是否有浮动收益有就block无则none
                    time:"20",                                                  //标的的时间(例如：20个月的标)
                    wholeMoney:"500",                                          //融资总金额
                    progressValue:"60",                                        //融资进度（60代表60%）
                    moneyProgress:"300",                                       //已经投资了多少金额
                    differ:"200",                                               //还剩多少金额可投资
                    giftName:"一车空气",                                        //赠品的名称
                    floatRate:require("../../../image/floatRate.png"),       //浮动收益的图片
                    giftState:"none",                                            //项目是否有满赠活动（有就 block 无则 none）
                    countDownBtn:"block",                                        //倒计时项目block 可以投资的项目就隐藏此处none  注意：：：这个状态与下面的状态时刻相反不能同时保持一样
                    stateBtn:"none"                                               //可以投资的是block 若是倒计时的项目none
                },
                {
                    projectImg:require("../../../image/project-img-1.png"),//项目图片
                    projectTitle:"新项目标题2",                                //项目标题
                    income:"18",                                               //项目的年化收益率
                    staten:"none",                                            //是否有浮动收益有就block无则none
                    time:"20",                                                  //标的的时间(例如：20个月的标)
                    wholeMoney:"500",                                          //融资总金额
                    progressValue:"60",                                        //融资进度（60代表60%）
                    moneyProgress:"300",                                       //已经投资了多少金额
                    differ:"200",                                               //还剩多少金额可投资
                    giftName:"一车空气",                                        //赠品的名称
                    floatRate:require("../../../image/floatRate.png"),       //浮动收益的图片
                    giftState:"none",                                            //项目是否有满赠活动（有就 block 无则 none）
                    countDownBtn:"none",                                        //倒计时项目block 可以投资的项目就隐藏此处none  注意：：：这个状态与下面的状态时刻相反不能同时保持一样
                    stateBtn:"block"                                               //可以投资的是block 若是倒计时的项目none
                }

            ],
            imges:[//轮播图的维护此处
                {
                    src:require("../../../image/advertising/demo1.jpg"),
                    alt: 'images-1',
                },
                {
                    src: require("../../../image/advertising/demo2.jpg"),
                    alt: 'images-2',
                },
                {
                    src:require("../../../image/advertising/demo3.jpg"),
                    alt: 'images-3',
                }
            ],
            infos:["新闻1","新闻2","新闻3","新闻4"],
            motailState:'display'
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
    handClick(){
        this.setState({
            btnSt:true
        })
    }
    cityList(){
        alert("请选择城市11111")
    }
    render(){
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        /*console.log("btnSt----:"+this.state.btnSt);*/
        return (
            <div>

                <div className="home clearfix">
                    <Title
                        title={"钱夹"}
                        $id="navTitle"
                        munIng={require("../../../image/mbtn.png")}
                        addr={"北京"}
                        citys={this.cityList}
                    >
                    </Title>
                </div>
                <Banner $id="Banner" imges={this.state.imges}
                        play={true}//是否自动轮播 true  禁止轮播 false
                        delayTime={2}//轮播停留的时间（2-3）不宜太大或者太小   太大轮播的太慢   太小轮播的停留时间过短用户体验太差
                        interval={0.5}//轮播的过度时间越小越好
                >
                </Banner>
                <Carousel autoplay{...settings} >
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
                <Trundle  $id="trundle" intervalTime={3} infos={this.state.infos} overTime={1} >
                </Trundle>
                <div className="hull">
                    {
                        this.state.data.map(function(item,i){
                            return (
                                <ProjectList
                                    $id={"List"+i}
                                    key={i} btn={item.btn}
                                    projectImg={item.projectImg}
                                    staten={item.staten}
                                    stateBtn={item.stateBtn}
                                    projectTitle={item.projectTitle}
                                    income={item.income}
                                    time={item.time}
                                    wholeMoney={item.wholeMoney}
                                    moneyProgress={item.moneyProgress}
                                    differ={item.differ}
                                    floatRate={item.floatRate}
                                    pjtState={item.pjtState}
                                    giftName={item.giftName}
                                    giftState={item.giftState}
                                    progressValue={item.progressValue}
                                    countDownBtn={item.countDownBtn}
                                >
                                </ProjectList>
                            )
                        })
                    }
                </div>
                <Link to="/module2">测试跳转，点击我调到module2</Link>
                <Input $id="input" />
               {/* <Button $id="btn" content="touzi" radius="50%" width="150px" height="150px"></Button>
                <Button bkg="#ff7404" lineH={50+"px"} $id="button" content="提交" height={50+"px"}></Button>
                <Button content="立即投资" $id="buttonA" width="50%" radius="10px"></Button>
                <Button bkg="#7f7f7f" lineH={50+"px"} $id="button11" content="注册" height={50+"px"}></Button>*/}
                <Button content="点我看看" click={this.handClick.bind(this)} $id="modulA" bkg="blur" ></Button>
                <Normal></Normal>
                {/*<div className="backMotail" style={{display:this.state.motailState}}></div>*/}
                <Modal $id="modal"
                       leftBtn="下次再说"
                       rightBtn="立即开通"
                       text="钱夹理财交易资金由汇付天下全程托管"
                       title="开通汇付账单"
                       defaultState={this.state.motailState}
                       st={this.state.st}
                       safe="1"
                       btnSt={this.state.btnSt}
                >
                </Modal>
            </div>

        )
    }

};
//一个页面只能抛出一个默认组件
export default HomeModule;
//懒加载组件测试阶段代码

//定义一个方法截取  ID
function uniqueId() {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
}
//组件代码
var numA=30;
class Normal extends Component {
    constructor() {
        super();

        const id = uniqueId();//独特的ID
        this.state = {
            arr: Array.apply(null,Array(numA)).map((a, index) => {
                return {
                    uniqueId: id,
                    once: [3, 4].indexOf(index) > -1
                };
            })
        };
    }

    handleClick() {
        const id = uniqueId();

        this.setState({
            arr: this.state.arr.map(function(el){
                return {
                    uniqueId: id
                };
            })
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div>
                    {this.state.arr.map((el, index) => {
                        return (
                            <LazyLoad once={el.once} key={index} height={200} offset={[-100, 0]}>
                                <Widget once={el.once} id={el.uniqueId} count={index + 1} />
                            </LazyLoad>
                        );
                    })}
                </div>
            </div>
        );
    }
}



