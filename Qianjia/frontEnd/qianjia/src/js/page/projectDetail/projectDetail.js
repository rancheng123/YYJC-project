/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';



//导入样式 start
import '../riskManage/riskManage.scss'
//导入样式 end



class ProjectDetail extends Component{
    constructor(){
        super();

        var that = this;
        //在此处初始化状态
        this.state={
            data : null
        }

        Utils.requestData({
            url: config.api + 'qj/front/v1/commonimg/getCommonImg',
            method: 'post',
            data:{
                "imgtype": "PROJECTDETAIL",
                "projectid": Utils.Url.parseUrl(location.href).params.projectId
                //"projectid": 82

            },
            callback: function(data){
                console.log(data);
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
        console.log(data);
        if(!data){
            return (
                <div></div>
            )
        }else{
            return (
                <div className="riskManage-wrap">
                    <dl className="list-box">
                        <dd>
                            <span>年化回报率：{parseInt(data.financingAnnualYield)}%</span>
                        </dd>
                        <dd>
                            <span>本期融资金额：{data.projectAmount}元</span>
                        </dd>
                        <dd>
                            <span>借款用途：{data.fundGuarantee}</span>
                        </dd>
                        <dd>
                            <span>起投金额：{data.investMinAmount}元</span>
                        </dd>
                        <dd>
                            <span>投标截止时间：{data.projectEndDate}</span>
                        </dd>
                    </dl>
                    {
                        data.commonImgList.map(function(item,index){
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

            <Backbar $id="projectDetail" title="项目详情">

                {this.renderEle()}
            </Backbar>

        )
    }

}

export default ProjectDetail;
