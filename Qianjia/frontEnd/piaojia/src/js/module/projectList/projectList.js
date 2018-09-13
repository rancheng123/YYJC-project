/**
 * Created by 李永帅 on 2017/3/22.
 */

//导入样式 start
import './projectList.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;

import {Router , Route, Link , hashHistory} from "react-router";

//导入样式
import "./projectList.scss";
//项目列表组件
class ProjectList extends Component {
    constructor(){
        super()
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
    render(){
        return (

            <div className="projectList">
                <div className="listTop">
                    <img src={this.props.projectImg} alt=""/>
                </div>
                <div className="listBottom">
                    <h5>{this.props.projectTitle}</h5>
                    <div className="projectTime">
                        <div className="clearfix">
                            <div className="timeList">
                                <ul className="clearfix timeMath">
                                    <li className="positionR">
                                        <span className="spanFontA">{this.props.income}</span><span className="spanFontC">%</span>
                                        <div style={{display:this.props.staten}}>
                                            <div className="floatRate">
                                                <img src={this.props.floatRate} alt=""/>
                                            </div>
                                        </div>
                                    </li>
                                    <li><span className="spanFontB">{this.props.time}</span><span className="spanFontC">个月</span></li>
                                    <li><span className="spanFontB">{this.props.wholeMoney}</span><span className="spanFontC">万</span></li>
                                </ul>
                                <ul className="clearfix timeTitle">
                                    <li>预期年化收益率</li>
                                    <li>项目期限</li>
                                    <li>融资总额</li>
                                </ul>
                            </div>
                            <div className="btnInstantly" style={{display:this.props.stateBtn}} onTouchStart={function(){alert("恭喜您投标成功！")}}>立即投资</div>
                            <div className="btnTime" style={{display:this.props.countDownBtn}} onTouchStart={function(){alert("此项目还未开始")}}>
                                <div className="btnLength">25:36:55后开枪</div>
                            </div>

                        </div>
                        <progress max="100" value={this.props.progressValue}></progress>
                        <div>
                            <ul className="clearfix  moneyProgress">
                                <li className="done">已投{this.props.moneyProgress}</li>
                                <li className="liFlt">可投金额{this.props.differ}万元</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{display:this.props.giftState}}>
                    <div className="gift">
                        <span><img src={require("../../../image/gift.png")} alt=""/></span><span>投资满1000元可获得 {this.props.giftName}</span>
                    </div>
                </div>

            </div>
        )
    }
}
export default ProjectList;