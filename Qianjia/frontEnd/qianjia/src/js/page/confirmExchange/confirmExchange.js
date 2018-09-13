/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

//导入样式 start
import './confirmExchange.scss'
//导入样式 end



class ConfirmExchange extends Component{
    constructor(){
        super();

        let that = this;

        this.state = {
            imExChangeInfo : Utils.Storage.get('immediatelyExchange'),
            addressProvince : '',
            addressCity : '',
            addressDetail : '',
            consigneeName : '',
            consigneePhone : ''
        }

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getMemberAddress',
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){
                        var data=data.data;
                        componentStore.update(that,{
                            addressProvince : data.addressProvince,
                            addressCity : data.addressCity,
                            addressDetail : data.addressDetail,
                            consigneeName : data.consigneeName,
                            consigneePhone : data.consigneePhone
                        })
                    }
                }
            });
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
        let imExChangeInfo = this.state.imExChangeInfo;

        let addressProvince = this.state.addressProvince;
        let addressCity = this.state.addressCity;
        let addressDetail = this.state.addressDetail;
        let consigneeName = this.state.consigneeName;
        let consigneePhone = this.state.consigneePhone;
        return (

            <Backbar $id="confirmExchange" title="确认兑换">
                <div className="confirmExchange-wrap">
                    <div className="g-exchangeDetail">
                        <div className="g-ed-box">
                            <div className="d-icon">
                                <Icon type={require('../../../image/svg/map.svg')} />
                            </div>
                            <div className="d-info">
                                <div className="i-top">
                                    <span>收货人：{consigneeName}</span>
                                    <b className="t-tel">{consigneePhone}</b>
                                </div>
                                <div className="i-addr" onTouchEnd={()=>{
                                    Utils.switchRoute('/address');
                                }}>
                                    <span>{ addressProvince +" "+ addressCity +" "+ addressDetail }</span>
                                    <div className="i-icon">
                                        <Icon type="right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="g-product-list">
                        <li>
                            <div className="g-left">
                                <div className="g-img">
                                    <img src={config.img+imExChangeInfo.gift.qjGiftImgPath} />
                                </div>
                                <div className="g-text">
                                    <h3>{imExChangeInfo.gift.qjGiftName}</h3>
                                    <p>有效期至：{imExChangeInfo.exchangeEndDate.split(" ")[0]}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a className="g-botton-btn g-sure" href="javascript:;" onTouchEnd={()=>{

                        Utils.requestData({
                            url: config.api + 'qj/front/v1/appUser/exchangeMemberGift',
                            method: 'post',
                            data: {
                                "memberId": imExChangeInfo.memberId,
                                "memberGiftId": imExChangeInfo.memberGiftId,
                                "consigneeName": consigneeName,
                                "consigneePhone": consigneePhone,
                                "addressProvince": addressProvince,
                                "addressCity": addressCity,
                                "addressDetail": addressDetail
                            },
                            callback: function(data){
                                console.log('确认：',data)
                                if(data.resultCode == 0){

                                    that.state.imExChangeInfo.receiptAddress = addressProvince +" "+ addressCity +" "+ addressDetail;
                                    that.state.imExChangeInfo.consigneeName = consigneeName;
                                    that.state.imExChangeInfo.consigneePhone = consigneePhone;

                                    componentStore.update(that,{
                                        imExChangeInfo: that.state.imExChangeInfo
                                    })

                                    Utils.Storage.set('immediatelyExchange',that.state.imExChangeInfo);

                                    Utils.switchRoute('/exchange');
                                }
                            }
                        });


                    }}>
                        <span>确认</span>
                    </a>
                </div>
            </Backbar>

        )
    }

}

export default ConfirmExchange;
