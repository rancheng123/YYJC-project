/**
 * Created by 唐丹 on 2017/3/21.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

//导入样式 start
import './commonHead.scss'
//导入样式 end



class CommonHead extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            link:"1"
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

        return (
            <div className="commonHead">

                <div style={{
                    backgroundColor:'#ccc',
                    textAlign:'center',
                    height:'60px',
                    color:'#fff'
                }}>我是公用头</div>

            </div>
        )
    }

}

export default CommonHead;
