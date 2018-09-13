import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';

//导入样式 start
import './policyAndRuleList.scss'
//导入样式 end


class PolicyAndRuleList extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that=this;
        this.state={
            top:[//列表bar数据
                {
                    title: '',
                    setTetx:false
                },
            ],
        }
        //在此处初始化状态
         Utils.requestData({
            url: config.api +"qj/front/v1/my/policyandrule/getPolicyAndRuleList",
            method: 'post',
            data: {},
            callback: function(data){
                if(data.resultCode == 0){
                    console.log(data.data);
                     componentStore.update(that,{
                        top:data.data
                     })
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
    toClick(value){
        //alert('1');
        window.location.href="/h5Static/policyAndRuleDetail.html?pdfValue="+value;
    }
    render(){
        let that = this;
        console.log(that.state.top);
        return (
            <div>
                <Backbar $id="backbar" title={'政策与法规'} >
                    <div className="ruleList_content">
                        <div className="top">
                            <div className="ruleList_list">
                                {this.state.top.map(function(item,i){
                                    return <ListBar $id={'set_list_top'+i} key={'set_list'+i} listBarFn="true" fn={()=>{that.toClick(item.value)}} setText={item.setTetx} border_b={item.border} left_src={require('../../../image/icon/icon_problem.png')} data-value={item.value} title={item.description} src={""}  right_src={require('../../../image/icon/icon_right.png')}></ListBar>
                                })}
                            </div>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default PolicyAndRuleList;