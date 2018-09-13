/**
 * Created by 唐丹 on 2017/3/21.
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';

//导入样式 start
import './indexPage.scss'
//导入样式 end

/* 通用组件  start */

import CommonHead from '../../module/commonHead/commonHead';
import { Carousel,Icon,Popover, NavBar } from 'antd-mobile';
import Lazyload from 'react-lazyload';

import DropDownMenu from '../../module/dropDownMenu/dropDownMenu';
import Verify from '../../module/verify/verify';

/* 通用组件  end */

const Item = Popover.Item;
class App extends Component {

    componentWillMount(){

        //在此处初始化状态
        this.state={
            visible: false,
            selected: '',
        }
    }
    onSelect(opt){
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange(visible){
        this.setState({
            visible,
        });
    };
    render() {
        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        return (<div>
            <NavBar iconName={false} mode="light" rightContent={
                <Popover mask
                         visible={this.state.visible}
                         overlay={[
                             (<Item key="4" value="scan" icon={<Icon type="search" size="xs" />} data-seed="logId">扫一扫</Item>),
                             (<Item key="5" value="special" icon={<Icon type="search" size="xs" />} style={{ whiteSpace: 'nowrap' }}>我的二维码</Item>),
                             (<Item key="6" value="button ct" icon={<Icon type="search" size="xs" />}>
                                 <span style={{ marginRight: 5 }}>帮助</span>
                             </Item>),
                         ]}
                         popupAlign={{
                             overflow: { adjustY: 0, adjustX: 0 },
                             offset: [offsetX, 15],
                         }}
                         onVisibleChange={this.handleVisibleChange.bind(this)}
                         onSelect={this.onSelect.bind(this)}
                >
                    <div style={{
                        height: '100%',
                        padding: '0 0.3rem',
                        marginRight: '-0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <Icon type="ellipsis" />
                    </div>
                </Popover>
            }
            >
                NavBar
            </NavBar>
        </div>);
    }
}

class IndexPage extends Component{
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

    fn1(obj){
        console.log(obj);
        obj.style.display = 'none';
    }
    render(){
        //设置轮播图片
        let settings = {
            dots: true, //是否需要
            infinite: true,
            speed: 500,
            autoplay : true
        };

        return (
            <div className="indexPage">
                <CommonHead $id="commonHead" />
                <DropDownMenu $id="dropDownMenu" />
                <span>我是首页</span>
                <App />
                <Icon type="search" size="xxs" />
                <Carousel {...settings}>
                    <div><img src={require("../../../image/advertising/demo1.jpg")} /></div>
                    <div><img src={require("../../../image/advertising/demo2.jpg")} /></div>
                    <div><img src={require("../../../image/advertising/demo3.jpg")} /></div>
                </Carousel>

                <Verify $id="verify" />

                <div className="lazyload">
                    <Lazyload height={500} offset={100}>
                        <img src="http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="http://ww4.sinaimg.cn/mw690/62aad664jw1f2nxw0p95dj20u01hc7d8.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxw134xqj20u01hcqjg.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961338160&di=97ad7e76afb0b2f2af59ac3ae38634ba&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0315%2Fdca2a26c81ebb1275bacf3bec20bddec.jpg" />
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961338160&di=53ad3e70cf2b61ede51376aa917db9d4&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0315%2Fe6cd8baf701ca2172e884d1efcb4dde0.jpg" alt=""/>
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961338160&di=53ad3e70cf2b61ede51376aa917db9d4&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0315%2Fe6cd8baf701ca2172e884d1efcb4dde0.jpg" alt=""/>
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961338160&di=89ecef73215f482d56f491a6e9b89ece&imgtype=0&src=http%3A%2F%2Fimages.ali213.net%2Fpicfile%2Fpic%2F2014%2F03%2F27%2F927_20140327175625955.jpg" alt=""/>
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961164997&di=d7121b1b9cb7df750aa579d888e47d2f&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201510%2F22%2F20151022141314_R2mCG.jpeg" alt=""/>
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961164997&di=c624a2921ec2fe7a5bdfe1eff94069b2&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F3%2F57c69ab43eba9.jpg" alt=""/>
                    </Lazyload>
                    <Lazyload height={500}>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490961164626&di=c765c8ca5dea9078fcd7583a82907485&imgtype=0&src=http%3A%2F%2Fimage96.360doc.com%2FDownloadImg%2F2016%2F05%2F0704%2F71225622_6.jpg" alt=""/>
                    </Lazyload>
                </div>


            </div>
        )
    }

}

export default IndexPage;
