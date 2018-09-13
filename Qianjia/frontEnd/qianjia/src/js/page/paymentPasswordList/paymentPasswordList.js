import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';

//导入样式 start
import './paymentPasswordList.scss'
//导入样式 end


class PaymentPasswordList extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            list:[//列表bar数据
                {
                    isLeftIcon:false,
                    title: '修改支付密码',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/verifypPaymentPassword',
                    border:true,
                    setTetx:false
                },
                {
                    isLeftIcon:false,
                    title: '重置支付密码',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/resetPaymentPassword1',
                    setTetx:true,
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
                <Backbar $id="backbar" title={'支付密码管理'} backUrl='/userSecurity' >
                    <div className="payment_content">
                        <div className="top">
                            <div className="list">
                                {this.state.list.map(function(item,i){
                                    return <ListBar $id={'set_list_top'+i} isLeftIcon={item.isLeftIcon} key={'set_list'+i} setText={item.setTetx} border_b={item.border} rightText={item.rightText} left_src={item.left_src} title={item.title} src={item.src}  right_src={item.right_src}></ListBar>
                                })}
                            </div>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default PaymentPasswordList;