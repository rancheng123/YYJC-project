import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Button from '../../module/button/button';
import { Modal } from 'antd-mobile';
//导入样式 start
import './resetPaymentPasswordOk.scss'

class   ResetPaymentPasswordOk extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            productId:Utils.Url.parseUrl(location.hash).params.productId,
            addYield:Utils.Url.parseUrl(location.hash).params.addYield,
            investProjectId:Utils.Url.parseUrl(location.hash).params.investProjectId,
        }

        Utils.tokenExpireJumpToLogin(function () {

        })
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
    click(){
        //alert('恭喜您已完成重置！');
        let that=this;
        //console.log('是否有值：',that.state.productId);
        //Utils.switchRoute('/userSecurity');
        let backUrl = Utils.Url.parseUrl(location.hash).params.backUrl;

        //解绑页面
        let closeBank = Utils.Url.parseUrl(location.hash).params.name;
        //投资页面
        let projectId = that.state.investProjectId;
        if(projectId){
            console.log('888888888888888888888888888');
            /*
                backUrl=resetPaymentPasswordOk
                backUrlInvest=investmentConfirmation
                这两个属性是适用于 ：
                    1、从 投资确认页 --> 重置密码页 -> 重置成功页
                    2、从 投资确认页 --> 充值页 --> 重置密码页 -> 重置成功页

            */
            Utils.switchRoute('/investmentConfirmation?productId='+that.state.productId+'&addYield='+that.state.addYield+'&investProjectId='+that.state.investProjectId+'&backUrl=resetPaymentPasswordOk&backUrlInvest=investmentConfirmation');
        }else if(backUrl){

            if(Utils.Storage.get('fromInvesetToPay')){  //从localstorage获取数据 ，此操作只针对从投资页-->充值页--> 充值密码成功
                Utils.switchRoute('/'+backUrl+'?backUrl=resetPaymentPasswordOk&'+Utils.Storage.get('fromInvesetToPay'));
            }else{
                Utils.switchRoute('/'+backUrl+'?backUrl=resetPaymentPasswordOk');
            }
            Utils.Storage.set('fromInvesetToPay',"");   //清楚localstorage里的数据

        }else if(closeBank){
            Utils.switchRoute('/'+closeBank);
        }else{
            Utils.switchRoute('/userSecurity');
        }
        //console.log(typeof (that.state.productId));
        //console.log(that.state.productId != 'undefined')

    }
    render(){
        var that = this;
        let backUrl = Utils.Url.parseUrl(location.hash).params.backUrl;
        let backUrlValue = 'noBack';
        console.log(Utils.Url.parseUrl(location.hash).params.investProjectId);
        //console.log('backUrl::',backUrl,backUrl==undefined);
        if(backUrl!=undefined){
            backUrlValue = backUrl+"?backUrl=resetPaymentPasswordOk";
        }

        console.log('backUrlValue::',backUrlValue);
        return (
            <div className="setPassword">
                <Backbar $id="resetPaymentPasswordOk"
                    title="重置支付密码成功"
                    backUrl={'/'+backUrlValue}
                    arrowHidden={true}
                >
                    <div className="resetPaymentPasswordOk">
                        <div className="icon">
                            <img src={require('../../../image/img/paymentPasswordOk.png')} alt="成功图标"/>
                        </div>
                        <div className="text">支付密码重置成功</div>
                        <div className="btn">
                            <Button $id="resetPaymentPasswordBtn" background="#fb343e" text="完成" radius="20px" color="#fff" size="18px" click={this.click.bind(this)}></Button>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default ResetPaymentPasswordOk;
