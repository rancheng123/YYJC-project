/**
 * react-lazyload
 * 懒加载组的主要部分
 * 将核心组件接口暴露出去
 */
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { on, off } from './utils/event';
import scrollParent from './utils/scrollParent';
import debounce from './utils/debounce';
import throttle from './utils/throttle';
//上面引入的文件去不是依赖文件必不可少的
const defaultBoundingClientRect = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
const LISTEN_FLAG = 'data-lazyload-listened';
const listeners = [];
let pending = [];
const checkOverflowVisible = function checkOverflowVisible(component, parent) {
  const node = ReactDom.findDOMNode(component);

  let parentTop;
  let parentHeight;

  try {
    ({ top: parentTop, height: parentHeight } = parent.getBoundingClientRect());
  } catch (e) {
    ({ top: parentTop, height: parentHeight } = defaultBoundingClientRect);
  }

  const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
  const intersectionTop = Math.max(parentTop, 0);
  const intersectionHeight = Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; // height

  // check whether the element is visible in the intersection
  let top;
  let height;

  try {
    ({ top, height } = node.getBoundingClientRect());
  } catch (e) {
    ({ top, height } = defaultBoundingClientRect);
  }

  const offsetTop = top - intersectionTop; // element's top relative to intersection

  const offsets = Array.isArray(component.props.offset) ?
                component.props.offset :
                [component.props.offset, component.props.offset]; // Be compatible with previous API

  return (offsetTop - offsets[0] <= intersectionHeight) &&
         (offsetTop + height + offsets[1] >= 0);
};
  const checkNormalVisible = function checkNormalVisible(component) {
  const node = ReactDom.findDOMNode(component);

  let top;
  let elementHeight;

  try {
    ({ top, height: elementHeight } = node.getBoundingClientRect());
  } catch (e) {
    ({ top, height: elementHeight } = defaultBoundingClientRect);
  }

  const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

  const offsets = Array.isArray(component.props.offset) ?
                component.props.offset :
                [component.props.offset, component.props.offset];

  return (top - offsets[0] <= windowInnerHeight) &&
         (top + elementHeight + offsets[1] >= 0);
};
const checkVisible = function checkVisible(component) {
  const node = ReactDom.findDOMNode(component);
  if (!node) {
    return;
  }
  const parent = scrollParent(node);
  const isOverflow = component.props.overflow &&
                     parent !== node.ownerDocument &&
                     parent !== document &&
                     parent !== document.documentElement;
  const visible = isOverflow ?
                  checkOverflowVisible(component, parent) :
                  checkNormalVisible(component);

  if (visible) {
    if (!component.visible) {
      if (component.props.once) {
        pending.push(component);
      }
      component.visible = true;
      component.forceUpdate();
    }
  } else if (!(component.props.once && component.visible)) {
    component.visible = false;
    if (component.props.unmountIfInvisible) {
      component.forceUpdate();
    }
  }
};
const purgePending = function purgePending() {
  pending.forEach((component) => {
    const index = listeners.indexOf(component);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  });

  pending = [];
};
const lazyLoadHandler = () => {
  for (let i = 0; i < listeners.length; ++i) {
    const listener = listeners[i];
    checkVisible(listener);
  }
  purgePending();
};
let delayType;
let finalLazyLoadHandler = null;
class LazyLoad extends Component {
  constructor(props) {
    super(props);

    this.visible = false;
  }
  componentDidMount() {
    let needResetFinalLazyLoadHandler = false;
    if (this.props.debounce !== undefined && delayType === 'throttle') {
      console.warn('[react-lazyload] Previous delay function is `throttle`, now switching to `debounce`, try setting them unanimously');
      needResetFinalLazyLoadHandler = true;
    } else if (delayType === 'debounce' && this.props.debounce === undefined) {
      console.warn('[react-lazyload] Previous delay function is `debounce`, now switching to `throttle`, try setting them unanimously');
      needResetFinalLazyLoadHandler = true;
    }

    if (needResetFinalLazyLoadHandler) {
      off(window, 'scroll', finalLazyLoadHandler);
      off(window, 'resize', finalLazyLoadHandler);
      finalLazyLoadHandler = null;
    }

    if (!finalLazyLoadHandler) {
      if (this.props.debounce !== undefined) {
        finalLazyLoadHandler = debounce(lazyLoadHandler, typeof this.props.debounce === 'number' ?
                                                         this.props.debounce :
                                                         300);
        delayType = 'debounce';
      } else {
        finalLazyLoadHandler = throttle(lazyLoadHandler, typeof this.props.throttle === 'number' ?
                                                         this.props.throttle :
                                                         300);
        delayType = 'throttle';
      }
    }

    if (this.props.overflow) {
      const parent = scrollParent(ReactDom.findDOMNode(this));
      if (parent && typeof parent.getAttribute === 'function') {
        const listenerCount = 1 + (+parent.getAttribute(LISTEN_FLAG));
        if (listenerCount === 1) {
          parent.addEventListener('scroll', finalLazyLoadHandler);
        }
        parent.setAttribute(LISTEN_FLAG, listenerCount);
      }
    } else if (listeners.length === 0 || needResetFinalLazyLoadHandler) {
      const { scroll, resize } = this.props;

      if (scroll) {
        on(window, 'scroll', finalLazyLoadHandler);
      }

      if (resize) {
        on(window, 'resize', finalLazyLoadHandler);
      }
    }

    listeners.push(this);
    checkVisible(this);
  }

  shouldComponentUpdate() {
    return this.visible;
  }

  componentWillUnmount() {
    if (this.props.overflow) {
      const parent = scrollParent(ReactDom.findDOMNode(this));
      if (parent && typeof parent.getAttribute === 'function') {
        const listenerCount = (+parent.getAttribute(LISTEN_FLAG)) - 1;
        if (listenerCount === 0) {
          parent.removeEventListener('scroll', finalLazyLoadHandler);
          parent.removeAttribute(LISTEN_FLAG);
        } else {
          parent.setAttribute(LISTEN_FLAG, listenerCount);
        }
      }
    }

    const index = listeners.indexOf(this);
    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      off(window, 'resize', finalLazyLoadHandler);
      off(window, 'scroll', finalLazyLoadHandler);
    }
  }

  render() {
    return this.visible ?
           this.props.children :
             this.props.placeholder ?
                this.props.placeholder :
                <div style={{ height: this.props.height }} className="lazyload-placeholder" />;
  }
}

LazyLoad.propTypes = {
  once: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  overflow: PropTypes.bool,
  resize: PropTypes.bool,
  scroll: PropTypes.bool,
  children: PropTypes.node,
  throttle: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  debounce: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  placeholder: PropTypes.node,
  unmountIfInvisible: PropTypes.bool
};

LazyLoad.defaultProps = {
  once: false,
  offset: 0,
  overflow: false,
  resize: false,
  scroll: true,
  unmountIfInvisible: false
};

import decorator from './decorator';
export const lazyload = decorator;
export default LazyLoad;
export { lazyLoadHandler as forceCheck };
