/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';



//导入样式 start
import './riskManage.scss'
//导入样式 end



class RiskManage extends Component{
    constructor(){
        super();
        let that = this;
        //在此处初始化状态
        let params = Utils.Url.parseUrl(location.href).params;
        this.state={
            data : null,
            projectId : params.projectId,
            productId : params.productId,
            investProjectId : params.investProjectId
        }
        Utils.requestData({
            url: config.api + 'qj/front/v1/commonimg/getCommonImg',
            method: 'post',
            data:{
                "imgtype": "RISKDEAL",
                "projectid":that.state.projectId,
                "productId":that.state.productId
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
    renderEle(){

        var data = this.state.data;
        if(!data){
            return (
                <div></div>
            )
        }else{
            return (
                <div className="riskManage-wrap">
                    <dl className="list-box">
                        <dt>借款商户信息</dt>
                        <dd>
                            <span>开业时间：{data.merchantOpenDate}</span>
                        </dd>
                        <dd>
                            <span>主营行业：{data.merchantBussiness}</span>
                        </dd>
                        <dd>
                            <span>经营面积：{data.merchantOperatingArea}</span>
                            <a href={"/riskDetail?projectId="+this.state.projectId+'&imgType=RISKDEAL'+'&productId='+this.state.productId} className="more-link">
                                <i>相关资料</i>
                                <Icon type="right" size="sm" />
                            </a>
                        </dd>
                    </dl>
                    {
                        data.commonImgList.map(function(item,index){
                            console.log(item);
                            return (
                                <div className="img-box" key={index}>
                                    <img src={config.img+item.imgurl} />
                                </div>
                            )
                        })
                    }
                </div>
            )

        }
    }
    render(){

        return (

            <Backbar $id="riskManage" title="风控管理">
                <div className="riskManage-wrap">

                    {this.renderEle()}
                </div>
            </Backbar>

        )
    }

}

export default RiskManage;
