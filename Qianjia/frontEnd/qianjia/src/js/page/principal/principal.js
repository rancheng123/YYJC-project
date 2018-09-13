
import React, { Component, PropTypes } from 'react';
import { Icon,Modal,Toast } from 'antd-mobile';

import Backbar from '../../module/backbar/backbar';

import Picker from '../../widget/picker/picker';

//导入样式 start
import './principal.scss'
//导入样式 end



class Principal extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        var that = this;
        //在此处初始化状态
        this.state = {
            commonImgList : []
        }

        Utils.tokenExpireJumpToLogin(function () {

            Utils.requestData({
                url: config.api + 'qj/front/v1/commonimg/getCommonImg',
                method: 'post',
                data:{
                    "imgtype": "PRINCIPALCONSUME"

                },
                callback: function(data){
                    console.log('getCommonImg',data);
                    if(data.resultCode==0){
                        var data = data.data;
                        componentStore.update(that,{
                            commonImgList : data.commonImgList
                        });
                    }
                }
            })

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

   
    render(){
        let that = this;
        return (

            <Backbar $id="principal" title="本金消费说明">
                
                <div className="principal-box">
                    {
                        that.state.commonImgList.length>0?that.state.commonImgList.map(function(item,index){
                            console.log(item);
                            return (
                                <div key={index}>
                                    <img src={config.img+item.imgurl} />
                                </div>
                            )
                        }) : ""
                    }
                </div>
                

            </Backbar>

        )
    }

}

export default Principal;
