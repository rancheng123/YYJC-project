/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './activity.scss'
//导入样式 end



class Activity extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            index : 0,
            activeList : null
        }
        //从后台获取活动列表数据

        Utils.requestData({
            url: config.api + 'qj/front/v1/activity/getActivityList',
            method: 'post',
            callback: function(data){

                console.log(data,that);
                if(data.resultCode==0){
                    componentStore.update(that,{
                        activeList : data.data.list
                    });
                }

            }
        });
    }

    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end


        var oActive = document.getElementById('active-wrap');
        var oContent = oActive.parentNode;
        var oBackbarWrap = oContent.parentNode;

        oActive.style.height = oContent.offsetHeight + 'px';
        oBackbarWrap.style.height = document.documentElement.clientHeight + 'px';

        Utils.preventPull(oBackbarWrap,oContent);

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    swipeHandle(ev){    //上下滑动页面

        let oActive = this.refs.active;
        let aItem = oActive.getElementsByTagName('li');

        let satrtPageY;
        let movePageY;

        if(!aItem.length&aItem.length<=1)return false; //如果只有一个li或者没有不进行滑动

        if(!ev.touches[0])return false; //如果没有touch指针不进行滑动
        satrtPageY = ev.touches[0].pageY;

        let swipeMoveHandle = (ev)=>{   //定义move函数
            movePageY = ev.touches[0].pageY;
        }
        let swipeEndHandle = (ev)=>{    //定义end函数

            if( (satrtPageY-movePageY) > 10 ){

                let index = this.state.index++;
                if(index>=aItem.length-1){
                    this.state.index = aItem.length-1;
                }
                componentStore.update(this,this.state);

            }else if((satrtPageY-movePageY) < -10){

                let index = this.state.index--;
                if(index<=0){
                    this.state.index = 0;
                }
                componentStore.update(this,this.state);

            }
            this.showLevel(aItem);
            document.removeEventListener('touchmove',swipeMoveHandle);
            document.removeEventListener('touchend',swipeEndHandle);
        }

        document.addEventListener('touchmove',swipeMoveHandle);
        document.addEventListener('touchend',swipeEndHandle);

    };
    showLevel(aItem){   //判断显示当前滑动的页面

        var index = this.state.index;

        for(var i=0;i<aItem.length;i++){
            Utils.removeClass(aItem[i],'level-0');
            Utils.removeClass(aItem[i],'level-1');
            Utils.removeClass(aItem[i],'level-2');
            Utils.removeClass(aItem[i],'level-3');
            Utils.removeClass(aItem[i],'level-4');

            if(i<index){
                Utils.addClass(aItem[i],'level-0');
            }
            if(i>index+2){
                Utils.addClass(aItem[i],'level-4');
            }
        }

        if(aItem[index-1]){
            Utils.addClass(aItem[index-1],'level-0');
        }

        if(aItem[index]){
            Utils.addClass(aItem[index],'level-1');
        }

        if(aItem[index+1]){
            Utils.addClass(aItem[index+1],'level-2');
        }

        if(aItem[index+2]){
            Utils.addClass(aItem[index+2],'level-3');
        }

        if(aItem[index+3]){
            Utils.addClass(aItem[index+3],'level-4');
        }

    }

    backBtnHandle(){    //点击底部返回按钮
        let oActive = this.refs.active;
        let aItem = oActive.getElementsByTagName('li');
        componentStore.update(this,{
            index : 0
        });
        this.showLevel(aItem);
    }
    renderLi(){ //渲染li
        var list = this.state.activeList;
        if(!list)return false;
        return list.map(function(item,index){

            return (
                <li className={
                        (()=>{
                            if(index>2){
                                if(item.isOver==1){
                                    return "level-4"
                                }
                                return "level-4"
                            }else{
                                if(item.isOver==1){
                                    return "level-"+(index+1)+" ac-showOver";
                                }
                                return "level-"+(index+1);
                            }
                        })()
                    }
                    key={index}
                >
                    <div className="ac-img">
                        <a href="javascript:;" onClick={()=>{

                            if(item.activityType==0){

                                Utils.switchRoute("/activityDetail?activityId="+item.activityId);

                            }else if(item.activityType==1){ //0元购
                                var urlTitle = encodeURIComponent(item.activityTitle);
                                console.log("urlTitle-",urlTitle);
                                Utils.switchRoute("/activityRecord?title="+urlTitle);

                            }

                        }}>
                            <img src={config.img+item.activityPictureUrl} alt="" />
                            <div className="activity-over">活动已结束</div>
                        </a>
                    </div>
                    <div className="ac-text">
                        <p className="t-title">{item.activityTitle}</p>
                        <div className="t-info">
                            <span className="i-date">{item.activityStartDate&&item.activityStartDate.split(" ")[0]}</span>
                            <a className="i-read" href="javascript:;" onClick={()=>{

                                if(item.activityType==0){

                                    Utils.switchRoute("/activityDetail?activityId="+item.activityId);

                                }else if(item.activityType==1){ //0元购

                                    Utils.switchRoute("/activityRecord?title="+item.activityTitle);

                                }

                            }}>阅读详情>></a>
                        </div>
                    </div>
                </li>
            );
        })
    }

    render(){

        return (

            <Backbar $id="reAddress" title="平台活动">
                <div className="active-wrap" id="active-wrap">
                    <div className="active-box">
                        <ul className="ac-items-box" ref="active" onTouchStart={(ev)=>{
                                this.swipeHandle(ev);
                            }}>

                            {this.renderLi()}

                        </ul>
                    </div>
                    <div className="activity-btn" style={{bottom: this.state.index != 0 ? "0px" : "-50%" }} onTouchEnd={()=>{
                            this.backBtnHandle();
                        }}>
                        <div className="b-up">
                            <Icon type={require('../../../image/svg/up.svg')} />
                        </div>
                        <p className="b-text">返回最新</p>
                    </div>
                </div>
            </Backbar>

        )
    }

}

export default Activity;
