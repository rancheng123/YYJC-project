/**
 * Created by 唐丹 on 2017/3/20.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

//导入样式 start
import './multiMenu.scss'
//导入样式 end

const menuData = {
    className : 'multi-first-list',
    levelItem : [
        {
            title : '一级菜单-1',
            _id : 'level1-1',
            className : 'multi-second-list',
            levelItem : [
                {
                    title : '二级菜单-1',
                    _id : 'level2-1'
                },
                {
                    title : '二级菜单-2',
                    _id : 'level2-2'
                },
                {
                    title : '二级菜单-3',
                    _id : 'level2-3'
                },
                {
                    title : '二级菜单-4',
                    _id : 'level2-4'
                },
                {
                    title : '二级菜单-5',
                    _id : 'level2-5'
                }
            ]
        },
        {
            title : '一级菜单-2',
            _id : 'level1-2'
        },
        {
            title : '一级菜单-3',
            _id : 'level1-3'
        },
        {
            title : '一级菜单-4',
            _id : 'level1-4'
        },
        {
            title : '一级菜单-5',
            _id : 'level1-5'
        }
    ]
};

class MultiList extends Component{
    constructor(){
        super();

        //console.log(this);
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            subListDisplay : 'none'
        }
        console.log('1');
    }
    componentDidMount () {
        console.log('2');


    }

    showHandle(ev){
        // console.log(this);
        // console.log(this.state)
        this.setState({subListDisplay: 'block'});
    }

    render() {
        var cName = this.props.menuData.className;
        console.log( this.state.subListDisplay );
        return (
            <ul className={cName} style={{display: cName=='multi-first-list' ? 'block' : this.state.subListDisplay}}>
                {

                    this.props.menuData.levelItem.map(function (item) {

                        return (
                            <li key={item._id} onTouchStart={ this.showHandle.bind(this) }>
                                <a href="javascript:;">{item.title}</a>
                                {
                                    !item.className ? "" : <MultiList menuData={item} />
                                }
                            </li>
                        )
                    }.bind(this))
                }
            </ul>
        )
    }
}


class MultiMenu extends Component{
    constructor(){
        super();

    }
    componentWillMount(){

        //在此处初始化状态
        this.state={

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
            <div className="multi-menu-wrap multiMenu" id="multiMenu">
                <MultiList menuData={menuData} />
            </div>
        )
    }

}

export default MultiMenu;
