import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './proclaimList.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';



class ProclaimList extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        var that = this;
        // 存储 start
        componentStore.set(this);
        // 存储 end


        //获取公告列表和 banner列表（轮播图）
        Utils.requestData({
            url: config.api +"qj/front/v1/ad/getHeadList",
            method: 'post',
            data: {
                "adCity": Utils.Url.parseUrl(location.href).params.city
            },
            callback: function(data){

                if(data.resultCode == 0){
                    if(data.data.adList && data.data.adList.length){
                        componentStore.update(that,{
                            data: data.data.adList
                        })
                    }

                }
            }
        });

    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };

    render(){
        var that = this;

        return (
            <div className="proclaimList">
                <Backbar $id="messageCenter" title="公告" >
                    {(function () {
                       return that.state.data.map(function (ele,i) {
                           return(
                               <div className="proclaimItem" onClick={()=>{

                                   if(ele.adDetailType == 1){
                                       //显示图片
                                       Utils.switchRoute('/proclaimDetail?url='+ ele.adDetailUrl+'&title='+ele.adTitle)
                                   }else if(ele.adDetailType == 3){
                                       Utils.switchRoute('/projectIntroduction?productId='+ele.product.productId)
                                   }


                               }} key={i}>
                                   <div className="proclaimItem-title">
                                       {ele.adTitle}
                                   </div>
                                   <div className="proclaimItem-date">
                                       {ele.editDate}
                                   </div>
                               </div>
                           )
                       })
                    })()}

                </Backbar>
            </div>
        )
    }

}

export default ProclaimList;
