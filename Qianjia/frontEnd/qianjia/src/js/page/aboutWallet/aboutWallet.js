import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'
//引入backbar组件
import Backbar from '../../module/backbar/backbar';
import ListBar from '../../module/listBar/listBar';

//导入样式 start
import './aboutWallet.scss'
//导入样式 end


class AboutWallet extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        let that = this;
        this.state={
            top:[//列表bar数据
                {
                    left_src:require('../../../image/icon/icon_money+introduce.png'),
                    title: '',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/walletintRoduce',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_money+ts.png'),
                    title: '',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/WalletintCharacteristic',
                    setTetx:false
                },
                {
                    left_src:require('../../../image/icon/icon_money+lx.png'),
                    title: '',
                    right_src:require('../../../image/icon/icon_right.png'),
                    src:'/contactUs',
                    setTetx:false,
                    border:false
                }
            ],
        }
        //在此处初始化请求
         Utils.requestData({
            url: config.api +"qj/front/v1/my/about/getAboutList",
            method: 'post',
            data: {},
            callback: function(data){
                if(data.resultCode == 0){
                    console.log(data.data)
                    componentStore.update(that,{
                        top:[
                                {
                                    left_src:require('../../../image/icon/icon_money+introduce.png'),
                                    title: data.data[0].title,
                                    right_src:require('../../../image/icon/icon_right.png'),
                                    src:'/walletintRoduce?imgUrl='+data.data[0].imgUrl,
                                    setTetx:false
                                },
                                {
                                    left_src:require('../../../image/icon/icon_money+ts.png'),
                                    title: data.data[1].title,
                                    right_src:require('../../../image/icon/icon_right.png'),
                                    src:'/WalletintCharacteristic?imgUrl='+data.data[1].imgUrl,
                                    setTetx:false
                                },
                                {
                                    left_src:require('../../../image/icon/icon_money+lx.png'),
                                    title: data.data[2].title,
                                    right_src:require('../../../image/icon/icon_right.png'),
                                    src:'/contactUs?imgUrl='+data.data[2].imgUrl,
                                    setTetx:false,
                                    border:false
                                }
                        ]
                    })
                }
            }
        });
        
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
            <div>
                <Backbar $id="backbar" title={'关于钱夹'} >
                    <div className="set_content">
                        <div className="top">
                            <div className="list">
                                {this.state.top.map(function(item,i){
                                    return <ListBar $id={'set_list_top'+i} key={'set_list'+i} setText={item.setTetx} border_b={item.border} left_src={item.left_src} title={item.title} src={item.src}  right_src={item.right_src}></ListBar>
                                })}
                            </div>
                        </div>
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default AboutWallet;