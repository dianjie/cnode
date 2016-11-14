import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link,hashHistory} from 'react-router'
import {Tabs, List,Icon} from 'antd-mobile'
const TabPane = Tabs.TabPane;
import {dateDiff} from 'SYSTEM/tool'
import {getUserInfo,setNavBarTitle,setNavBarPoints,menuOpenChange,setLoginAccessToken,setIsLogin} from 'REDUX/action'
import {removeLocalData} from 'SYSTEM/system';
class UserHome extends Component {
    constructor(props) {
        super(props)

    }
    getUserData(loginName) {
        let {dispatch,account:{info},menu}=this.props;
        dispatch(getUserInfo(loginName));
        //修改头部标题
        dispatch(setNavBarTitle(`@${loginName}的个人中心`));
        //设置头部要素
        dispatch(setNavBarPoints({
            left:true,
            right:info.loginname==loginName,
            rightContent:()=>{return (<Icon onClick={this.logout.bind(this)} type="poweroff" />)},
            color:'',
            iconName:'left'
        }));
        if(menu.open){
            dispatch(menuOpenChange())
        }
    }
    componentWillMount(){
        let {dispatch}=this.props;
        //修改头部标题
        dispatch(setNavBarTitle('关于'));
        //设置头部要素
        dispatch(setNavBarPoints({
            left:true,
            right:false,
            color:'',
            iconName:'left'
        }));
    }
    render() {
        return (
            <div className="pt_09">
                <div className="detail_content">
                    <p className="mb_03">本项目使用react，redux等技术实现！</p>
                    <p className="mb_03"><a href="http://jjboom.net/cnode" target="_blank">线上地址</a></p>
                    <p className="mb_03">注:发帖以及回复部分暂未实现！！</p>
                </div>
            </div>
        )
    }
}
export default connect(state=>({
    account: state.account,
    menu:state.menu
}))(UserHome)

