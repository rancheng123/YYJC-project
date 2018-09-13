/**
 * Created by 李永帅 on 2017/3/21.
 */
//导入样式 start

import './input.scss'
//导入样式 end

import React,{Component, propTypes } from "react" ;

import {Router , Route, Link , hashHistory} from "react-router";
class Input extends Component{
    constructor(){
        super();
    };
    componentWillMount(){
        this.state={
            stErr:'none',
            stNull:"none",
            password:'none',
            passNull:'none',
            passLength:'none',
            rule:'none',
            pasSucs:false,
            useSucs:false
        }
    };
    componentDidMount(){
        // 存储 start
        componentStore.set(this);
        // 存储 end
        /*this.handFocus();*/
    };
    componentWillUnmount(){
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    };
    handBlur(){
        let phone= this.refs.phone.value;
        let reg=new RegExp(/^0?1[3|4|5|7|8][0-9]\d{8}$/);
        let phones=phone.length;

        let tel=phone.match(reg)
       if(phone==''){
            this.setState({stNull:"block"})
           this.setState({useSucs:false})
        }else{
           if(phones!=11){
               this.setState({stErr:"block"});
               this.setState({useSucs:false})
           }else if(tel){
               /*console.log("通过");*/
               this.setState({stErr:"none"})
               this.setState({useSucs:true})
           }else{
               /*console.log("失败")*/
               this.setState({stErr:"block"})
               this.setState({useSucs:false})
           }
       };
    };
    handPass(){
        let patrn=new RegExp(/^(\w){6,20}$/);

        let pass=this.refs.password.value;
        let pw=pass.match(patrn );

        console.log("pw:"+pw)
        if(pass==""){
            this.setState({password:"block"})
            this.setState({pasSucs:false})
        }else{
            if(pass.length<6 || pass.length>20){
                this.setState({passLength:"block"})
                this.setState({pasSucs:false})
            }else{
                if(pw===null){
                    this.setState({rule:'block'})
                    this.setState({pasSucs:false})
                }else{
                    this.setState({pasSucs:true})
                }
            }
        }
    };
    handFocus(){
        this.setState({stErr:"none"})
        this.setState({stNull:"none"})
    };
    handPassFocus(){
        this.setState({passLength:"none"})
        this.setState({password:"none"})
        this.setState({rule:"none"})
    };
    btnClick(){
        if(this.state.useSucs && this.state.pasSucs){
            alert("提交成功！")
        }else{
            alert('请检查账号与密码')
        }
    }
    render(){
        return(
            <div>
                <div className="input">
                    <div>
                        <span>手机号：</span><input type="number" onBlur={this.handBlur.bind(this)} onFocus={this.handFocus.bind(this)}  ref="phone" placeholder="请输入用户名" />
                        <p className="user" style={{display:this.state.stErr}}>*请输入正确的手机号</p>
                        <p className="user" style={{display:this.state.stNull}}>手机号不能为空，请重新输入</p>
                    </div>

                    <div>
                        <span>密码：</span><input type="password" onFocus={this.handPassFocus.bind(this)} onBlur={this.handPass.bind(this)} ref="password" placeholder="请输入密码" />
                        <p className="pass" style={{display:this.state.password}}>*密码不能为空请重新输入</p>
                        <p className="pass" style={{display:this.state.passLength}}>*请输入6-20位密码</p>
                        <p className="pass" style={{display:this.state.rule}}>*密码必须有字母或数字、下划线组成的6-20位</p>
                    </div>
                    <div><div className="divBtn" onClick={this.btnClick.bind(this)} >立即登录</div></div>
                </div>
            </div>
        )
    }
}
export default Input;