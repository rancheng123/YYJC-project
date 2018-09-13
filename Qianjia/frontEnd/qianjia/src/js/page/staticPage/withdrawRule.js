/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';

import Backbar from '../../module/backbar/backbar';


//导入样式 start
import './staticPage.scss'
//导入样式 end



class WithdrawRule extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
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

            <Backbar $id="withdrawRule" title="提现规则">

                <div className="rule-wrap">

		        	<ol className="rule-list">
                        <li>1、钱夹用户在提现前需开通陕坝农商银行存管账户并绑定银行卡。</li>
                        <li>2、为保障用户资金安全，钱夹遵循同卡进出的规则，即使用快捷支付的用户，充值的本金提现时将返回到原支付银行卡。</li>
                        <li>3、大额充值请前往钱夹PC站操作，网址：</li>
                        <li>4、提现过程中产生的手续费由钱夹平台垫付。</li>
                        <li>5、禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账号的使用。</li>
                        <li>6、钱夹提取采取即时到账，提现金额均当天到账，具体到账时间以银行为准。如提现金额未及时到账或有其他问题，请联系钱夹客服：400-831-6608</li>
                        <li>7、各银行提现限额列表：</li>
					</ol>
                    <table className="rule-table">
						<tbody>
                            <tr>
    							<th>银行名称</th>
    							<th>单笔限额（元）</th>
                                <th>单日限额（元）</th>
    						</tr>
    						<tr>
    							<td>广发银行</td>
    							<td>100万元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>农业银行</td>
    							<td>5万元</td>
                                <td>50万元</td>
    						</tr>
    						<tr>
    							<td>工商银行</td>
    							<td>5万元</td>
                                <td>5万元</td>
    						</tr>
    						<tr>
    							<td>浦发银行</td>
    							<td>5万元</td>
                                <td>30万元</td>
    						</tr>
    						<tr>
    							<td>中信银行</td>
    							<td>1000元</td>
                                <td>1000元</td>
    						</tr>
    						<tr>
    							<td>平安银行</td>
    							<td>999999元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>中国银行</td>
    							<td>30万元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>建设银行</td>
    							<td>5万元</td>
                                <td>5万元</td>
    						</tr>
    						<tr>
    							<td>光大银行</td>
    							<td>100万元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>民生银行</td>
    							<td>100万元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>上海银行</td>
    							<td>50000元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>华夏银行</td>
    							<td>50000元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>兴业银行</td>
    							<td>50000元</td>
                                <td>无限额</td>
    						</tr>
    						<tr>
    							<td>交通银行</td>
    							<td>199999.99元</td>
                                <td>50万元</td>
    						</tr>
    						<tr>
    							<td>北京银行</td>
    							<td>5000元</td>
                                <td>50000元</td>
    						</tr>
    					</tbody>
                    </table>
                </div>

            </Backbar>

        )
    }

}

export default WithdrawRule;
