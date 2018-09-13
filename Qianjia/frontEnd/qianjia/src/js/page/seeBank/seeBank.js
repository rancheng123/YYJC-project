import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';
import { Modal } from 'antd-mobile';

//导入样式 start
import './seeBank.scss'
//导入样式 end


class SeeBank extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that=this;
        this.state={
            name:Utils.Url.parseUrl(location.hash).params.name,
            bankCode:Utils.Url.parseUrl(location.hash).params.code,
            type:Utils.Url.parseUrl(location.hash).params.type,
            landLine:Utils.Url.parseUrl(location.hash).params.landLine,
            logoUrl:Utils.Url.parseUrl(location.hash).params.logoUrl,
            address:Utils.Url.parseUrl(location.hash).params.address,
            bankId:Utils.Url.parseUrl(location.hash).params.bankId,
        }
         console.log(Utils.Url.parseUrl(location.hash).params)
        {/*Utils.tokenExpireJumpToLogin(function () {
            //查询银行接口
            Utils.requestData({
                url: config.api + 'qj/front/v1/account/getMyBankCard',
                method: 'post',
                data:{},
                callback: function(data){
                    if(data.resultCode==0){
                        componentStore.update(that,{
                            bankCode:data.data.bankCard
                        })
                        //code=data.bankCard;


                    }else{
                        Modal.alert('提示',data.resultMsg, [
                            { text: '确定', onPress: () => console.log('0k'), style: { fontWeight: 'bold' } },
                        ])
                    }
                }
            });
        })*/}



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
        let that=this;
        return (
            <div className="seeBank">
                <Backbar $id="backbar" title={'查看银行卡'} action="deleteBank" >
                    <div className="backList">
                            <Bank $id="bankList" numVal='0' clName="odd" bankId={this.state.bankId}  bankLog={this.state.logoUrl} bankCode={that.state.bankCode} bankName={this.state.name} bankStyle={this.state.type}></Bank>
                    </div>
                    
                    <ul className="bankInformation">
                        <li className="bankList">
                            <div>客服电话</div>
                            <div>{this.state.landLine}</div>
                        </li>
                        <li className="bankList">
                            <div>官方网址：</div>
                            <div>{this.state.address}</div>
                        </li>
                    </ul>
                </Backbar>
            </div>
        )
    }

}

export default SeeBank;

class Bank extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            defult:false,
            st:false
        }
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
    onclick(e){
        let refList = this.refs['refBank'].parentNode.parentNode.children;
        // console.log(refList[0].children[0].children[0]);
        // console.log(e.target);
        
        for(var i = 0 ;i < refList.length; i++){
            refList[i].children[0].children[0].children[0].style.display = 'block';
            refList[i].children[0].children[0].children[1].style.display = 'none';
        }
        e.target.style.display='none';
        e.target.nextSibling.style.display='block';
        
        if(this.state.defult){
            this.setState({
                defult:!this.state.defult,
                st:!this.state.st
            });
            //  console.log('你设置默认银行卡成功！');

        }else{
            this.setState({
                    defult:!this.state.defult,
                    st:!this.state.st
            })
        }

    }
    render(){
            let stateImg;
            let state1=require('../../../image/icon/bank_list_state-1.png');
            let state2=require('../../../image/icon/bank_list_state.png');
            stateImg = this.state.st? state1 : state2;
        return (
            <div>
                <div className={"bank"+' '+this.props.clName} ref={'refBank'}>
                    {/*<div className="state">
                        <img data-value={this.props.numVal} onTouchStart={this.onclick.bind(this)}  src={require('../../../image/icon/bank_list_state-1.png')} alt="非选中"/>
                        <img className="checkboxB" src={require('../../../image/icon/bank_list_state.png')} alt="选中"/>
                    </div>*/}
                    <div className="content">
                        <div className="bank_top">
                            <span className="bankLog"><img src={this.props.bankLog} alt=""/></span>
                            <span>
                                <ul>
                                    <li>{this.props.bankName}</li>
                                    <li>{this.props.bankStyle}</li>
                                </ul>
                            </span>
                        </div>
                        <div className="bank_bottom">{this.props.bankCode}</div>
                    </div>
                </div>
            </div>
        )
    }

}
