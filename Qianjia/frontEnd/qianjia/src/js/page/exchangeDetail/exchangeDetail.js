/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './exchangeDetail.scss'
//导入样式 end



class ExchangeDetail extends Component{
    constructor(){
        super();
        let that = this;
        console.log("immediatelyExchange:::",Utils.Storage.get('immediatelyExchange'));
        this.state = {
            imExChangeInfo : Utils.Storage.get('immediatelyExchange'),
            
        }
        
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

        let imExChangeInfo = this.state.imExChangeInfo;

        return (

            <Backbar $id="exchange" title="兑换详情">
                <div className="exchangeDetail-wrap">
                    <div className="g-exchangeDetail">
                        <div className="g-ed-box">
                            <div className="d-icon">
                                <Icon type={require('../../../image/svg/map.svg')} />
                            </div>
                            <div className="d-info">
                                <div className="i-top">
                                    <span>收货人：{imExChangeInfo.consigneeName}</span>
                                    <b className="t-tel">{imExChangeInfo.consigneePhone}</b>
                                </div>
                                <a href="javascript:;" className="i-addr">
                                    <span>{ imExChangeInfo.receiptAddress }</span>
                                </a>
                            </div>
                        </div>

                        {(()=>{

                            if(imExChangeInfo.memberGiftReceiptStatus==4){

                                return (
                                    <div className="g-ed-box">
                                        <div className="d-icon">
                                            <Icon type={require('../../../image/svg/car.svg')} />
                                        </div>
                                        <div className="d-info">
                                            <div className="i-top">
                                                <span>物流公司：{imExChangeInfo.courierFirm}</span>
                                                <b className="t-info">已发货</b>
                                            </div>
                                            <div className="i-addr">
                                                <span>订单编号：{imExChangeInfo.courierNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }

                        })()}
                        
                    </div>
                </div>
                <div className="g-product-hastitle">
                    <h3 className="g-product-title">{imExChangeInfo.giftSourceDesc}</h3>
                    <ul className="g-product-list">
                        <li>
                            <div className="g-left">
                                <div className="g-img">
                                    <img src={config.img+imExChangeInfo.gift.qjGiftImgPath} />
                                </div>
                                <div className="g-text">
                                    <h3>{imExChangeInfo.gift.qjGiftName}</h3>
                                    <p>数量：x1</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </Backbar>

        )
    }

}

export default ExchangeDetail;
