/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './repaymentSchedule.scss'
//导入样式 end



class RepaymentSchedule extends Component{
    constructor(){
        super();

        var that = this;

        this.state = {
            schedule : null
        }

        Utils.requestData2({
            requestArr:  [
                //获取商品列表
                {
                    url: config.api +"qj/front/v1/appUser/getRepaymentSchedule",
                    method: 'post',
                    data: {
                        "projectId": Utils.Url.parseUrl(location.href).params.projectId
                        //"projectId": 329
                    }
                }
            ],
            callback: function(dataArr){

                var scheduleData = dataArr[0];

                if(scheduleData.resultCode == 0){
                    //如果是还款中才显示
                    let status = scheduleData.data.projectCollectStatus;
                    if(status==3||status==4||status==7){
                        componentStore.update(that,{
                            schedule : scheduleData.data
                        })
                    }
                }
            }
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

            <Backbar $id="myInvest" title="还款计划">

                {
                    (()=>{
                        let schedule = that.state.schedule;
                        if(!schedule){
                            return (
                                <div>
                                    <div className="repaymentSchedule-wrap">

                                        <div className="g-list-box">
                                            <ul className="g-list">
                                                <li>
                                                    <span>期次</span>
                                                    <span>还款日期</span>
                                                    <span>预期收益(元)</span>
                                                    <span>本金(元)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div style={{padding:'0.5rem',textAlign:'center'}}>结标次日开始计算还款日期</div>
                                </div>

                            )
                        }else{
                            return (
                                <div className="repaymentSchedule-wrap">

                                    <div className="g-list-box">
                                        <ul className="g-list">
                                            <li>
                                                <span>期次</span>
                                                <span>还款日期</span>
                                                <span>预期收益(元)</span>
                                                <span>本金(元)</span>
                                            </li>
                                            <li>
                                                <span>1</span>
                                                <span>{schedule.projectRepayDate}</span>
                                                <span>{schedule.totalYield}</span>
                                                <span>{schedule.projectAmount}</span>
                                            </li>
                                        </ul>
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

export default RepaymentSchedule;
