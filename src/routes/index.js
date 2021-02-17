import {ShopOutlined,AreaChartOutlined} from '@ant-design/icons'
import Login from '../pages/visitor/Login'
import Index from '../pages/admin/dashboard/Index'
import List from '../pages/admin/products/List'
import Edit from '../pages/admin/products/Edit'
import PageNotFound from '../pages/visitor/PageNotFound'
import Register from '../pages/visitor/Register'
import FindPwd from '../pages/visitor/FindPwd'
import Notice from '../pages/admin/notices/Index'

export const mainRoutes = [{
    path: '/login',
    component: Login
},{
    path: '/register',
    component: Register
},{
    path: '/findpwd',
    component: FindPwd
},{
    path: '/404',
    component: PageNotFound
}]

export const adminRoutes = [{
    path: '/admin/dashboard',
    component: Index,
    isShow: true,
    title: '看板',
    icon: AreaChartOutlined
},{
    path: '/admin/products',
    component: List,
    exact: true,
    isShow: true,
    title: '商品管理',
    icon: ShopOutlined
},{
    path: '/admin/products/edit/:id?',
    component: Edit,
    isShow: false
},{
    path: '/admin/notices',
    component: Notice
}



]