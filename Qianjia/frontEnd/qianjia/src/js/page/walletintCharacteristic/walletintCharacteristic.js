import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './walletintCharacteristic.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';



class WalletintCharacteristic extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            imgUrl:Utils.Url.parseUrl(location.hash).params.imgUrl,
            data:[
                {title:'短标高息',text:'钱夹打破固有网贷模式，打造了一套创新性的生态金融系统，有效连接投资者、消费者、商家及上市公司运营的O2O平台，形成一套完整的资金闭环，投资人通过钱夹APP将资金出借给商家，使得商家获得充裕的流动资金；由O2O平台“哔咯”为商家提供营销服务及部分商品代销，获得低于市场平均价格的商品，实现商品快速销售、资金快速回笼、获得利润的目的；资金回笼后，由世纪工场还本付息，投资人获得本金和收益。由于商品质优价低，商品的销售周期被极大缩短，因此投资人出借给商家的本金可以快速回款，投资的收益也可以相对提高，“短标高息”由此而来。'},
                {title:'上市公司还本付息',text:'投资人出借资金后，全部标的均由世纪工场(股票代码:830888)承担还本付息责任。'},
                {title:'立足商圈助力实体经济',text:'钱夹APP发布的借款标的经由平台的风控团队严格审核，借款方全部为城市商圈真实实体商户，经营状况、店长信息、商品质量等等经过严格把关，信息真实可查。'},
                {title:'商业模式受法律保护',text:'钱夹创立的这套商业模式，经由公司高管层、世纪工场董事会、哔咯高管层，以及国内一流的律师团队和贷款业务风控团队共同研究开发，由第三方支付平台提供支持，其业务模式完全符合法律规定，“钱夹”严守信息中介本质，不碰触投资人资金，不设资金池，交易全程公开透明。'},
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
        let dataList = this.state.data;
        let that=this;
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
                <Backbar $id="messageCenter" title="钱夹特色" >
                    <div className="Invitation">
                        <img src={that.state.imgUrl} alt=""/>
                        {/*<div className="banner">
                            <img src={require('../../../image/img/money+ts_bg.png')} alt=""/>
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

export default WalletintCharacteristic;
