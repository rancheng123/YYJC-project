
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './fundAccount.scss'
//导入样式 end



class FundAccount extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            dataList : []
        }

        Utils.tokenExpireJumpToLogin(function () {

            //获取充值提现流水列表接口
            Utils.requestData({
                url: config.api +"/qj/front/v1/my/getCashNetSaveList",
                method: 'post',
                data: {

                },
                callback: function(data){
                    console.log("getCashNetSaveList:",data);
                    if(data.resultCode==0){
                        componentStore.update(that,{
                            dataList : data.data
                        })
                    }
                }
            });
        });


    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        // var oFundAccount = document.getElementById('fundAccount');
        // var parentHeight = oFundAccount.parentNode.offsetHeight;
        // console.log(parentHeight);
        // oFundAccount.style.minHeight = parentHeight+"px";

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };


    render(){
        let dataList = this.state.dataList;
        return (

            <Backbar $id="fundAccount" title="资金流水">

                {(()=>{

                    if(dataList.length==0){
                        return (
                            <div></div>
                        )
                    }else{

                        return (
                            <div className="fundAccount-wrap" id="fundAccount">
                                {(()=>{

                                    return dataList.map(function(item,index){
                                        return (
                                            <div key={index}>
                                                <h4 className="f-date">{item.group}</h4>
                                                <ul className="f-list">
                                                    {(()=>{
                                                        if(item.records.length!==0){
                                                            return item.records.map(function(childItem,childIndex){
                                                                return (
                                                                    <li key={childIndex}>
                                                                        <i className={
                                                                            (()=>{
                                                                                if(childItem.recordType=="netSave"){
                                                                                    return "f-icon f-chongzhi";
                                                                                }else if(childItem.recordType=="cash"){
                                                                                    return "f-icon f-tixian";
                                                                                }else if(childItem.recordType=="zeroBuy"){
                                                                                    return "f-icon f-zeroBuy";
                                                                                }
                                                                            })()
                                                                        }></i>
                                                                        <div className="f-text">
                                                                            <h5>{childItem.transAmt}元</h5>
                                                                            <p>{childItem.createDateStr}</p>
                                                                        </div>
                                                                        <span className={
                                                                            (()=>{
                                                                                // if(childItem.descStr=="充值成功" || childItem.descStr=="提现成功" ){
                                                                                //     return "f-status s-orange";
                                                                                // }else{
                                                                                //     return "f-status s-red";
                                                                                // }
                                                                                if(childItem.status=="000000"){
                                                                                    return "f-status s-orange";
                                                                                }else{
                                                                                    return "f-status s-red";
                                                                                }
                                                                            })()
                                                                        }>
                                                                            {childItem.descStr}
                                                                        </span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    })()}
                                                </ul>
                                            </div>
                                        )
                                    })

                                })()}


                            </div>
                        )
                    }

                })()}


            </Backbar>

        )
    }

}

export default FundAccount;
