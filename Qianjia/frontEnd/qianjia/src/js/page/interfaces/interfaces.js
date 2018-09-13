import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
// import _ from 'underscore';
// import classNames from 'classnames'
import globalData from './data'; //数据
//导入样式 start
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
        this.state={
            form:{
                parson:'',
                phone:'',
                addressName:'请选择',
                addressDetail:''
            },

            data: globalData.data,

        }
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
            <div className="setPassword">
                <Backbar $id="modifyPassword" title="收货地址管理" >
                    <div className="">
                        <Validate $id="password" ref="validator"
                            onError={(obj)=>{
                                //console.error('元素'+rule+'验证未通过')
                                Modal.alert('提示',obj.errorMsg, [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                                ])
                            }}>
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/getCommonImg?imgType=RISKWARNING&projectId=248&productId=199&from=index">风险提示书</a>
                            </div>
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/getCommonImg?imgType=FUNDCOMMITMENT&projectId=248&productId=199&from=index">资金来源合法承诺书</a>
                            </div>
                            <div> 
                                {/*常见问题与ios没有关系用自己的*/}
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/commonStaticHtml?jsp=problemDetail&isWap=1">常见问题详情</a>
                            </div>
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/toPolicyAndRuleList?isWap=1">政策与法规列表</a>
                            </div>
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/toPolicyAndRuleDetail?id=e587a4dc27764b95b086a99a6893a7a2&isWap=1">政策与法规详情</a>
                            </div>
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/viewDeal?isWap=true&orderId=4128">查看合同</a>
                            </div>
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/commonStaticHtml?jsp=contact">联系我们/(钱夹特色参数是tese)/(钱夹介绍参数introduce)</a>
                            </div>
                            
                            <div>
                                <a href="http://uat.piaojiazi.com:8087/qjfweb/wap/viewDeal?isWap=true&from=index">协议范本</a>
                                <i>风控管理非公共页面</i>
                            </div>
                            {/*确认修改*/}
                                <div className="inputItem noBorder bnt-red mt30" onClick={()=>{
                                    //收货地址的接口已通
                                    //  Utils.requestData({
                                    //     url: config.api + 'qj/front/v1/user/setMemberAddress',
                                    //     method: 'post',
                                    //     data: {                                                           
                                    //         "consigneeName":'李医生' ,
                                    //         "consigneePhone": '17792396855',
                                    //         "addressProvice":'山东',
                                    //         "addressCity": '菏泽',
                                    //         "addressDetail": '成武县'
                                    //         },
                                    //     callback: function(data){
                                    //         //获取token值
                                    //         console.log(Utils.Storage.get('token'))
                                    //         if(data.resultCode == 0){
                                    //             console.log(data);
                                    //             alert(data.data);
                                    //         }else{
                                    //             alert(data.resultMsg)
                                    //         }
                                    //     }
                                        
                                    // });
                                    //首页轮播图以及公告接口已通
                                    // Utils.requestData({
                                    //     url:config.api + 'qj/front/v1/ad/getHeadList',
                                    //     method:'post',
                                    //     data:{
                                    //         adCity:0 //参数1是代表北京  0是代表全国
                                    //     },
                                    //     callback:function(data){
                                    //         if(data.resultCode == 0){
                                    //             console.log(data);
                                    //         }
                                    //     }
                                    // })
                                    //轮播图详情以及公告详情已通
                                    // Utils.requestData({
                                    //     url:config.api + 'qj/front/v1/ad/getHeadDetail',
                                    //     method:'post',
                                    //     data:{
                                    //         adId:20 //传轮播图的id或者公告的id
                                    //     },
                                    //     callback:function(data){
                                    //         if(data.resultCode == 0){
                                    //             console.log(data);
                                    //         }
                                    //     }
                                    // })
                                    //轮播图以及公告列表的接口
                                    // Utils.requestData({
                                    //     url:config.api + 'qj/front/v1/ad/getHeadNoticeList',
                                    //     method:'post',
                                    //     data:{
                                    //         adCity:0  //传当前城市的id  例如北京 传1  全国0  
                                    //     },
                                    //     callback:function(data){
                                    //         if(data.resultCode == 0){
                                    //             console.log(data);
                                    //         }
                                    //     }
                                    // })

                                }}>
                                    请求数据
                                </div>
                        </Validate>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default Address;
