/**
 * Created by 唐丹 on 2017/4/5.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

import { Toast, WhiteSpace, WingBlank, Button, List, InputItem } from 'antd-mobile';
//import Validation from 'react-validation';
import validator from 'validator';

//导入样式 start
import './verify.scss'
//导入样式 end

/*
Object.assign(Validation.rules, {
    // Key name maps the rule
    required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: value => {
            return value.toString().trim();
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    email: {
        // Example usage with external 'validator'
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            //return Toast.fail('加载失败!!!', 1);
            return <span className='form-error is-visible'>{value} 格式不正确.</span>
        }
    },
    // This example shows a way to handle common task - compare two fields for equality
    password: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
        rule: (value, components) => {
            /!*const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;*!/
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    },
    // Define API rule to show hint after API error response
    api: {
        // We don't need the rule here because we will call the 'showError' method by hand on API error
        hint: value => (
            <button
                className="form-error is-visible"
            >
                API Error on "{value}" value. Focus to hide.
            </button>
        )
    }
});

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            errors: {}
        };
    }

    onClick(event){
        event.preventDefault();

        this.setState({
            errors: this.form.validateAll()
        });
    };

    render() {
        return <Validation.components.Form ref={c => this.form = c} onSubmit={this.onSubmit}>
            <div className='row'>
                <div className='small-12 columns'>
                    <h3>Registration</h3>
                    <button className="button" onClick={this.onClick}>Show errors model (validateAll)</button>
                    <div>Errors model: {JSON.stringify(this.state.errors)}</div>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Firstname*
                        <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' name='firstname' validations={['required']}/>
                    </label>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Lastname*
                        <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='' name='lastname' validations={['required']}/>
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Email*
                        <Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value='email@email.com' name='email' validations={['required', 'email']}/>
                    </label>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        City*
                        <Validation.components.Select errorClassName='is-invalid-input' name='city' value='' validations={['required']}>
                            <option value=''>Choose your city</option>
                            <option value='1'>London</option>
                            <option value='2'>Kyiv</option>
                            <option value='3'>New York</option>
                        </Validation.components.Select>
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Password*
                        <Validation.components.Input type='password' errorClassName='is-invalid-input' containerClassName='' value='' name='password' validations={['required', 'password']}/>
                    </label>
                </div>
                <div className='small-12 medium-6 columns'>
                    <label>
                        Confirm password*
                        <Validation.components.Input type='password' errorClassName='is-invalid-input' containerClassName='' value='' name='passwordConfirm' validations={['required', 'password']}/>
                    </label>
                </div>
            </div>
            <div className='row'>
                <fieldset className='small-12 medium-6 columns'>
                    <label htmlFor='policy'>I accept policy*</label>
                    <Validation.components.Input id='policy' type='checkbox' errorClassName='is-invalid-input' name='policy' value='1' validations={['required']}/>
                </fieldset>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 columns'>
                    <Validation.components.Button className='button' errorClassName='asd'>Submit</Validation.components.Button>
                </div>
            </div>
        </Validation.components.Form>;
    }
}
*/


import { createForm } from 'rc-form';

class BasicInputExample extends Component {

    componentWillMount(){

        //在此处初始化状态
        this.state={
            focused:"false"
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <List renderHeader={() => '自定义获取光标'}>
                    <InputItem
                        type="phone"
                        {...getFieldProps('phone')}
                        clear
                        placeholder="请输入手机号"
                    >电话号码</InputItem>
                    <InputItem
                        type="password"
                        {...getFieldProps('password')}
                        clear
                        placeholder="请输入密码"

                    >密码</InputItem>

                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}

                        >
                            注册
                        </div>
                    </List.Item>
                </List>


                <List renderHeader={() => '受控 / 非受控'}>
                    <InputItem
                        {...getFieldProps('control')}
                        placeholder="Hello World"
                    >受控组件</InputItem>
                    <InputItem
                        placeholder="请输入内容"
                        data-seed="logId"
                    >非受控组件</InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '带清除按钮'}>
                    <InputItem
                        {...getFieldProps('inputclear')}
                        clear
                        placeholder="带清除按钮，输入会显示"
                    >标题</InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '标题字数'}>
                    <InputItem
                        {...getFieldProps('label8')}
                        placeholder="限制标题显示的长度"
                        labelNumber={5}
                    >标题过长超过默认的5个字</InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '标题可自定义（文字 / 图片 / 无标题）'}>
                    <InputItem
                        {...getFieldProps('input3')}
                        placeholder="无 label"
                    />
                    <InputItem
                        {...getFieldProps('inputtitle2')}
                        placeholder="标题可自定义为icon，图片或文字"
                    >
                        <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }} />
                    </InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '右侧注释可自定义'}>
                    <InputItem
                        {...getFieldProps('preice')}
                        placeholder="0.00"
                        extra="元"
                    >价格</InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '格式'}>
                    <InputItem
                        {...getFieldProps('bankCard', {
                            initialValue: '8888 8888 8888 8888',
                        })}
                        type="bankCard"
                    >银行卡</InputItem>
                    <InputItem
                        {...getFieldProps('phone')}
                        type="phone"
                        placeholder="186 1234 1234"
                    >手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="****"
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('number')}
                        type="number"
                        placeholder="点击会弹出数字键盘"
                    >数字键盘</InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '不可编辑 / 禁用'}>
                    <InputItem
                        value="不可编辑"
                        editable={false}
                    >姓名</InputItem>
                    <InputItem
                        value="这个是禁用状态的样式"
                        disabled
                    >姓名</InputItem>
                </List>
            </div>
        );
    }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);

class Verify extends Component{
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

    showToast() {
        Toast.info('这是一个 toast 提示!!!', 1);
    }

    showToastNoMask() {
        Toast.info('无 mask 的 toast !!!', 2, null, false);
    }

    successToast() {
        Toast.success('加载成功!!!', 1);
    }
    failToast() {
        Toast.fail('加载失败!!!', 1);
    }

    offline() {
        Toast.offline('网络连接失败!!!', 1);
    }

    loadingToast() {
        Toast.loading('加载中...', 1, () => {
            console.log('加载完成!!!');
        });
    }

    render(){

        return (
            <div className="verify">
                <WingBlank>
                    <WhiteSpace />
                    <Button onClick={this.showToast}>纯文字 toast</Button>
                    <WhiteSpace />
                    <Button onClick={this.showToastNoMask}>无 mask</Button>
                    <WhiteSpace />
                    <Button onClick={this.successToast}>成功 toast</Button>
                    <WhiteSpace />
                    <Button onClick={this.failToast}>失败 toast</Button>
                    <WhiteSpace />
                    <Button onClick={this.offline}>网络 toast</Button>
                    <WhiteSpace />
                    <Button onClick={this.loadingToast}>加载中 toast</Button>
                    <WhiteSpace />
                </WingBlank>
                <BasicInputExampleWrapper/>
            </div>
        )
    }

}

export default Verify;
