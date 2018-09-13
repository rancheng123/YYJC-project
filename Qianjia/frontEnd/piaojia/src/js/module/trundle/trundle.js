/**
 * Created by 李永帅 on 2017/3/24.
 */

//导入样式 start
import './trundle.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;

import {Router , Route, Link , hashHistory} from "react-router";

//导入样式
import "./trundle.scss";
//定义公共标题组件以及二级导航

class Trundle extends Component{
    constructor(){
        super();
    };
    componentWillMount(){
        this.state={
            topNow:0
        }
    };
    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
        this.goPlay();
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
        this.stopPlay();
    };
    //上下移动的位置
    goPostion(n){
        var y=this.state.topNow+n;
        if(y<0){
            y=y+this.props.infos.length;
        }
        if(y>=this.props.infos.length){
            y=y-this.props.infos.length;
        }
        this.setState({topNow:y})

    }
    //自动播放
    goPlay(){
        this.begin=setInterval(function(){
            this.goPostion(1);
        }.bind(this),this.props.intervalTime*1000)
    }
    stopPlay(){
        clearInterval(this.begin)
    }
    render(){
        let liArr=[];
        let lis=this.props.infos;
        lis.map(function(item,i){
            return (
                liArr.push(<li key={"li"+i}>{item}</li>)
            );
        })
        let tp=this.state.topNow*-33.5;
        return(
            <div>
                <div className="trundle">
                    <span className="trundleImg">
                        <img src={require("../../../image/trundle.png")} alt=""/>
                    </span>
                    <ul style={{top:tp+"px",transitionDuration:this.props.overTime+"s"}}>{/**/}
                        {liArr}
                    </ul>
                </div>
            </div>
        )
    }

}
export default Trundle;