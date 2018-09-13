import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';

//导入样式 start
import './problem.scss'
//导入样式 end


class Problem extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            top:[//列表bar数据
                {
                    left_src:require('../../../image/icon/icon_problem.png'),
                    title: '注册与登录',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/home',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_problem.png'),
                    title: '账户与安全',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/home',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_problem.png'),
                    title: '充值与提现',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/home',
                    setTetx:false,
                }
                ,
                {
                    left_src:require('../../../image/icon/icon_problem.png'),
                    title: '投资与回款',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/home',
                    setTetx:false,
                },
                {
                    left_src:require('../../../image/icon/icon_problem.png'),
                    title: '优惠与奖励',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/home',
                    setTetx:false,
                },
                {
                    left_src:require('../../../image/icon/icon_problem.png'),
                    title: '名词解释',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/home',
                    setTetx:false,
                    border:false
                }
            ],
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
            
        return (
            <div>
                <Backbar $id="backbar" title={'常见问题'} >
                    <div className="set_content">
                        <div className="top">
                            <div className="list">
                                {this.state.top.map(function(item,i){
                                    return <ListBar $id={'set_list_top'+i} key={'set_list'+i} setText={item.setTetx} border_b={item.border} left_src={item.left_src} title={item.title} src={item.src}  right_src={item.right_src}></ListBar>
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