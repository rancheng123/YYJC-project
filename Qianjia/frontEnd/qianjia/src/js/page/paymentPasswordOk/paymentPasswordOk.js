import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'

//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Button from '../../module/button/button';
import { Modal } from 'antd-mobile';
//导入样式 start
import './paymentPasswordOk.scss'

class   PaymentPasswordOk extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            title:''
        }
        let title = Utils.Url.parseUrl(location.hash).params.title;
        //在此处初始化状态
        componentStore.update(this,{
            title:title
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
        //alert('恭喜您已完成修改！');
        let that=this;
        // Modal.alert('提示',that.state.title+'成功',[
        //     { text: '确定', onPress: () =>  Utils.switchRoute('/paymentPasswordList'), style: { fontWeight: 'bold' } },
        // ])
        Utils.switchRoute('/paymentPasswordList');
    }
    render(){
        var that = this;

        return (
            <div className="setPassword">
                <Backbar $id="paymentPasswordOk" title={that.state.title} arrowHidden={true} >
                    <div className="paymentPasswordOk">
                        <div className="icon">
                            <img src={require('../../../image/img/paymentPasswordOk.png')} alt="成功图标"/>
                        </div>
                        <div className="text">{that.state.title+'成功'}</div>
                        <div className="btn">
                            <Button $id="paymentPasswordButton" background="#fb343e" text="完成" radius="20px" color="#fff" size="18px" click={this.click.bind(this)}></Button>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default PaymentPasswordOk;
