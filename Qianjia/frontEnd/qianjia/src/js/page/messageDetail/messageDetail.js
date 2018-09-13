/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './messageDetail.scss'
//导入样式 end



class MessageDetail extends Component{
    constructor(){
        super();
        var that = this;

        this.state = {
            messageDetailData : JSON.parse( Utils.Storage.get('messageDetailData') )
        }
        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData2({
                requestArr:  [
                    //获取商品列表
                    {
                        url: config.api +"qj/front/v1/membermessage/updateMemberMessage2Read",
                        method: 'post',
                        data: {
                            "type": "ONE",
                            "messageId": that.state.messageDetailData.messageId
                        }
                    }
                ],
                callback: function(dataArr){

                    var messageData = dataArr[0];
                    console.log(messageData);
                    if(messageData.resultCode == 0){

                    }
                }
            })
        })
    }
    componentWillMount(){

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
        var that = this;
        return (

            <Backbar $id="messageDetail" title="消息详情">
                {
                    (()=>{
                        var messageDetailData = that.state.messageDetailData;

                        if(!messageDetailData){
                            return (
                                <div></div>
                            )
                        }else{
                            return (
                                <div className="message-detail">
                                    <div className="m-time">
                                        <span>{messageDetailData.sendDateStr}</span>
                                    </div>
                                    <div className="m-text">
                                        <p>{messageDetailData.messageContent}</p>
                                    </div>

                                </div>
                            )
                        }
                    })()
                }

            </Backbar>

        )
    }

}

export default MessageDetail;
