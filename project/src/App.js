import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <a href="/">
              <Icon type="home" />
              <span>HOME</span>
              </a>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Root Of Equation</span>
                </span>
              }
            >
              <Menu.Item key="3">
              <a href="/bisections">Bisection Method.</a></Menu.Item>
              <Menu.Item key="4">
                <a href="/flaseposition">False-Position Method.</a></Menu.Item>
              <Menu.Item key="5">
              <a href="/onepoint">One-Point Iteration Method.</a>
              </Menu.Item>
              <Menu.Item key="6">
              <a href="/newton">Newton-Rapshon Method.</a>
              </Menu.Item>
              <Menu.Item key="7">
              <a href="/secant">Secant Method.</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>NUMERICAL METHOD.</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Welcom to Numerical Method.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Natthawut Chaloyard 6004062630175</Footer>
        </Layout>
      </Layout>

    );
  }
}

export default App;
