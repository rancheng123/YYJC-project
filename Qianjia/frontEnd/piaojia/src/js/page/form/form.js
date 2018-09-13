/**
 * Created by fangyibai on 2017/4/5.
 */

import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
/* 引入input 组件 */
import Input from '../../module/input/input';


//导入样式 start
import './form.scss'
//导入样式 end



/*class Forms extends Componnent{

}
const App = () => (
    <div className="pagination-container" >
        <p className="sub-title">按钮内带文本</p>
        <Pagination total={5} current={1} locale={locale} />

        <p className="sub-title">带文本和icon</p>
        <Pagination total={5} current={1}
                    locale={{
                        prevText: (<div className="arrow-align"><Icon type="left" />上一步</div>),
                        nextText: (<div className="arrow-align">下一步<Icon type="right" /></div>),
                    }}
        />

        <p className="sub-title">隐藏数字</p>
        <Pagination simple total={5} current={1} locale={locale} />

        <p className="sub-title">只显示数字</p>
        <Pagination mode="number" total={5} current={3} />

        <p className="sub-title">点状</p>
        <Pagination mode="pointer" total={5} current={2} style={{ marginBottom: '0.32rem' }} />
    </div>
);*/

class Forms extends Component{
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
             <div>
                <Input $id="lys_input"  />
             </div>
        )
    }

}


export default Forms;
