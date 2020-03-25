import React,{Component} from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon,Card,Row,Table } from 'antd';
import {range, compile,evaluate,simplify,parse,abs} from 'mathjs'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Form,Button,Input} from 'antd'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
const PlotlyComponent = createPlotlyComponent(Plotly)
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
var dataInTable = []
var data = []
var fxg =[]

class Menubi extends Component{
    state = {
        collapsed: false,
      };
      componentDidMount() {
        fetch("/secant")
          .then(res => res.json())
          .then(json => {
            this.setState({ items: json });
          });
        }
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
      constructor()
  {
    super();
    this.state={function:" ",Xr:0,Xl:0,X:0,showGrap:false,showTable:false,items: []}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableXr = this.onChangeVariableXr.bind(this)
    this.onChangeVariableXl = this.onChangeVariableXl.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
  }
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangeVariableXr  = (event) =>
  {
      this.setState({Xr:event.target.value})
  }
  onChangeVariableXl = (event) =>
  {
    this.setState({Xl : event.target.value})
  }
  onExample()
  {
    this.componentDidMount();
    this.setState({function: this.state.items.Function,
      Xl: this.state.items.XL,
      Xr: this.state.items.XR})
  }
  onSubmit()
  {
    if(this.state.Xl < this.state.Xr)
    {
        dataInTable=[]
        var sum = parseFloat(0.000000)
        var increaseFunction = false
        var n = 1
        var xm,xl = this.state.Xl , xr = this.state.Xr,xnew,fxr,fxl
        var inputy = []
        inputy['xl'] = []
        inputy['xnew'] = []
        inputy['xr'] = []
        inputy['xg'] = []
        inputy['error'] = []

        
        inputy['xl'][n] = parseFloat(xl)
        inputy['xr'][n] = parseFloat(xr)
        inputy['xg'][n-1] = xl
        inputy['xg'][n] = xr
        inputy['error'][n] = 1
        fxl = this.funcChange(xl)
        fxr = this.funcChange(xr)
        fxg[n-1] = fxl
        fxg[n] = fxr
        inputy['error'][n-1] = 1
      
        do
        {
          xnew = xr-((fxr*(xl-xr))/(fxl-fxr));
          inputy['xnew'][n]=xnew
          inputy['xg'][n+1]=xnew
          fxg[n+1]=this.funcChange(xnew)
          xl=xr
          xr=xnew
          fxl=this.funcChange(xl)
          fxr = this.funcChange(xr)
          inputy["xl"][n+1] = xl;
          inputy["xr"][n+1] = xr;
          sum = this.funcError(xr,xl);
          inputy["error"][n] = sum;
          n++;
        }while (sum > 0.000001)
        this.setState({showGrap:true,showTable:true})
        this.Graph(inputy['xg'])
        this.createTable(inputy['xl'], inputy['xr'],inputy['xnew'],inputy['error']);
        }
    
    else
    {
      console.log("Please Input Xl > Xr")
    }
  }

  funcChange = (X) => {let scope = {x : parseFloat(X)};var expr = compile(this.state.function);return expr.evaluate(scope)}
  funcError = (Xnew,Xold) => {return abs((Xnew - Xold)/Xnew)}
  createTable(xl, xr,xnew,error) {
    for (var i = 1; i < xnew.length; i++) {
        dataInTable.push({
            iteration: i,
            xl: xl[i],
            xr: xr[i],
            xnew : xnew[i],
            error: error[i],
        });
    }
}
Graph(xg)
{
      data = [
      {
        type: 'scatter',  
        x: xg,   
        y: fxg,     
        marker: {         
          color: '#0000FF'
        },
        name:'Xi'
      },
    ];
    
  }
      
      render(){
        {
          var fx = this.state.function
          let layout = {                     
            title: 'Bisection',  
            xaxis: {                  
              title: 'X'         
            }
          };
          let config = {
            showLink: false,
            displayModeBar: true
          };
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
                  <Breadcrumb.Item>SECANT METHOD.</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <Form>
      <Form.Item name={['user', 'website']} label="Input Function" onChange={this.onChangefunction}>
        <Input placeholder={this.state.function} />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="X0"  onChange={this.onChangeVariableXl}>
        <Input placeholder={this.state.Xl}/>
      </Form.Item>
      <Form.Item name={['user', 'website']} label="X1"   onChange={this.onChangeVariableXr}>
        <Input placeholder={this.state.Xr}/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={this.onSubmit}>
          Submit
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button type="secondary" href="/secant">
          Reset
          </Button>
          &nbsp; &nbsp; &nbsp;
        <Button type="dashed" onClick={this.onExample}>
          Example
          </Button>
      </Form.Item>
    </Form>
                {this.state.showTable === true ? <Card
                        title={"Secant Output"}
                        bordered={true}
                        style={tablestyle}
                        id="outputCard"
                    >
                        <Table columns={columns} dataSource={dataInTable} bodyStyle={body}
                        ></Table>
                    </Card>
                :'' }
                {this.state.showGrap === true ? 
  <PlotlyComponent  data={data} Layout={layout} config={config} /> : ''
    }
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Natthawut Chaloyard 6004062630175</Footer>
            </Layout>
          </Layout>



          
    
        );
          
      }
    }

}
export default Menubi;
var Textstyle = {
  textAlign:'center',
  textDecorationLine:'underline'
}
var tablestyle = 
{
  width: "100%", background: "#2196f3", color: "#2196f3", float: "inline-start", marginBlockStart: "2%"
}
var body = {
  fontWeight: "bold", fontSize: "18px", color: "white"
}
const columns = [
  {
      title: "Iteration",
      dataIndex: "iteration",
      key: "kiteration"
  },
  {
      title: "Xi-1",
      dataIndex: "xl",
      key: "kxl"
  },
  {
      title: "Xi",
      dataIndex: "xr",
      key: "kxr"
  },
  {
    title: "Xi+1",
    dataIndex: "xnew",
    key: "kxnew"
},
  {
      title: "Error",
      key: "kerror",
      dataIndex: "error"
  }
];