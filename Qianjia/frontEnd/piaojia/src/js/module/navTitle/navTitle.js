/**
 * Created by 李永帅 on 2017/3/21.
 */

//导入样式 start
import './navTitle.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;

import {Router , Route, Link , hashHistory} from "react-router";

//导入样式
import "./navTitle.scss";
//定义公共标题组件以及二级导航

class Title extends Component{
    constructor(){
        super();
    };
    componentWillMount(){
        this.state={
            bn:"none",
            title:'this is navTitle'
        }
    };
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
    handChange(){
        /*console.log(this)*/
        var btn=this.state.bn;

        if(btn == "none"){
            this.setState({
                bn:"block"
            })
        }else{
            this.setState({
                bn:"none"
            })
        }
    };
    cityList(){
        this.props.citys();
    }
    render(){
        var navTitle=1;
        if(navTitle==1){
            return(
                <div className="navPtion">
                    <ul className="glbTatle clearfix" >
                        <li onTouchStart={this.cityList.bind(this)}>{this.props.addr}</li>
                        <li>{this.props.title}</li>
                        <li onTouchStart={this.handChange.bind(this)}><img src={this.props.munIng} alt=""/></li>
                    </ul>
                    <ul className="twoNav" style={{display:this.state.bn}} >
                        <li>
                            <div className="navCont">
                                <div className="navImg navImg1"></div>
                                <div className="indexText">首页</div>
                            </div>
                        </li>
                        <li>
                            <div className="navCont">
                                <div className="navImg navImg2"></div>
                                <div className="investText">投资</div>
                            </div>
                        </li>
                        <li>
                            <div  className="navCont">
                                <div className="navImg navImg3">{/*<img src={require("../../../image/iconMy.png")} alt=""/>*/}</div>
                                <div className="myText">我的</div>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        }else if(navTitle==2){

        }
    }
}
export default Title;