import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './contactUs.scss'
//导入样式 end
import Backbar from '../../module/backbar/backbar';



class ContactUs extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            imgUrl:Utils.Url.parseUrl(location.hash).params.imgUrl,
            data:[
                {add:'地址',text:'北京市朝阳区三里屯'},
                {add:'客服电话',text:'400-831-6608(合作勿扰)'},
                {add:'服务时间',text:'工作日9:00-18:00'},
                {add:'客服QQ号',text:'3012075246',stat:true,statText:'(验证时请提供钱夹注册时手机号码)'},
                {add:'商务合作',text:'010-57437776'},
                {add:'商务合作邮箱',text:'info@zcmnet.com'},
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
    
    render(){
        let listDate=this.state.data;
        let that=this;
        let addList=listDate.map(function(item,i){
            let stat=item.stat || false;
            let statText = item.statText || '';
            return (
                <ul key={'addList'+i}>
                    <li>
                        <div>{item.add}:</div>
                        <div>{item.text}</div>
                        <p style={{display:stat? 'block' : 'none'}}>{statText}</p>
                    </li>
                </ul>
            )
        })
        return (
            <div>
                <Backbar $id="messageCenter" title="联系我们" >
                    <div className="Invitation">
                        <img src={that.state.imgUrl} alt=""/>
                        {/*<div className="banner">
                            <img src={require('../../../image/img/telephone_bg.png')} alt=""/>
                        </div>
                        <div className="add">
                            <img src={require('../../../image/img/add_Us.png')} alt=""/>
                        </div>
                        <div className="addList">
                            {addList}
                        </div>*/}
                    </div>
                </Backbar>
            </div>
        )
    }

}

export default ContactUs;
