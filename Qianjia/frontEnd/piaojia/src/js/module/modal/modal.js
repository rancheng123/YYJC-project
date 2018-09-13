/**
 * Created by 李永帅 on 2017/3/21.
 */
//导入样式 start

import './modal.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;
import Button from '../../../scss/button/button'

import {Router , Route, Link , hashHistory} from "react-router";
class Modal extends Component{
    constructor(){
        super();
    };
    componentWillMount(){
        this.state={
            newBtnSt:true
        }
        console.log("11111newBtnSt:",this.state.newBtnSt)
    };
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
    nextTouch(){
        alert('正在跳转中....')
    }
    closeModal(){
        this.setState({
            newBtnSt:false
        })
    }
    render(){
      console.log("newBtnSt2222："+this.state.newBtnSt);
       var defaultState;
        let newBtnSt=this.props.btnSt;//true/false
        if(newBtnSt==true){
            defaultState="block"
        }else{
            defaultState="none"
        }
        if(this.state.newBtnSt==false){
            defaultState="none"
        }
        var st=this.props.st;
        let safe=this.props.safe;
        let safeImg;
        if(st==1){
            return(
                <div>
                    <div className="backMotail" style={{display:defaultState}}></div>
                    <div className="modal_2" style={{display:defaultState}}>
                        <div className="img_2"><img src={require('../../../image/motail2.png')} alt=""/></div>
                        {/*<div className="m-title_2">11111</div>*/}
                        <div className="m-content_2">您已获得邀请人</div>
                        <div className="m-content_2">133*****893赠予的"加息1%</div>
                        <div className="m-content_2">特权",投资即享！</div>
                        <div className="m-foot_2">
                            <div className="btn_2"><Button $id="btn_2" lysBtn={this.state.lysBtn} click={this.closeModal.bind(this)}  bkg="#fb3640" radius="10px" width="80%" height="40px" lineH="40px" content="确定" color="#fff"></Button></div>

                        </div>
                    </div>
                </div>
            )
        }else if(st==2){
            if(safe==1){
                safeImg=require('../../../image/safe.png');
            }else if(safe==2){
                safeImg=require('../../../image/safe2.png');
            }else{
                alert("请配置safe的值：1或2");
            }
            return(
                <div>
                    <div className="backMotail" style={{display:defaultState}}></div>
                    <div className="modal" style={{display:defaultState}}>
                        <div className="img"><img src={safeImg} alt=""/></div>
                        <div className="m-title">{this.props.title}</div>
                        <div className="m-content">{this.props.text}</div>
                        <div className="m-foot">
                            <div className="btnA"><Button $id="btnA" click={this.closeModal.bind(this)}  radius="30px" width="120px" height="50px" lineH="50px" content={this.props.leftBtn} bkg="#fff" border="1px solid red" color="#fb3640"></Button></div>
                            <div className="btnB"><Button $id="btnB"    click={this.nextTouch} radius="30px" width="120px" height="50px" lineH="50px" content={this.props.rightBtn} bkg="#fb3640"></Button></div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
export default Modal;