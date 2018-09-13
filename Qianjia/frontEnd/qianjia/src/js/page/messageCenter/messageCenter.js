/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';
import ViewList from '../../widget/viewList/viewList';
import lazyloader from '../../widget/lazyLoad/lazyloader';
//导入样式 start
import './messageCenter.scss'
//导入样式 end



class MessageCenter extends Component{
    constructor(){
        super();

        this.state = {

            viewList: {
                data: [],
                isListen: false,
                loading: false,
                currentPageNum: 1,
                height : 500
            }
        }


    }
    componentWillMount(){
        let that = this;
        //在此处初始化状态
        Utils.tokenExpireJumpToLogin(function () {
            //获取消息列表
            that.getMessageList();
        })

    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end

        var oMessageList = document.getElementById('message-list');
        var clientHeight = document.documentElement.clientHeight;
        var eleHeight = oMessageList.offsetTop;

        this.state.viewList.height = clientHeight-eleHeight;
        componentStore.update(this,{
            viewList: this.state.viewList
        })

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    getMessageList(){
        var that = this;

        that.state.viewList.loading = true;
        componentStore.update(that,{
            viewList: that.state.viewList
        })

        Utils.requestData2({
            requestArr:  [
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/membermessage/getMemberMessageList",
                    method: 'post',
                    data: {
                      "pn": that.state.viewList.currentPageNum,
                      "pageSize": "10"
                    }
                }
            ],
            callback: function(dataArr){

                var messageData = dataArr[0];
                if(messageData.resultCode == 0){
                    console.log('investData:::',messageData);
                    if(messageData.data.memberMessageList && messageData.data.memberMessageList.length){

                        that.state.viewList.data = that.state.viewList.data.concat(messageData.data.memberMessageList) ;
                        that.state.viewList.isListen = messageData.data.memberMessageList.length<10?false:true;
                        that.state.viewList.loading = false;
                        that.state.viewList.currentPageNum++;
                        componentStore.update(that,{
                            viewList: that.state.viewList
                        })
                    }
                }
            }
        })
    }

    render(){
        var that = this;
        return (

            <Backbar $id="messageCenter" title="消息中心" backUrl="/my" action="readAll">

                <div className="message-list" id="message-list">
                {/*ViewList  start*/}
                {(function(){

                    return (

                        <ViewList
                            $id="myGift-viewList"
                            isListen={that.state.viewList.isListen}
                            listenDistance={60}
                            loading={that.state.viewList.loading}
                            data={that.state.viewList.data}
                            height={that.state.viewList.height}
                            render={(item,index)=>{
                                return (
                                    <div className="list-item">
                                        <div className="m-item" onClick={
                                            ()=>{
                                                Utils.Storage.set('messageDetailData',JSON.stringify(item));
                                                Utils.switchRoute("/messageDetail?memberId="+item.memberId);
                                            }
                                        }>
                                            <div className="m-icon-box">
                                                <div className="m-icon">
                                                    <Icon type={require('../../../image/svg/message.svg')} />
                                                    <i className="m-dot" style={{display:item.messageStatus==0?'block':'none'}}></i>
                                                </div>
                                            </div>
                                            <div className="m-text">
                                                <h3>{item.messageTitle}</h3>
                                                <p>{item.messageContent}</p>
                                            </div>
                                            <div className="m-date">
                                                <span>{item.sendDateStr.split(" ")[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                            getDataFn={(data)=>{
                                that.getMessageList();
                            }}
                            componentDidMount={()=>{
                                setTimeout(function(){
                                    lazyloader.init({
                                        ele: document.querySelector('.message-list')
                                    });
                                },10)

                            }}
                            onScroll={(ev)=>{
                                lazyloader.processScroll();
                            }}
                        >
                        </ViewList>

                    )
                }())}
                {/*ViewList  end*/}
                </div>
                {/*<ul className="message-list">
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                    <i className="m-dot"></i>
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                    <i className="m-dot"></i>
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a className="m-item" href="/messageDetail">
                            <div className="m-icon-box">
                                <div className="m-icon">
                                    <Icon type={require('../../../image/svg/message.svg')} />
                                </div>
                            </div>
                            <div className="m-text">
                                <h3>恭喜您成功注册钱+，红包送上</h3>
                                <p>注册成功，获得50元 红包，投资可用，马...</p>
                            </div>
                            <div className="m-date">
                                <span>2016-1-20</span>
                            </div>
                        </a>
                    </li>
                </ul>*/}
            </Backbar>

        )
    }

}

export default MessageCenter;
