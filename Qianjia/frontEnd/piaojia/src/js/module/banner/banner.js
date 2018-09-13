/**
 * Created by 李永帅 on 2017/3/21.
 */

/*  使用方法
* <Banner $id="Banner" imges={this.state.imges}
*   play={true}//是否自动轮播 true  禁止轮播 false
*   delayTime={2}//轮播停留的时间（2-3）不宜太大或者太小   太大轮播的太慢   太小轮播的停留时间过短用户体验太差
*   interval={0.5}//轮播的过度时间越小越好
* >
* </Banner>
*/
//导入样式 start
import './banner.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;

import {Router , Route, Link , hashHistory} from "react-router";
//导入样式
import "./banner.scss";


/*import slide from 'react-slider'*/

//定义公共标题组件以及二级导航

class Banner extends Component{
    constructor(){
        super();
        this.state={
            now:0,
            isInterval:true,
            left:0
        }
    };
    componentDidMount(){
        this.goPlay();//装载完成启动定时器
        // 存储 start
        componentStore.set(this);
        // 存储 end
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
       this.stopPlay();//清除定时器
    };
    //goshift移动的位置
    goShift(n){
        var Ul=this.refs.ul;
        var imgs=this.props.imges.length;
        var x=this.state.now+n;
        /*console.log("x:"+x);
        console.log("imgs:"+imgs);
        console.log("n:"+n);*/
        if(x<0){
            x=x+imgs;
        }
        if(x==imgs){
            /*x=0;*/
            /*this.setState({isInterval:false})*/
            this.setState({now:0});

        }else{
            this.setState({isInterval:true});
            this.setState({now:x})
        }
        if(x>imgs){
            alert("大于")
        }
       /*if(x>this.props.imges.length){
            x=x-this.props.imges.length;
            this.setState({isInterval:true});
            alert("2")
        }*/
        /*this.setState({now:x})*/

    };
    //自动轮播
    goPlay(){
        if(this.props.play){
            //定时器赋值
            //this.autoPlayFlag=
            this.autoPlayFlag=setInterval(function(){
                this.goShift(1);
            }.bind(this),this.props.delayTime*1000)
        }
    }
    //暂停播放stopPlay
    stopPlay(){
        clearInterval(this.autoPlayFlag);
    }
    handTouch(i){
        var m=i-this.state.now;//当前按钮的编号
        this.goShift(m);//点击按钮时移动的位置
    }
    render(){
       /*console.log(this.state.now)*/
        let leftL=this.state.now*-100+'%'; /*this.setState({left:-100 * x+ "%"})*/
        let btns=this.props.imges.length;
        //遍历li
        let liArr=this.props.imges.map(function(img,i){
            {
                return(
                    <li key={"img"+i} className="slider-item" >
                        <img src={img.src} alt=""/>
                    </li>
                )
            }
        })
        //遍历轮播图的小按钮
        let btnArr=[];
        for (let i=0;i<btns;i++){
            var currentBtn=<span key={"span"+i} className={i===this.state.now? "currenSpan":""} onTouchStart={this.handTouch.bind(this,i)}></span>;
            btnArr.push(currentBtn);
        }
        return (
            <div className="adver">
                <div className="banner">
                    <ul onTouchStart={this.handTouch.bind(this)} ref="ul" style={{
                        left: leftL,
                        transitionDuration:this.state.isInterval?this.props.interval+"s":"0s",
                        width: this.props.imges.length * 100 + "%"
                    }}>
                        {liArr}
                    </ul>
                    <div className="btns">{btnArr}</div>
                </div>
            </div>
        )
    }
}
export default Banner;