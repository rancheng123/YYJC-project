/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';



//导入样式 start
import './riskManage.scss'
//导入样式 end



class RiskDetail extends Component{
    constructor(){
        super();
        var that = this;
        //在此处初始化状态
        this.state={
            data : null
        }
        let params = Utils.Url.parseUrl(location.href).params;

        Utils.requestData({
            url: config.api + 'qj/front/v1/commonimg/getCommonImg',
            method: 'post',
            data:{
                "imgtype": "PROJECTRISK",
                "projectid": params.projectId,
                "productId": params.productId

            },
            callback: function(data){
                if(data.resultCode==0){
                    var data = data.data;
                    componentStore.update(that,{
                        data : data
                    });
                }
            }
        });

    }
    componentWillMount(){
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

            <Backbar $id="RiskDetail" title="相关资料">
                <div className="riskManage-wrap">
                    <div className="project-img-box">
                        {
                            that.state.data?that.state.data.commonImgList.map(function(item,index){
                                console.log(item);
                                return (
                                    <div key={index}>
                                        <img src={config.img+item.imgurl} />
                                    </div>
                                )
                            }) : ""
                        }
                    </div>
                </div>
            </Backbar>

        )
    }

}

export default RiskDetail;
