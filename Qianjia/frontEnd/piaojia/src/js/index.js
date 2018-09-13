/* eruda start*/
var isUseEruda = location.href.match(/debug=true/);
if( isUseEruda ){
    const eruda = require('eruda');
    var el = document.createElement('div');
    document.body.appendChild(el);
    eruda.init({
        container: el,
        tool: ['console', 'elements']
    });
}
/* eruda end*/
require('../scss/base/base.scss');
require('../scss/base/common.scss');
require('../scss/font.scss');

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

/* 开发帮助模块  start */
const input = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./module/input/input').default)
    }, 'input')
};
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
const forms = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/form/form').default)
    },'forms')
}
/* 开发帮助模块  end */



/* 业务模块  start */

const module3 = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./page/module3/module3').default)
    }, 'module3')
}

/* 业务模块  end */






render((
    <div>
        <Router history={browserHistory}>


            {/*业务模块路由  start */}

            <Route title="module3" path="/module3" getComponent={module3}></Route>
            {/*业务模块路由  end */}


            {/*开发帮助模块路由  start */}
            <Route title="icon" path="/icon" getComponent={icon}></Route>
            <Route title="button" path="/button" getComponent={button}></Route>
            <Route title="input" path="/input" getComponent={input}></Route>
            <Route title="forms" path="/forms" getComponent={forms}></Route>
            {/*开发帮助模块路由  end */}

        </Router>
    </div>

), document.getElementById('app'));



