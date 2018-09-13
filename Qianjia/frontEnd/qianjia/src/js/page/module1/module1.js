import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import _ from 'underscore';
import classNames from 'classnames'

//导入样式 start
import './module1.scss'
//导入样式 end

import globalData from './data'


/* 通用组件  start */
import Picker from '../../widget/picker/picker';
import CssTransiton from '../../widget/cssTransitoin/cssTransitoin'

import { Button } from 'antd-mobile';
//缺少 验证组件
//缺少 弹窗组件

/* 通用组件  end */


class Demo extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            area: '请选择',
            data: globalData.data,
            items: ['hello', 'world', 'click', 'me']
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

    getList(ev){

        //当前元素
        ev.target


        //修改某个组件状态  start
        var compeonent = componentStore.modules['picker-test1'];
        compeonent.state.title = 'bbbbb';
        compeonent.setState(compeonent.state)
        //修改某个组件状态  end


        //循环 start
        var ordersHTML = [1,2].map(function(ele,i){
            // 必须加key
            return (
                <div key={i}>{ele.text}</div>
            )
        });
        //循环 end

        //切换路由 start
        if(0){
            //动态切换
            Utils.switchRoute('/productList')

            //静态切换
           // <Link to="/module2">toModule2</Link>
        }
        //切换路由 end


        //underscore  start
        _.isEmpty({})
        //underscore  end






        //数据通讯  start
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search1',
            method: 'get',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){


            }
        });
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search2',
            method: 'POST',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){

            }
        });
        //数据通讯  end


    }

    onYes(data){
        this.state.area = data.textArr.join(',');
        this.setState(this.state)

    }
    onChange(data){

    }

    changeData(){
        var data2 =[
            {
                label: '香港01',
                value: '01',
                children: [
                    {
                        label: '九龙01-1',
                        value: '01-1',
                        children: [
                            {
                                label: '西四01',
                                value: '01',
                            },
                            {
                                label: '西单02',
                                value: '02',
                            }
                        ]
                    },
                    {
                        label: '香港岛',
                        value: '01-2',
                    },
                    {
                        label: '大屿山',
                        value: '01-3',
                    },
                    {
                        label: '宣武区',
                        value: '01-4',
                    },
                ],
            },
            {
                label: '上海02',
                value: '02',
                children: [
                    {
                        label: '黄埔区01-1',
                        value: '01-1',
                        children: [
                            {
                                label: '西四01',
                                value: '01',
                            },
                            {
                                label: '西单02',
                                value: '02',
                            }
                        ]
                    },
                    {
                        label: '黄埔区2',
                        value: '01-2',
                    },
                    {
                        label: '黄埔区3',
                        value: '01-3',
                    },
                    {
                        label: '黄埔区4',
                        value: '01-4',
                    },
                ],
            }
        ];


        var compeonent = componentStore.modules['picker-test1'];
        compeonent.state.data = data2;
        compeonent.setState(compeonent.state,function(){

        })
    }


    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }

    render(){


        /* webpack 缓存问题 start */
        //修改字符串
        //复制粘贴
        //重复修改某个变量值


        /*console.log(123455);
        var a = 'caisujia';
        var b = 'yifenfen'
        console.log(a)
        console.log(b)*/

        /*var count = 0;
        console.log(++count)
        console.log(++count)
        console.log(++count)
        console.log(++count)
        console.log(++count)*/

        var b = 3111;
        console.log(b)

        var c = b + 1;





        /* webpack 缓存问题 end */






        var items = this.state.items.map(function(item, i) {
            return (
                <div key={item} className="red"
                     onClick={this.handleRemove.bind(this, i)}>
                    {item}
                </div>
            );
        }.bind(this));

        return (
            <div className="module1">

                <div className="webpackCacheTest webpackCacheTest3">
                    webpackCacheTest
                </div>


                <Link to="/module2">toModule2</Link>

                <div className="testCss">

                    {/*css3  start*/}
                    <div className="css3Test"></div>
                    <div className="testRem"></div>
                    {/*css3  end*/}


                    {/*img  start*/}
                    <img src={require("../../../image/ran.jpg")} className="imgTagTest" alt="22222222"/>
                    <div className="backgroundUrlTest"></div>
                    {/*img  end*/}


                    {/*字体  start*/}
                    <div className="testFonts">
                        字体测试
                        dsfdsa
                    </div>
                    <div className="testWeiruan">
                        微软雅黑
                    </div>
                    {/*字体  end*/}

                </div>



                <span onClick={this.getList.bind(this)}>
                    请求数据
                </span>

                {/*多个class名字*/}
                <span className={classNames({
                    "k_getCash": true,
                    "red11": 1
                })}
                      onClick={this.changeData}
                >提现</span>


                {/* ref */}
                <div ref="11"></div>



                <CssTransiton transitionName="example"
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}>
                    {items}
                </CssTransiton>



                <div>
                    <h3>通用组件</h3>
                    <div>
                        选择的城市：

                        {/*注意这里必须加上$id*/}
                        <Picker $id="picker-test1"
                                onYes={this.onYes.bind(this)}
                                onChange={this.onChange.bind(this)}
                                defaultValue={['02','01-1','01']}
                                title="aaaaaaa"
                                data={this.state.data}
                                cols={3}
                        >
                            <div>
                                {this.state.area}
                            </div>

                        </Picker>
                    </div>
                </div>


                <Button>xxxx</Button>
            </div>
        )
    }

}

export default Demo;
