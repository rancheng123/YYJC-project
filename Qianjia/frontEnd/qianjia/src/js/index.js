
// tag before tokenExprex


require('../scss/base/base.scss');
require('../scss/base/common.scss');
require('../scss/font.scss');
require('../scss/base/commonModule.scss');

require('../scss/icon/icon.scss');
require('../scss/button/button.scss');




//react
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link ,browserHistory} from 'react-router';
//组件管理器
import {} from './asset/config';
import {} from './asset/componentStore';
import {} from './asset/utils';
import {} from './asset/interface';



/* 开发帮助模块  start */
const icon = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../scss/icon/icon').default)
    }, 'icon')
};
const button = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../scss/button/button').default)
    }, 'button')
};
/* 开发帮助模块  end */



/* 业务模块  start */


const login = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/login/login').default)
    },'login')
}
const forgetPassword = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/forgetPassword/forgetPassword').default)
    },'forgetPassword')
}
const regist = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/regist/regist').default)
    },'regist')
}
const inviteFriends = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/inviteFriends/inviteFriends').default)
    },'inviteFriends')
}




//首页home
const home = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/home/home').default)
    },'home')
}

/*测试  start*/
const home2 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/home2/home2').default)
    },'home2')
}
/*测试  end*/

//公告
const proclaimList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/proclaim/proclaimList').default)
    },'proclaimList')
}
//公告详情
const proclaimDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/proclaimDetail/proclaimDetail').default)
    },'proclaimDetail')
}

const investment = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/investment/investment').default)
    },'investment')
}

const cityList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/cityList/cityList').default)
    },'cityList')
}

//设置 set
const set = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/set/set').default)
    },'set')
}
//账户安全userSecurity
const userSecurity = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/userSecurity/userSecurity').default)
    },'userSecurity')
}
//地址管理 address
const address = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/address/address').default)
    },'address')
}
//关于钱夹 aboutWallet
const aboutWallet = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/aboutWallet/aboutWallet').default)
    },'aboutWallet')
}
//常见问题 problemList
const problemList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/problemList/problemList').default)
    },'problemList')
}
//常见问题详情 problemDetails
const problemDetails = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/problemDetails/problemDetails').default)
    },'problemDetails')
}
//法律与法规policyAndRuleList
const policyAndRuleList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/policyAndRuleList/policyAndRuleList').default)
    },'policyAndRuleList')
}
//法律法规详情policyAndRuleDetail
const policyAndRuleDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/policyAndRuleDetail/policyAndRuleDetail').default)
    },'policyAndRuleDetail')
}
//邀请好友invitations
const invitations = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/invitations/invitations').default)
    },'invitations')
}
//开通银行存管账户 openBank
const openBank = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/openBank/openBank').default)
    },'openBank')
}
//银行卡列表
const bankList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/bankList/bankList').default)
    },'bankList')
}
//银行卡详情 bankDetail
const bankDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/bankDetail/bankDetail').default)
    },'bankDetail')
}
//银行卡绑定bankBingding
const bankBingding = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/bankBingding/bankBingding').default)
    },'bankBingding')
}
//完善收款账户
const receivables = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/receivables/receivables').default)
    },'receivables')
}
//联系我们contactUs
const contactUs = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/contactUs/contactUs').default)
    },'contactUs')
}
//更改登录手机号modifyPhone
const modifyPhone = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/modifyPhone/modifyPhone').default)
    },'modifyPhone')
}
//修改登录密码 modifyPassword
const modifyPassword = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/modifyPassword/modifyPassword').default)
    },'modifyPassword')
}
//设置登录密码setPassword
const setPassword = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/setPassword/setPassword').default)
    },'setPassword')
}
//钱夹介绍walletintRoduce
const walletintRoduce = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/walletintRoduce/walletintRoduce').default)
    },'walletintRoduce')
}
//钱夹特色WalletintCharacteristic
const walletintCharacteristic = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/walletintCharacteristic/walletintCharacteristic').default)
    },'modifyPassword')
}
//支付密码管理paymentPasswordList
const paymentPasswordList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/paymentPasswordList/paymentPasswordList').default)
    },'paymentPasswordList')
}
//验证支付密码verifypPaymentPassword
const verifypPaymentPassword = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/verifypPaymentPassword/verifypPaymentPassword').default)
    },'verifypPaymentPassword')
}
//设置支付密码setPaymentPassword
const setPaymentPassword = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/setPaymentPassword/setPaymentPassword').default)
    },'setPaymentPassword')
}
//修改支付密码成功paymentPasswordOk
const paymentPasswordOk = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/paymentPasswordOk/paymentPasswordOk').default)
    },'paymentPasswordOk')
}
//重置支付密码 resetPaymentPassword1
const resetPaymentPassword1 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/resetPaymentPassword1/resetPaymentPassword1').default)
    },'resetPaymentPassword1')
}
//重置支付密码2 resetPaymentPassword2
const resetPaymentPassword2 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/resetPaymentPassword2/resetPaymentPassword2').default)
    },'resetPaymentPassword2')
}
//重置支付密码3 resetPaymentPassword3
const resetPaymentPassword3 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/resetPaymentPassword3/resetPaymentPassword3').default)
    },'resetPaymentPassword3')
}
//重置支付密码成功 resetPaymentPasswordOk
const resetPaymentPasswordOk = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/resetPaymentPasswordOk/resetPaymentPasswordOk').default)
    },'resetPaymentPasswordOk')
}
//投资确认 investmentConfirmation
const investmentConfirmation = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/investmentConfirmation/investmentConfirmation').default)
    },'investmentConfirmation')
}
//查看银行卡 seeBank
const seeBank = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/seeBank/seeBank').default)
    },'seeBank')
}






