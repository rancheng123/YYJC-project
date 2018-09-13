/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './activity.scss'
//导入样式 end



class activityDetail extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            detail : []
        }
        //从后台获取活动列表数据

        Utils.requestData({
            url: config.api + 'qj/front/v1/activity/getActivityDetail',
            method: 'post',
            data : {
                "activityId": Utils.Url.parseUrl(location.hash).params.activityId
            },
            callback: function(data){
                console.log('-------------------');
                console.log(data,that);
                console.log('-------------------');
                if(data.resultCode==0){
                    componentStore.update(that,{
                        detail : data.data.activityInfoDetail
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

    render(){
        let detail = this.state.detail;
        return (

            <Backbar $id="reAddress" title={detail.activityTitle}>
                <div className="active-Detail">
                    <img src={config.img+detail.activityUrl} className="acDetail-img" />
                </div>
            </Backbar>

        )
    }

}

export default activityDetail;
