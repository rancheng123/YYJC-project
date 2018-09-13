import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

//导入样式 start
import './module3.scss'
//导入样式 end


class Dome extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        //在此处初始化状态
        this.state={
            dataList: [],
            imgList: []
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
        var that = this;

        return (
            <div className="module3">

                <section className="module3_head flex-father">
                    <div className="module3_address flex-child1">北京</div>
                    <div className="module3_title flex-child1" style={{color: 'red'}}>票夹</div>
                    <div className="module3_slideBtn flex-child1">
                        <span className="btn_slide"></span>
                    </div>
                </section>





            </div>
        )
    }

}

export default Dome;