//我的my
const my = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/my/my').default)
    },'my')
}

//消息中心
const messageCenter = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/messageCenter/messageCenter').default)
    },'messageCenter')
}

//消息详情
const messageDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/messageDetail/messageDetail').default)
    },'messageDetail')
}

//我的投资
const myInvest = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/myInvest/myInvest').default)
    },'myInvest')
}


//我的账单
const bill = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/bill/bill').default)
    },'bill')
}

//优惠券
const coupon = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/coupon/coupon').default)
    },'coupon')
}

//优惠券说明
const couponExplain = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/couponExplain/couponExplain').default)
    },'couponExplain')
}
//我的赠品
const myGift = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/myGift/myGift').default)
    },'myGift')
}

//兑换
const exchange = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/exchange/exchange').default)
    },'exchange')
}
//收货地址管理
const reAddress = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/reAddress/reAddress').default)
    },'reAddress')
}
//确认兑换
const confirmExchange = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/confirmExchange/confirmExchange').default)
    },'confirmExchange')
}
//平台活动
const activity = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/activity/activity').default)
    },'activity')
}
//平台活动详情
const activityDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/activity/activityDetail').default)
    },'activityDetail')
}
//0元购活动
const activityRecord = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/activity/activityRecord').default)
    },'activityRecord')
}
const activityPay = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/activity/activityPay').default)
    },'activityPay')
}
//投资记录
const investRecord = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/investRecord/investRecord').default)
    },'investRecord')
}
//还款计划
const repaymentSchedule = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/repaymentSchedule/repaymentSchedule').default)
    },'repaymentSchedule')
}
//充值成功
const paySuccess = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/paySuccess/paySuccess').default)
    },'paySuccess')
}
//提现申请处理中
const withdrawing = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/withdrawing/withdrawing').default)
    },'withdrawing')
}
//提现
const withdraw = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/cash/withdraw').default)
    },'withdraw')
}
//提现规则
const withdrawRule = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/staticPage/withdrawRule').default)
    },'withdrawRule')
}
//充值
const pay = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/cash/pay').default)
    },'pay')
}
//充值规则
const payRule = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/staticPage/payRule').default)
    },'payRule')
}
//项目介绍
const projectIntroduction = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/projectIntroduction/projectIntroduction').default)
    },'projectIntroduction')
}
//支付成功 前一个提示 （新增页）
const paymentSuccessBefore = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/paymentSuccessBefore/paymentSuccessBefore').default)
    },'paymentSuccessBefore')
}
//支付成功
const paymentSuccess = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/paymentSuccess/paymentSuccess').default)
    },'paymentSuccess')
}
//支付处理中
const paymentProcessing = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/paymentProcessing/paymentProcessing').default)
    },'paymentProcessing')
}
//兑换详情
const exchangeDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/exchangeDetail/exchangeDetail').default)
    },'exchangeDetail')
}
//风控管理
const riskManage = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/riskManage/riskManage').default)
    },'riskManage')
}
//项目风控管理
const riskDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/riskManage/riskDetail').default)
    },'riskDetail')
}
//项目详情
const projectDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/projectDetail/projectDetail').default)
    },'projectDetail')
}
//测试数据专用页面interface
const interfaces = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/interfaces/interfaces').default)
    },'interfaces')
}
//自动投标
const autoBidOpen = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/autoBid/autoBidOpen').default)
    },'autoBidOpen')
}
//自动投标服务协议
const autoBidProtocol = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/autoBid/autoBidProtocol').default)
    },'autoBidProtocol')
}
//自动投标 - 确认投标 修改
const autoBidInfo = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/autoBid/autoBidInfo').default)
    },'autoBidInfo')
}
const autoBidInfoEdit = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/autoBid/autoBidInfoEdit').default)
    },'autoBidInfoEdit')
}
//自动投标列表
const autoBidList = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/autoBid/autoBidList').default)
    },'autoBidList')
}
//资金流水
const fundAccount = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/fundAccount/fundAccount').default)
    },'fundAccount')
}
//投资账单
const investBill = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/investBill/investBill').default)
    },'investBill')
}
//账单详情
const investBillDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/investBillDetail/investBillDetail').default)
    },'investBillDetail')
}
const investBillDetailZero = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/investBillDetailZero/investBillDetailZero').default)
    },'investBillDetailZero')
}
//本金消费明细
const expenseDetail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/expenseDetail/expenseDetail').default)
    },'expenseDetail')
}
//消费详情
const consumptionInfo = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/consumptionInfo/consumptionInfo').default)
    },'consumptionInfo')
}
//本金消费说明
const principal = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/principal/principal').default)
    },'principal')
}

