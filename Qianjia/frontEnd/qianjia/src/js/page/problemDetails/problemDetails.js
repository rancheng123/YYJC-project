import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';

//导入样式 start
import './problemDetails.scss'
//导入样式 end


class ProblemDetails extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            // data:[//列表bar数据
            //     {
            //         title: '钱夹支持哪些银行卡？',
            //         right_src:require('../../../image/icon/icon_right.png'),
            //         setTetx:false,
            //         text:"都是收费的了康复的是，没 第三方郭敬明发的是离开过第三方郭敬明发的是离开过第三方郭敬明发的是离开过第三方郭敬明发的是离开过第三方郭敬明发的是离开过第三方郭敬明发的是离开过",
            //         text_state:false,
            //         src:'http://uat.piaojiazi.com:8087/qjfweb/wap/commonStaticHtml?jsp=problemDetail&isWap=1'
            //     },
            //     {
            //         title: '钱夹支持哪些银行卡？',
            //         right_src:require('../../../image/icon/icon_right.png'),
            //         setTetx:false,
            //         text:"的时间和服务框架撒谎的罚款决定书后来发的是客户空间都是废话的时间和服务框架撒谎的罚款决定书后来发的是客户空间都是废话的时间和服务框架撒谎的罚款决定书后来发的是客户空间都是废话",
            //         text_state:false,
            //         border:false,
            //         src:'http://uat.piaojiazi.com:8087/qjfweb/wap/commonStaticHtml?jsp=problemDetail&isWap=1'
            //     },
            // ],
        }
        //在此处初始化状态
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
        var that=this;
        return (
            <div>
                <Backbar $id="backbar" title={'常见问题'} >
                    <div className="set_content">
                        <div className="top" id="top">
                            {/*{this.state.data.map(function(item,i){
                                return <ProblemBar $id={'ProblemBar'+i} key={'bar'+i} border_b={item.border} addsrc={item.src}  contentText={item.text} text_state={item.text_state} dataRefs={"AA"+i} title={item.title} right_src={require('../../../image/icon/icon_right.png')}></ProblemBar>
                            })}*/}
                                
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default ProblemDetails;

class ProblemBar extends Component {
    constructor(){
        super()
    }
    componentWillMount(){
        this.state={
            isClick:false,
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
    onClickSt(){
        var current = this.props.dataRefs;
        var parent = this.refs[current].parentNode;
        var childDom = parent.getElementsByClassName('textDetails');
        var currentText = this.refs[current].getElementsByClassName('textDetails')[0];
        var img = parent.getElementsByClassName('src_img');
        // for(var i=0; i<childDom.length; i++){
        //    if(childDom[i] != currentText){
        //         childDom[i].style.display='none';
        //         img[i].src=require('../../../image/icon/icon_right_bottom.png');
        //    }

        // }
        // var currentObj=this.refs[current].getElementsByClassName('textDetails')[0];
        // var currentState = window.getComputedStyle(currentObj,null).display;
        // console.log(this.refs[current].getElementsByClassName('src_img')[0].src);
        // if(currentState == 'none'){
        //     //alert(1);
        //     this.refs[current].getElementsByClassName('textDetails')[0].style.display = 'block';
        //     this.refs[current].getElementsByClassName('src_img')[0].setAttribute('src',require('../../../image/icon/icon_right_top.png'));
        //    console.log(this.refs[current].getElementsByClassName('src_img').src);
        // }else{
        //     //alert(2);
        //      this.refs[current].getElementsByClassName('textDetails')[0].style.display = 'none';
        //       this.refs[current].getElementsByClassName('src_img')[0].setAttribute('src',require('../../../image/icon/icon_right_bottom.png'));
        // }
        
        
        
    }
    render(){
        var that = this;
        let border = this.props.border_b == undefined || this.props.border_b == true ? true :false;
        console.log(this.props.addsrc);
        return(
            <div ref={this.props.dataRefs} onTouchEnd={this.onClickSt.bind(this)}  className="bar_list">
                <div>
                    <a href={this.props.addsrc}>
                        <div className={border?"problem_border" : ''}>
                            <div className="problem_list" >
                                <div className="list_left">
                                    <span className={"left_text"}>{this.props.title}</span>
                                </div>
                                <div className="list_right">
                                    <div className="right_img">
                                        <img className="src_img" src={require('../../../image/icon/icon_right_bottom.png')} alt="箭头"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <div className="textDetails">{this.props.contentText}</div>
                </div>
                
            </div>
        )
    }
}