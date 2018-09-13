/**
 * Created by 唐丹 on 2017/5/11.
 */
import React, { Component, PropTypes } from 'react';
import { Icon,Modal } from 'antd-mobile';

import _ from 'underscore';
import classNames from 'classnames'
import globalData from './data'
import Picker from '../../widget/picker/picker';

import Backbar from '../../module/backbar/backbar';
import Validate from '../../widget/react-validate/react-validate';



//导入样式 start
import './reAddress.scss'
//导入样式 end



class ReAddress extends Component{
    constructor(){
        super();
        let that = this;
        //在此处初始化状态
        this.state={
            data: globalData.data,
            form: {
                username: '',
                iphone: '',
                addressName:'',
                addressDetail:''
            }
        }
        Utils.tokenExpireJumpToLogin(function () {
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getMemberAddress',
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){
                        var data=data.data;
                        if (data.consigneeName) {
                            let addressProvince = data.addressProvince?data.addressProvince:"";
                            let addressCity = data.addressCity?data.addressCity:"";
                            componentStore.update(that,{
                                form:{
                                    username:data.consigneeName?data.consigneeName:"",
                                    iphone:data.consigneePhone?data.consigneePhone:"",
                                    addressName:addressProvince+","+addressCity,
                                    addressDetail:data.addressDetail?data.addressDetail:""
                                }
                            })
                        }

                    }
                }
            });
        })
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
    onYes(data){
        this.state.form.addressName = data.textArr.join(',');
        this.setState(this.state);

    }
    onChange(data){ }

    render(){
        let that = this;
        console.log('hhh',this.state.form);
        let form = this.state.form;
        return (

            <Backbar $id="reAddress" title="收货地址管理">
                <div className="reAddress-wrap">
                    <Validate ref="validator" $id="reAddress_validate" onError={(obj)=>{

                        Modal.alert('提示',obj.errorMsg, [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])

                    }}>
                        <div className="reAddress-box">
                            <div className="a-item">
                                <h3 className="i-title">收货人：</h3>
                                <div className="i-content">
                                    <input type="type" value={that.state.form.username}
                                           onChange={(obj)=>{
                                               that.state.form.username = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}

                                           data-validName="username"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'username'
                                           }]}
                                           data-validMsgPrefix={'收货人：'}
                                           placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="a-item">
                                <h3 className="i-title">收货人手机号：</h3>
                                <div className="i-content">
                                    <input type="text" value={that.state.form.iphone}
                                           onChange={(obj)=>{
                                               console.log(obj.target.value);
                                               that.state.form.iphone = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}

                                           data-validName="iphone"
                                           data-validRules={[{
                                               name: 'require'
                                           },{
                                               name: 'iphone'
                                           }]}
                                           data-validMsgPrefix={'手机号：'}
                                           placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="a-item"
                                data-validName="addressName"
                                data-validRules={
                                    [{name: 'require'}]
                                }
                                data-validMsgPrefix={'请选择城市：'}
                                data-valid-setValue={()=>{
                                    return that.state.form.addressName == ''? '': that.state.form.addressName;
                                }}
                            >
                                <h3 className="i-title">省市区：</h3>
                                <div className="i-content">
                                    <Picker $id="picker-reAddress"
                                            onYes={this.onYes.bind(this)}
                                            onChange={this.onChange.bind(this)}
                                            defaultValue={['02','01-1','01']}
                                            title="请选择城市"
                                            data={this.state.data}
                                            cols={3}
                                    >
                                        <div style={{minHeight:"0.48rem"}}>
                                            {that.state.form.addressName}
                                        </div>

                                    </Picker>
                                </div>

                            </div>
                            <div className="a-item a-deatilAddr">
                                <h3 className="i-title">详细地址：</h3>
                                <div className="i-content">
                                    <input
                                        value={that.state.form.addressDetail}
                                        onChange={(obj)=>{
                                            console.log(obj.target.value);
                                            that.state.form.addressDetail = obj.target.value;
                                            componentStore.update(that,that.state)
                                        }}

                                        data-validName="addressDetail"
                                        data-validRules={[{
                                            name: 'require'
                                        },{
                                            name: 'addressDetail'
                                        }]}
                                        data-validMsgPrefix={'详细地址：'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="g-botton-btn g-save" onTouchEnd={()=>{
                            Utils.eventHanlder(function(){
                                that.refs.validator.validate({
                                    callback: function(res){
                                        if(res){
                                            alert('设置成功');
                                        }
                                    }
                                });


                            })
                        }}>
                            <span>保存</span>
                        </div>

                    </Validate>
                </div>
            </Backbar>

        )
    }

}

export default ReAddress;
