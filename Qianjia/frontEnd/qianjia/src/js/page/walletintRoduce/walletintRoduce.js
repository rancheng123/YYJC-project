import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './walletintRoduce.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';



class WalletintRoduce extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            imgUrl:Utils.Url.parseUrl(location.hash).params.imgUrl,
            data:[
                {title:'关于我们',text:'钱夹APP由北京昂道网络科技有限公司开发推出，是一个全新的互联网金融信息中介平台。与上市公司世纪工场（830888）及其运营的O2O平台“哔咯”合作，创新性的打造了一套生态金融系统，并以此衍生出“短标高息”的项目模式，为投资人带来满意的实际收益。'},
                {title:'关于昂道',text:'北京昂道网络科技有限公司（简称“昂道网络”），创建于2014年1月，注册资本5000万，实缴5000万，总部位于北京。昂道网络致力于通过创新的思维、创新的手段使互联网金融打破传统业务模式的限制，发展出一种可持续的、稳健发展的新型生态金融模式，响应国家政策，助力实体经济，并为投资者带来更放心、更便捷的投资体验。'},
            ]
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
    //领取
    receive(){
        alert('抱歉已抢光！');
    }
    //邀请人
    Invitationperson(){
        alert('恭喜您,邀请成功！')
    }
    //查看更多 more
    more(){
        this.setState({more:true})
    }
    render(){
        let that=this;
        let dataList = this.state.data;
        //console.log(initList);
        let moreList = this.state.data.map(function(item,i){
            return(
                <ul key={'list'+i}>
                    <li>
                        <div></div>
                        <div>{item.title}</div>
                    </li>
                     <li>{item.text}</li>
                </ul>
            )
        });
        return (
            <div>
                <Backbar $id="messageCenter" title="钱夹介绍" >
                    <div className="introduce">
                        <img src={that.state.imgUrl} alt=""/>
                        {/*<div className="banner">
                            <img src={require('../../../image/img/money+js_bg.png')} alt=""/>
                        </div>
                        <div className="bottom">
                            <div className="activity_list">
                                {moreList}
                            </div>
                        </div>*/}
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default WalletintRoduce;
