import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';

//导入样式 start
import './problemList.scss'
//导入样式 end


class Problem extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var  that = this;
        this.state={
            top:[//列表bar数据
                // {
                //     left_src:require('../../../image/icon/icon_problem.png'),
                //     title: '注册与登录',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'problemDetail.html',
                //     setTetx:false,
                //     orders:''
                // },
                // {
                //     left_src:require('../../../image/icon/icon_problem.png'),
                //     title: '账户与安全',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'accountSecurity.html',
                //     setTetx:false
                // },
                // {
                //     left_src:require('../../../image/icon/icon_problem.png'),
                //     title: '充值与提现',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'recharge.html',
                //     setTetx:false,
                // }
                // ,
                // {
                //     left_src:require('../../../image/icon/icon_problem.png'),
                //     title: '投资与回款',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'payment.html',
                //     setTetx:false,
                // },
                // {
                //     left_src:require('../../../image/icon/icon_problem.png'),
                //     title: '优惠与奖励',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'couponAward.html',
                //     setTetx:false,
                // },
                // {
                //     left_src:require('../../../image/icon/icon_problem.png'),
                //     title: '名词解释',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'nounExplain.html',
                //     setTetx:false,
                //     border:false
                // }
            ],
        }
        console.log('跳转类型判断：',Utils.Url.parseUrl(location.href).params.type);
        //在此处初始化状态
        Utils.requestData({
            url: config.api +"qj/front/v1/question/questionTypeList",
            method: 'post',
            data: {},
            callback: function(data){
                if(data.resultCode == 0){
                    // console.log('问题列表：',data.data);
                    // componentStore.update(that,{
                    //    top:data.data
                    // })
                    var listProblemData;
                    var newData = data.data;
                    for(var i = 0 ; i < newData.length ; i++){
                        // that.state.top[i].title = data.data[i].questionType
                        newData[i].left_src = require('../../../image/icon/icon_problem.png');
                        newData[i].right_src = require('../../../image/icon/icon_right.png');
                        newData[i].srcHref = 'globalProblemDetail.html';
                    }
                    console.log('新数据：',newData);
                    componentStore.update(that,{
                        top:newData
                    });
                }
            }
        });
        
        
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
    toProblemDetail(url,id,name){
        // console.log(name);
        window.location.href="/h5Static/"+url+"?questionTypeId="+id+"&title="+encodeURIComponent(name);
        // console.log("params::",url,id,name);
        // console.log("window.location.href=","/h5Static/"+url+"?questionTypeId="+id+"&title="+name);
    }
    render(){
        let that = this;

        return (
            <div>
                <Backbar $id="backbar" title={'常见问题'} >
                    <div className="problem_content">
                        <div className="top">
                            <div className="problrm_list">
                                
                                {this.state.top.map(function(item,i){
                                    return <ListBar $id={'set_list_top'+i} key={'set_list'+i} listBarFn="true" fn={()=>{that.toProblemDetail(item.srcHref,item.questionTypeId,item.questionType)}} setText={item.questionType} border_b={item.border} left_src={item.left_src} title={item.questionType} src={''}  right_src={item.right_src}></ListBar>
                                })}
                            </div>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default Problem;