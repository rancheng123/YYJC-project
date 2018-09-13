import React, { Component, PropTypes } from 'react';

//导入样式 start
import './proclaimDetail.scss'
//导入样式 end
import Backbar from '../../module/backbar2/backbar2';



class ProclaimList extends Component{
    constructor(){
        super();
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

    render(){
        return (
            <div className="proclaimDetail">
                <Backbar $id="messageCenter">
                    {Utils.Url.parseUrl(location.href).params.title}
                </Backbar>

                {(function () {

                    if(
                        Utils.Url.parseUrl(location.href).params.url.match('.bmp') ||
                        Utils.Url.parseUrl(location.href).params.url.match('.jpg') ||
                        Utils.Url.parseUrl(location.href).params.url.match('.jpeg') ||
                        Utils.Url.parseUrl(location.href).params.url.match('.gif') ||
                        Utils.Url.parseUrl(location.href).params.url.match('.png')
                    ){
                        return (
                            <img src={Utils.Url.parseUrl(location.href).params.url} alt=""/>
                        )

                    }else{

                        return (
                            <iframe id="iframepage" style={{width:'100%'}} onLoad={()=>{
                                var ifm= document.getElementById("iframepage");
                                ifm.height=document.documentElement.clientHeight;
                            }} frameborder="0" src={Utils.Url.parseUrl(location.href).params.url} frameborder="0"></iframe>
                        )
                    }


                })()}



            </div>
        )
    }

}

export default ProclaimList;
