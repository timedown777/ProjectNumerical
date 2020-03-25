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
var fxr = [] , fxl = []

class Menubi extends Component{
    state = {
        collapsed: false,
      };
      componentDidMount() {
        fetch("/flaseposition")
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
        var n = 0
        var xm,xl = this.state.Xl , xr = this.state.Xr
        var inputy = []
        inputy['xl'] = []
        inputy['xm'] = []
        inputy['xr'] = []
        inputy['error'] = []

        inputy['xl'][n] = parseFloat(xl)
        inputy['xr'][n] = parseFloat(xr)
        inputy['error'][n] = "-"
        fxr[n] = this.funcChange(xr)
        fxl[n] = this.funcChange(xl)
        xm = ((xl * fxr[n]) - (xr * fxl[n])) / (fxr[n] - fxl[n]);
        inputy['xm'][n] = xm
        increaseFunction=(((fxr[n])* this.funcChange(xm)) < 0 ?  true : false)
        if(increaseFunction)  
        {
          xl = xm
        }
        else
        {
          xr = xm
        }

        do
        {
          inputy['xl'][n+1] = parseFloat(xl)
          inputy['xr'][n+1] = xr
          fxr[n+1] = this.funcChange(inputy['xr'][n+1])
          fxl[n+1] = this.funcChange(inputy['xl'][n+1])
          xm = ((xl * fxr[n+1]) - (xr * fxl[n+1])) / (fxr[n+1] - fxl[n+1]);
          increaseFunction=(((fxr[n+1]) * this.funcChange(xm)) < 0 ?  true : false)
          if(increaseFunction)
          {
            xl = xm
          }
          else
          {
            xr = xm
          }
          sum = this.funcError(xm,inputy['xm'][n])
          inputy['xm'][n+1] = xm
          inputy['error'][n+1] = sum
          n++;
        }while (sum > 0.000001)
        this.setState({showGrap:true,showTable:true})
        this.Graph(inputy['xl'], inputy['xr'])
        this.createTable(inputy['xl'], inputy['xr'], inputy['xm'], inputy['error']);
        console.log(xm);
        }
    else
    {
      console.log("Please Input Xl > Xr")
    }
  }

 
  funcChange = (X) => {let scope = {x : parseFloat(X)};var expr = compile(this.state.function);return expr.evaluate(scope)}
  funcError = (Xnew,Xold) => {return abs((Xnew - Xold)/Xnew)}
  createTable(xl, xr, xm, error) {
    for (var i = 0; i < xl.length; i++) {
        dataInTable.push({
            iteration: i,
            xl: xl[i],
            xr: xr[i],
            xm: xm[i],
            error: error[i],
        });
    }
}
Graph(xl, xr)
{
      data = [
      {
        type: 'scatter',  
        x: xl,   
        y: fxl,     
        marker: {         
          color: '#0000FF'
        },
        name:'XL'
      },
      {
      type: 'scatter',  
      x: xr,   
      y: fxr,     
      marker: {         
        color: '#FF0000'
      },
      name:'XR'
    }];
    
  }
      
      render(){
        {
          var fx = this.state.function
          let layout = {                     
            title: 'Flase Position',  
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
                  <Breadcrumb.Item>False-Position Method.</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <Form>
      <Form.Item name={['user', 'website']} label="Input Function" onChange={this.onChangefunction}>
        <Input placeholder={this.state.function}/>
      </Form.Item>
      <Form.Item name={['user', 'website']} label="XL"  onChange={this.onChangeVariableXl}>
        <Input placeholder={this.state.Xl}/>
      </Form.Item>
      <Form.Item name={['user', 'website']} label="XR"   onChange={this.onChangeVariableXr}>
        <Input placeholder={this.state.Xr}/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={this.onSubmit}>
          Submit
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button type="secondary" href="/flaseposition">
          Reset
          </Button>
          &nbsp; &nbsp; &nbsp;
        <Button type="dashed" onClick={this.onExample}>
          Example
          </Button>
      </Form.Item>
    </Form>
                {this.state.showTable === true ? <Card
                        title={"False-Position   Output"}
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
      title: "XL",
      dataIndex: "xl",
      key: "kxl"
  },
  {
      title: "XR",
      dataIndex: "xr",
      key: "kxr"
  },
  {
      title: "Xm",
      dataIndex: "xm",
      key: "kxm"
  },
  {
      title: "Error",
      key: "kerror",
      dataIndex: "error"
  }
];