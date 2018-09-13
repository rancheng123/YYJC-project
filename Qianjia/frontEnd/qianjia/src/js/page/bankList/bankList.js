import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'
//导入样式 start
import './bankList.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';
import { Modal } from 'antd-mobile';


class BankBingding extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that=this;
        //在此处初始化状态
        this.state={
            data:[]
        }

        Utils.tokenExpireJumpToLogin(function () {
            // //支持哪些银行数据
            Utils.requestData({
                url: config.api + 'qj/front/v1/account/bankList',
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){
                        componentStore.update(that,{
                            data:data.data
                        })
                    }
                }
            });
        })



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
    listClick(e){
    }
    render(){
        var that = this;
        let data=that.state.data;
        return (
            <div className="bankList">
                <Backbar $id="bankList" title="支持银行卡列表" >
                    <div className="bankListContent">
                        <ul ref="bankList">
                            {
                                data.map(function(item,i){
                                    return <li key={'bankList'+i}><div className="left"><div className="log_img"><img src={config.img+item.iconUrl} alt=""/></div></div><div className="right"><div className="textName">{item.bankName}</div></div>
                            </li>
                                })
                            }
                        </ul>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default BankBingding;
