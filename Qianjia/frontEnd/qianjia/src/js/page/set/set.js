import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';
import Button from '../../module/button/button';
import { Modal } from 'antd-mobile';

//导入样式 start
import './set.scss'
//导入样式 end


class Set extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.state={
            top:[//列表bar数据
                {
                    left_src:require('../../../image/icon/icon_set_aqzx.png'),
                    title: '账户安全',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/userSecurity',
                    setTetx:false
                },
                // {
                //     left_src:require('../../../image/icon/icon_bank_bdyhk.png'),
                //     title: '连连老用户银行卡绑定',
                //     right_src:require('../../../image/icon/icon_right.png'),
                //     src:'',
                //     setTetx:false
                // },
                {
                    left_src:require('../../../image/icon/icon_set_shdz.png'),
                    title: '收货地址管理',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/address',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_set_yqhy.png'),
                    title: '邀请好友',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/invitations',
                    border:false,
                    setTetx:false
                },
            ],
            bottom:[
                {
                    left_src:require('../../../image/icon/icon_set_gyqj.png'),
                    title: '关于钱夹',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/aboutWallet',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_set_zcfg.png'),
                    title: '政策法规',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/policyAndRuleList',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_set_kfdh.png'),
                    title: '客服电话',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'',
                    border:false,
                    rightText:'400-831-6608',
                    setTetx:true
                },
            ]
        }
        //在此处初始化状态

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
    closLogin(){
        Modal.alert('提示','您确定退出吗？', [
            {text: '取消', onPress: () => console.log('close')},
            { text: '确定', onPress: () =>{localStorage.user = '' ;Utils.switchRoute('/home')}, style: { fontWeight: 'bold' } },
        ])
        
    }
    srcClick(src){
        window.location.href=src;
    }
    render(){
        let that=this;
        console.log(this.state.top)
        return (
            <div>
                <Backbar $id="backbar" title={'设置'} backUrl='/my' >
                    <div className="set_content">
                        <div className="top">
                            <div className="list">
                                {this.state.top.map(function(item,i){
                                    return <ListBar $id={'set_list_top'+i} key={'set_list'+i} listBarFn='true' fn={()=>{that.srcClick(item.src)}} setText={item.setTetx} border_b={item.border} left_src={item.left_src} title={item.title} src={''}  right_src={item.right_src}></ListBar>
                                })}
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="list">
                                {this.state.bottom.map(function(item,i){
                                    return <ListBar $id={'set_list_bottom'+i} key={'set_list'+i} setText={item.setTetx} border_b={item.border} rightText={item.rightText} left_src={item.left_src} title={item.title} src={item.src}  right_src={item.right_src}></ListBar>
                                })}
                            </div>
                        </div>
                        <div className="button_style">
                            <Button $id="button" click={()=>{that.closLogin()}} color={'#e4676e'} size={'0.3rem'} text="退出登录"></Button>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default Set;