/* 业务模块  end */




//来源于big
if(Utils.Url.parseUrl(location.href).params.from == 'big' && Utils.Url.parseUrl(location.href).params.token){

    Utils.Storage.set('user',{
        token: Utils.Url.parseUrl(location.href).params.token
    })
    Utils.requestData({
        url: config.api +"qj/front/v1/user/getUserInfo",
        method: 'post',
        data: {},
        callback: function(data){
            if(data.resultCode == 0){

                var userInfo = data.data;
                //设置过期时间
                userInfo.expire_custom = 1000 * 60 * 60 *24;
                Utils.Storage.set('user',userInfo);

                renderRoute()
            }
        }
    });
}else{
    renderRoute()
}

//非big


function renderRoute(){
    render((
        <div>
            <Router history={browserHistory}>


                {/*业务模块路由  start */}
                <Route title="钱夹" path="/" getComponent={home}></Route>
                <Route title="登录" path="/login" getComponent={login}></Route>
                <Route title="找回密码" path="/forgetPassword" getComponent={forgetPassword}></Route>
                <Route title="注册" path="/regist" getComponent={regist}></Route>
                <Route title="邀请好友" path="/inviteFriends" getComponent={inviteFriends}></Route>
                <Route title="钱夹" path="/home" getComponent={home}></Route>

                {/*测试  start*/}
                <Route title="钱夹" path="/home2" getComponent={home2}></Route>
                {/*测试  end*/}

                <Route title="选择城市" path="/cityList" getComponent={cityList}></Route>
                <Route title="公告" path="/proclaimList" getComponent={proclaimList}></Route>
                <Route title="公告" path="/proclaimDetail" getComponent={proclaimDetail}></Route>
                <Route title="投资" path="/investment" getComponent={investment}></Route>
                <Route title="设置" path="/set" getComponent={set}></Route>
                <Route title="账户安全" path="/userSecurity" getComponent={userSecurity}></Route>
                <Route title="收货地址管理" path="/address" getComponent={address}></Route>
                <Route title="关于钱夹" path="/aboutWallet" getComponent={aboutWallet}></Route>
                <Route title="常见问题" path="/problemList" getComponent={problemList}></Route>
                <Route title="政策与法规" path="/policyAndRuleList" getComponent={policyAndRuleList}></Route>
                <Route title="法律与法规详情" path="/policyAndRuleDetail" getComponent={policyAndRuleDetail}></Route>
                <Route title="邀请好友" path="/invitations" getComponent={invitations}></Route>
                <Route title="问题详情" path="/problemDetails" getComponent={problemDetails}></Route>
                <Route title="更改登录手机号" path="/modifyPhone" getComponent={modifyPhone}></Route>
                <Route title="开通银行存管账户" path="/openBank" getComponent={openBank}></Route>
                <Route title="支持银行卡列表" path="/bankList" getComponent={bankList}></Route>
                <Route title="银行卡详情" path="/bankDetail" getComponent={bankDetail}></Route>
                <Route title="银行卡绑定" path="/bankBingding" getComponent={bankBingding}></Route>
                <Route title="完善收款账户" path="/receivables" getComponent={receivables}></Route>
                <Route title="设置登录密码" path="/setPassword" getComponent={setPassword}></Route>
                <Route title="修改登录密码" path="/modifyPassword" getComponent={modifyPassword}></Route>
                <Route title="钱夹介绍" path="/walletintRoduce" getComponent={walletintRoduce}></Route>
                <Route title="钱夹特色" path="/walletintCharacteristic" getComponent={walletintCharacteristic}></Route>
                <Route title="重置支付密码" path="/resetPaymentPassword1" getComponent={resetPaymentPassword1}></Route>
                <Route title="重置支付密码" path="/resetPaymentPassword2" getComponent={resetPaymentPassword2}></Route>
                <Route title="重置支付密码" path="/resetPaymentPassword3" getComponent={resetPaymentPassword3}></Route>
                <Route title="重置支付密码成功" path="/resetPaymentPasswordOk" getComponent={resetPaymentPasswordOk}></Route>
                <Route title="支付密码管理" path="/paymentPasswordList" getComponent={paymentPasswordList}></Route>
                <Route title="修改支付密码成功" path="/paymentPasswordOk" getComponent={paymentPasswordOk}></Route>
                <Route title="修改支付密码" path="/setPaymentPassword" getComponent={setPaymentPassword}></Route>
                <Route title="验证支付密码" path="/verifypPaymentPassword" getComponent={verifypPaymentPassword}></Route>
                <Route title="投资确认" path="/investmentConfirmation" getComponent={investmentConfirmation}></Route>
                <Route title="联系我们" path="/contactUs" getComponent={contactUs}></Route>
                <Route title="查看银行卡" path="/seeBank" getComponent={seeBank}></Route>
                
                <Route title="我的" path="/my" getComponent={my}></Route>
                <Route title="消息中心" path="/messageCenter" getComponent={messageCenter}></Route>
                <Route title="消息详情" path="/messageDetail" getComponent={messageDetail}></Route>
                <Route title="我的投资" path="/myInvest" getComponent={myInvest}></Route>
                <Route title="投资记录" path="/investRecord" getComponent={investRecord}></Route>
                <Route title="账单详情" path="/bill" getComponent={bill}></Route>
                <Route title="我的优惠券" path="/coupon" getComponent={coupon}></Route>
                <Route title="说明" path="/couponExplain" getComponent={couponExplain}></Route>
                <Route title="我的赠品" path="/myGift" getComponent={myGift}></Route>
                <Route title="兑换成功" path="/exchange" getComponent={exchange}></Route>
                <Route title="收货地址管理" path="/reAddress" getComponent={reAddress}></Route>
                <Route title="确认兑换" path="/confirmExchange" getComponent={confirmExchange}></Route>
                <Route title="兑换详情" path="/exchangeDetail" getComponent={exchangeDetail}></Route>
                <Route title="平台活动" path="/activity" getComponent={activity}></Route>
                <Route title="平台活动详情" path="/activityDetail" getComponent={activityDetail}></Route>
                <Route title="0元购活动" path="/activityRecord" getComponent={activityRecord}></Route>
                <Route title="0元购活动" path="/activityPay" getComponent={activityPay}></Route>
                <Route title="还款计划" path="/repaymentSchedule" getComponent={repaymentSchedule}></Route>
                <Route title="充值" path="/paySuccess" getComponent={paySuccess}></Route>
                <Route title="充值" path="/pay" getComponent={pay}></Route>
                <Route title="充值规则" path="/payRule" getComponent={payRule}></Route>
                <Route title="提现" path="/withdrawing" getComponent={withdrawing}></Route>
                <Route title="提现" path="/withdraw" getComponent={withdraw}></Route>
                <Route title="提现规则" path="/withdrawRule" getComponent={withdrawRule}></Route>
                <Route title="项目介绍" path="/projectIntroduction" getComponent={projectIntroduction}></Route>
                <Route title="支付成功" path="/paymentSuccessBefore" getComponent={paymentSuccessBefore}></Route>
                <Route title="支付成功" path="/paymentSuccess" getComponent={paymentSuccess}></Route>
                <Route title="" path="/paymentProcessing" getComponent={paymentProcessing}></Route>
                <Route title="风控管理" path="/riskManage" getComponent={riskManage}></Route>
                <Route title="项目风控管理" path="/riskDetail" getComponent={riskDetail}></Route>
                <Route title="项目详情" path="/projectDetail" getComponent={projectDetail}></Route>
                {/*测试接口专用页面 */}
                <Route title="测试接口专用页面" path="/interfaces" getComponent={interfaces}></Route>
                {/*业务模块路由  end */}

                <Route title="自动投标" path="/autoBidOpen" getComponent={autoBidOpen}></Route>
                <Route title="自动投标服务协议" path="/autoBidProtocol" getComponent={autoBidProtocol}></Route>
                <Route title="自动投标" path="/autoBidInfo" getComponent={autoBidInfo}></Route>
                <Route title="自动投标" path="/autoBidInfoEdit" getComponent={autoBidInfoEdit}></Route>
                <Route title="自动投标" path="/autoBidList" getComponent={autoBidList}></Route>
                <Route title="资金流水" path="/fundAccount" getComponent={fundAccount}></Route>
                <Route title="投资账单" path="/investBill" getComponent={investBill}></Route>
                <Route title="账单详情" path="/investBillDetail" getComponent={investBillDetail}></Route>
                <Route title="账单详情" path="/investBillDetailZero" getComponent={investBillDetailZero}></Route>
                <Route title="本金消费明细" path="/expenseDetail" getComponent={expenseDetail}></Route>
                <Route title="消费详情" path="/consumptionInfo" getComponent={consumptionInfo}></Route>
                <Route title="本金消费说明" path="/principal" getComponent={principal}></Route>

                {/*开发帮助模块路由  start */}
                <Route title="icon" path="/icon" getComponent={icon}></Route>
                <Route title="button" path="/button" getComponent={button}></Route>

                {/*开发帮助模块路由  end */}

            </Router>
        </div>

    ), document.getElementById('app'));
}
