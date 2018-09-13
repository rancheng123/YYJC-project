/**
 * Created by 唐丹 on 2017/6/1.
 */
import React, { Component, PropTypes } from 'react';

import Backbar from '../../module/backbar/backbar';


//导入样式 start
import './staticPage.scss'
//导入样式 end



class PayRule extends Component{
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

            <Backbar $id="myInvest" title="充值规则">

                <div className="rule-wrap">

		        	<ol className="rule-list">
                        <li>1、钱夹用户在充值前需开通陕坝农商银行存管账户并绑定银行卡。</li>
                        <li>2、钱夹手机APP目前仅支持快捷充值。</li>
                        <li>3、每个账户只可绑定一张银行卡，作为充值/提现卡使用。</li>
                        <li>4、充值过程产生的手续费由钱夹平台垫付。</li>
                        <li>5、禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账号的使用。</li>
                        <li>6、快捷充值支持银行及限额：</li>
					</ol>
					<table className="rule-table">
						<tbody>
                            <tr>
    							<th>银行名称</th>
    							<th>单笔限额</th>
                                <th>单日限额</th>
    							<th>备注</th>
    						</tr>
    						<tr>
    							<td>广发银行</td>
    							<td>50万元</td>
                                <td>无限额</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>农业银行</td>
    							<td>5万元</td>
                                <td>10万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>工商银行</td>
    							<td>5万元</td>
                                <td>5万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>浦发银行</td>
    							<td>5万元</td>
                                <td>10万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>中信银行</td>
    							<td>1000元</td>
                                <td>1000元</td>
    							<td>单月2000元</td>
    						</tr>
    						<tr>
    							<td>平安银行</td>
    							<td>50万元</td>
                                <td>500万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>中国银行</td>
    							<td>5万元</td>
                                <td>50万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>建设银行</td>
    							<td>5万元</td>
                                <td>5万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>光大银行</td>
    							<td>50万元</td>
                                <td>无限额</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>民生银行</td>
    							<td>50万元</td>
                                <td>无限额</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>上海银行</td>
    							<td>5000元</td>
                                <td>5万元</td>
    							<td>需开通银联在线支付</td>
    						</tr>
    						<tr>
    							<td>华夏银行</td>
    							<td>5万元</td>
                                <td>10万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>兴业银行</td>
    							<td>5万元</td>
                                <td>5万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>交通银行</td>
    							<td>5万元</td>
                                <td>5万元</td>
    							<td></td>
    						</tr>
    						<tr>
    							<td>北京银行</td>
    							<td>5000元</td>
                                <td>5000元</td>
    							<td>需开通银联在线支付</td>
    						</tr>
    					</tbody>
                    </table>
                </div>

            </Backbar>

        )
    }

}

export default PayRule;
