import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

//导入样式 start
import './module2.scss'
//导入样式 end



class Module2 extends Component{
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

    toModule3(){
        Utils.switchRoute('/module3')
    }


    render(){

        return (
            <div className="module2">

                <section className="module2_head">
                    <div className="module2_address">北京</div>
                    <div className="module2_address">钱夹</div>
                    <div className="module2_address">北京</div>
                    <div onClick={this.toModule3.bind(this)}>toModule3</div>
                </section>

            </div>
        )
    }

}

export default Module2;
