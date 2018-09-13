import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'
import globalData from './data'; //数据
//导入样式 start
import './address.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';
import Picker from '../../widget/picker/picker';
import Validate from '../../widget/react-validate/react-validate';
import { Modal } from 'antd-mobile';


class Address extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        var that=this;
        this.state={
                form:{
                        parson:'',
                        phone:'',
                        addressName:'',
                        addressDetail:''
                    },
                data: globalData.data,
        }

        Utils.tokenExpireJumpToLogin(function () {
            //初始化数据
            Utils.requestData({
                url: config.api + 'qj/front/v1/user/getMemberAddress',
                method: 'post',
                data: {},
                callback: function(data){
                    if(data.resultCode == 0){
                        var data=data.data;
                        let addressName = "";
                        if(data.addressCity){

                            let city = data.addressCity.split(" ");
                            let c0 = city[0]?city[0]:"";
                            let c1 = city[1]?city[1]:"";

                            if(c1){
                                addressName = data.addressProvince+","+c0+","+c1;
                            }else{
                                addressName = data.addressProvince+","+c0;
                            }
                        }
                        componentStore.update(that,{
                            form:{
                                parson:data.consigneeName,
                                phone:data.consigneePhone,
                                addressName:addressName,
                                addressDetail:data.addressDetail
                            }
                        })
                    }else{
                        //alert(data.resultMsg);
                        Modal.alert('提示',data.resultMsg, [
                            { text: '取消', onPress: () => console.log() },
                            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                        ])
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


    //贴

    onYes(data){
        this.state.form.addressName = data.textArr.join(',');
        this.setState(this.state)


    }
    onChange(data){ }



    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }
    render(){
        var that = this;

        return (
            <div className="">
                <Backbar $id="modifyPassword" title="收货地址管理" >
                    <div className="adressMessage-box">
                        <Validate $id="password" ref="validator"
                            onError={(obj)=>{
                                //console.error('元素'+rule+'验证未通过')
                                Modal.alert('提示',obj.errorMsg, [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                ])
                            }}>
                            {/*收货人*/}
                                <div className="inputItem flex-father">
                                    <div className="label">收货人：</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" placeholder="请输入收货人姓名"
                                            value={that.state.form.parson}
                                            onChange={(obj)=>{
                                               that.state.form.parson = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="parson"
                                            data-validRules={[
                                                {name: 'require'}
                                            ]}
                                            data-validMsgPrefix={'收货人：'}
                                        />
                                    </div>
                                </div>
                            {/*手机号*/}
                                <div className="inputItem flex-father">
                                    <div className="label">收货人手机号：</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="number" value={that.state.form.phone} placeholder="请输入收货人手机号"
                                            onChange={(obj)=>{
                                               that.state.form.phone = obj.target.value;
                                               componentStore.update(that,that.state)
                                           }}
                                            data-validName="phone"
                                            data-validRules={[{
                                               name: 'require'
                                           },{name:'iphone'}
                                           ]}
                                            data-validMsgPrefix={'手机号：'}
                                        />
                                    </div>
                                </div>
                            {/*选择城市*/}
                                <div className="inputItem flex-father"
                                    data-validName="addressName"
                                    data-validRules={
                                        [{name: 'require'}]
                                    }
                                    data-validMsgPrefix={'请选择城市：'}
                                    data-valid-setValue={()=>{
                                     return that.state.form.addressName == '请选择'? '': that.state.form.addressName;
                                 }}
                                >
                                    <div className="label">省市：</div>
                                    <div className="flex-child1">
                                        <Picker $id="picker-test1"
                                                onYes={this.onYes.bind(this)}
                                                onChange={this.onChange.bind(this)}
                                                defaultValue={['02','01-1','01']}
                                                title="请选择城市"
                                                data={this.state.data}
                                                cols={3}
                                        >
                                            <div>
                                                {that.state.form.addressName == undefined || that.state.form.addressName == ''? '请选择' : that.state.form.addressName}
                                            </div>

                                        </Picker>
                                    </div>
                                </div>

                            {/*详细地址：*/}
                                <div className="inputItem flex-father lastChild">
                                    <div className="label">详细地址：</div>
                                    <div className="flex-child1">
                                        <input className="inputText" type="text" value={that.state.form.addressDetail} placeholder="请输入街道门"
                                            onChange={(obj)=>{
                                                 that.state.form.addressDetail = obj.target.value;
                                                 componentStore.update(that,that.state)
                                             }}
                                            data-validName="addressDetail"
                                            data-validRules={[
                                                {name: 'require'}
                                           ]}
                                            data-validMsgPrefix={'详细地址：'}
                                        />
                                    </div>
                                </div>
                            {/*确认修改*/}
                                <div className="g-botton-btn g-save" onClick={()=>{
                                    Utils.eventHanlder(function(){
                                        that.refs.validator.validate({
                                            callback: function(res){
                                                if(res){
                                                    let addressName = that.state.form.addressName;
                                                     let arr = addressName.split(',');
                                                     let province = arr[0]?arr[0]:"";
                                                     let c1 = arr[1]?arr[1]:"";
                                                     let c2 = arr[2]?arr[2]:"";
                                                     let city = "";
                                                     if(c2){
                                                         city = c1+" "+c2;
                                                     }else{
                                                          city = c1;
                                                     }
                                                    Utils.requestData({
                                                            url: config.api + 'qj/front/v1/user/setMemberAddress',
                                                            method: 'post',
                                                            data: {
                                                                "consigneeName": that.state.form.parson,
                                                                "consigneePhone":  that.state.form.phone,
                                                                "addressProvince":province,
                                                                "addressCity": city,
                                                                "addressDetail": that.state.form.addressDetail
                                                                },
                                                            callback: function(data){
                                                                if(data.resultCode == 0){
                                                                    //alert(data.data);
                                                                     Modal.alert('提示',data.data, [
                                                                        { text: '确定', onPress: () => Utils.backRoute(), style: { fontWeight: 'bold' } },
                                                                    ])
                                                                }else{
                                                                    Modal.alert('提示',data.resultMsg, [
                                                                        { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                                                    ])
                                                                }
                                                            }

                                                        });
                                                }
                                            }
                                        });

                                    })
                                }}>
                                    保存
                                </div>
                        </Validate>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default Address;
