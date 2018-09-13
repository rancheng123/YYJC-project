import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';
import { Modal } from 'antd-mobile';

//导入样式 start
import './bankDetail.scss'
//导入样式 end


class BankDetail extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that=this;
        this.state={
            bankArry:[]
        }

        Utils.tokenExpireJumpToLogin(function () {
            //查询银行接口
            Utils.requestData({
                url: config.api + 'qj/front/v1/lianlianInvest/appUser/getMemberBankCardList',
                method: 'post',
                data:{},
                callback: function(data){
                    if(data.resultCode==0){
                        console.log('bankList:',data.data)
                        componentStore.update(that,{
                            bankArry:data.data
                        })
                        //code=data.bankCard;
                        

                    }else{
                        Modal.alert('提示',data.resultMsg, [
                            { text: '确定', onPress: () => console.log('0k'), style: { fontWeight: 'bold' } },
                        ])
                    }
                }
            });
        })



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
    //跳转到绑卡
    addBank(){
        //alert('等待确定第三方银行接口');
        window.location.href = '/bankBingding';
    }
    //默认选中
    getBankId(id){
        // console.log(id);
        Utils.requestData({
            url: config.api + 'qj/front/v1/lianlianInvest/ajaxUser/setDefaultMemberBankCard',
            method: 'post',
            data:{
                'memberBankCardId':id
            },
            callback: function(data){
                if(data.resultCode==0){
                    console.log('更换默认卡:',data.data)
                    // componentStore.update(that,{
                    //     bankArry:data.data
                    // })
                    

                }else{
                    Modal.alert('提示',data.resultMsg, [
                        { text: '确定', onPress: () => console.log('0k'), style: { fontWeight: 'bold' } },
                    ])
                }
            }
        });
        
    }
    //
    goSeeBankParent(e){
        // console.log('当前的属性：',this.getAttribute('data-listData'))
        let lists = this.refs['bankLists'].children;
        // console.log(e.target);
        for(var i = 0 ; i < lists.length ; i++){
            // console.log(lists[i].className);
            
            if(lists[i].className == this.className){
                // console.log('当前的类：',this.className);
            }            
        }
        // console.log('节点：',lists.length)
    }
    render(){
        let that=this;
        // list.map(function(item,i){
        //     console.log(item)
        // })
        return (
            <div className="bankDetail">
                <Backbar $id="backbar" title={'我的银行卡'} action="bankDetailQuestion" >
                    <ul className="backList" ref={'bankLists'}>
                        {that.state.bankArry.map(function(item,i){
                            return <Bank $id={'bankList'+i} address={item.bankUrl} landLine={item.servicePhone}   goSeeBankParent={that.goSeeBankParent.bind(that)} bankId={item.memberBankCardId} isDefault={item.isDefault} key={'bankList'+i} defaultBank={that.getBankId.bind(that)} numVal={i} clName={i%2 == 0? 'odd' : 'even'}  bankLog={item.logoUrl} bankCode={item.bankCardHide} bankName={item.bankName} bankStyle={item.cardType}></Bank>
                        })}
                            {/*<Bank $id="bankListA" clName="even"  bankLog={"http://192.168.0.44:8083/userfiles/bankIcon/CCB.png"} bankCode={that.state.bankCode} bankName="XXX银行" bankStyle="借记卡"></Bank>*/}
                    </ul>
                    <div className="bankBtn"  onTouchStart={this.addBank.bind(this)}>
                        <div className="bankBtn_top">
                            <img src={require('../../../image/icon/icon_addBank.png')} alt=""/>
                        </div>
                        <div className="bankBtn_bottom" >添加银行卡</div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default BankDetail;

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
        this.props.defaultBank(e.target.getAttribute('data-bankId'));
        // alert(1111);
        if(this.state.defult){
            this.setState({
                defult:!this.state.defult,
                st:!this.state.st
            });
            

        }else{
            this.setState({
                    defult:!this.state.defult,
                    st:!this.state.st
            })
        }
        e.stopPropagation();
        
    }
    //银行列表跳转
    goSeeBank(e){
        // let btnGoSeeBank = document.getElementById()
        // console.log('11111',e.target)
        
        this.props.goSeeBankParent();
        console.log('this:',this);
        console.log('this:',this.props.bankName);
        window.location.href = '/seeBank?name='+this.props.bankName+'&code='+this.props.bankCode+'&address='+this.props.address+'&type='+this.props.bankStyle+'&landLine='+this.props.landLine+'&logoUrl='+this.props.bankLog+'&bankId='+this.props.bankId;
    }
    render(){
            let stateImg;
            let state1=require('../../../image/icon/bank_list_state-1.png');
            let state2=require('../../../image/icon/bank_list_state.png');
            stateImg = this.state.st? state1 : state2;
        return (
            <li className="goSeeBank" onTouchEnd={this.goSeeBank.bind(this)} >
                <div className={"bank"+' '+this.props.clName} ref={'refBank'}>
                    <div className="state" >
                        <img data-bankId={this.props.bankId} data-value={this.props.numVal} onTouchEnd={this.onclick.bind(this)} style={{display:this.props.isDefault == 0 ? 'block' : 'none'}}  src={require('../../../image/icon/bank_list_state-1.png')} alt="非选中"/>
                        <img className="checkboxB" src={require('../../../image/icon/bank_list_state.png')} style={{display:this.props.isDefault == 1 ? 'block' : 'none'}} alt="选中"/>
                    </div>
                    <div className="content">
                        <div className="bank_top" data-address={this.props.address} data-landLine={this.props.landLine}>
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
            </li>
        )
    }

}
