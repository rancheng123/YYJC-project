import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';
//导入样式 start
import './policyAndRuleDetail.scss'
//导入样式 end


class PolicyAndRuleDetail extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            
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
                <Backbar $id="backbar" title={'政策与法规'} >
                    <div className="ruleDetail">这是法规详情用pdf生成的内容</div>
                </Backbar>
            </div>
        )
    }

}

export default PolicyAndRuleDetail;