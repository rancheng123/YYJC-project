import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';
import Alert from '../../module/alert/alert';

//导入样式 start
import './userSecurity.scss'
//导入样式 end


class UserSecurity extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that=this;
        this.state={
            isHfAccount:null,
            //是否有密码
            safePassword: '',
            list: []
        }
        // Utils.eventHanlder(function(){
        //     that.refs.validator.validate({
        //         callback: function(res){
        //             if(res){
        //                 //alert('保存成功！')
        //                 //qj/front/v1/account/bindCard
        //                 //绑卡交互
        //                 Utils.requestData({
        //                     url: config.api + 'qj/front/v1/user/getUserInfo',
        //                     method: 'post',
        //                     data:{},
        //                     callback: function(data){
        //                         if(data.resultCode==0){
        //                             console.log('是否设置密码：',data.data.safePassword);
        //                             componentStore.update(that,{
        //                                 safePassword:data.data.safePassword
        //                             })
        //                         }else{
        //                             Modal.alert('提示',data.resultMsg, [
        //                                 { text: '确定', onPress: () => console.log('0k'), style: { fontWeight: 'bold' } },
        //                             ])
        //                         }
        //                     }
        //                 });
        //             }
        //         }
        //     });
        //在此处初始化状态
        //查用户状态

        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getUserInfo',
                method: 'post',
                data:{},
                callback: function(data){
                    if(data.resultCode==0){
                        console.log('返回值：',data.data.safePassword);
                        componentStore.update(that,{
                            isHfAccount:data.data.isHfAccount,
                            safePassword: data.data.safePassword,
                            list: [//列表bar数据
                                {
                                    isLeftIcon:false,
                                    title: '更改登录手机号',
                                    right_src:require('../../../image/icon/icon_right.png'),
                                    src:'/modifyPhone',
                                    border:true,
                                    setTetx:true,
                                    fn:false
                                },
                                {
                                    isLeftIcon:false,
                                    title: '登录密码',
                                    right_src:require('../../../image/icon/icon_right.png'),
                                    src:data.data.safePassword ,// '/modifyPassword' : '/setPassword'
                                    rightText: data.data.safePassword,//'修改':'未设置'
                                    setTetx:true,
                                    border:false,
                                    fn:false
                                },
                                // {
                                //     isLeftIcon:false,
                                //     title: '支付密码管理',
                                //     right_src:require('../../../image/icon/icon_right.png'),
                                //     // src:'paymentPasswordList',
                                //     src:'',
                                //     setTetx:false,
                                //     border:false,
                                //     fn:true
                                // }
                            ]
                        })

                        //console.log('状态1：：',that.state.safePassword);
                    }
                }
            });
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
    clickFn(bl){
        //console.log('执行点击了');
        //console.log(bl);
        if(bl){
            let isHF = this.state.isHfAccount;
            //console.log(isHF);
            switch (isHF) {
                    case 0: //未开户
                        Utils.switchRoute('/openBank');
                        break;
                    case 1: //已开户
                        //alert(1);
                        Utils.switchRoute('/paymentPasswordList');
                        break;
                    default:
                        break;
                }

        }
    }
    render(){
        
        var that=this;
        //console.log('状态22：：',that.state.safePassword==1);
        return (
            <div>
                <Backbar $id="backbar" title={'账户安全'} backUrl='/set' >
                    <div className="set_content">
                        <div className="top">
                            <div className="list">
                                {that.state.list.map(function(item,i){
                                    let srcA = '';
                                    let right_text='';
                                    if(item.setTetx){
                                        if(item.src==1){
                                            srcA = '/modifyPassword';
                                        }else if(item.src==0){
                                            srcA = '/setPassword';
                                        }else{
                                            srcA = item.src;
                                        }
                                        if(item.rightText == 1){
                                            right_text = '修改';
                                        }else if(item.rightText == 0){
                                            right_text = '未设置';
                                        }
                                    }
                                    console.log('item.src:::',item.src)
                                    // console.log('跳转地址:',srcA);
                                    // console.log('文字:',right_text);
                                    return <ListBar $id={'set_list_top'+i} isLeftIcon={item.isLeftIcon} key={'set_list'+i} listBarFn={item.fn} fn={()=>{that.clickFn(item.fn)}} setText={item.setTetx} border_b={item.border} rightText={right_text} left_src={item.left_src} title={item.title} src={srcA}  right_src={item.right_src}></ListBar>
                                })}
                            </div>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default UserSecurity;