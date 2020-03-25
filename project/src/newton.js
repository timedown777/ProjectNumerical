import React,{Component} from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon,Card,Row,Table } from 'antd';
import {range, compile,evaluate,simplify,parse,abs,derivative} from 'mathjs'
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
var fx = [] 

class Menubi extends Component{
    state = {
        collapsed: false,
      };
      componentDidMount() {
        fetch("/newton")
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
    this.state={function:" ",X:0,X0 : 0,showGrap:false,showTable:false,items: []}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableX0 = this.onChangeVariableX0.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
  }
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangeVariableX0 = (event) =>
  {
    this.setState({X0 : event.target.value})
  }
  onExample()
  {
    this.componentDidMount();
    this.setState({function: this.state.items.Function,
      X0: this.state.items.X0,})
  }
  onSubmit()
  {
        dataInTable=[]
        var sum = parseFloat(0.000000)
        var n = 0
        var xold,X0 = this.state.X0 ,xnew,xdif
        var inputy = []
        inputy['X1'] = []
        inputy['X2'] = []
        inputy['error'] = []

        inputy['X1'][n] = parseFloat(X0)
        inputy['error'][n] = "-"
        fx[n] = this.funcChange(X0)
        xold = X0-(this.funcChange(X0)/this.funcDiff(X0))
        inputy['X2'][n] = xold
        do
        {
          inputy['X1'][n+1] = xold
          fx[n+1] = this.funcChange(xold)
          xnew = (xold)-(this.funcChange(xold)/this.funcDiff(xold))
          inputy['X2'][n+1] = xnew
          sum = this.funcError(xnew,xold)
          xold = xnew
          inputy['error'][n+1] = sum
          n++;
        }while (sum > 0.000001)
        this.setState({showGrap:true,showTable:true})
        this.Graph(inputy['X1'])
        this.createTable(inputy['X1'],inputy['X2'], inputy['error']);
      
  }

  funcChange = (X) => {let scope = {x : parseFloat(X)};var expr = compile(this.state.function);return expr.evaluate(scope)}
  funcDiff = (X) => {let scope = {x : parseFloat(X)};var expr = derivative(this.state.function,'x');return expr.evaluate(scope)}
  funcError = (Xnew,Xold) => {return abs((Xnew - Xold)/Xnew)}
  createTable(X1,X2,error) {
    for (var i = 0; i < error.length; i++) {
        dataInTable.push({
            iteration: i,
            x: X1[i],
            x1:X2[i],
            error: error[i],
        });
    }
}
Graph(X1)
{
      data = [
      {
        type: 'scatter',  
        x: X1,   
        y: fx,     
        marker: {         
          color: '#00FFFF'
        },
        name:'X'
      }
     ];
    
  }
      
      render(){
        {
          var fx = this.state.function
          let layout = {                     
            title: 'One-Point',  
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
                  <Breadcrumb.Item>Newton-Rapson Method.</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <Form>
      <Form.Item name={['user', 'website']} label="Input Function" onChange={this.onChangefunction}>
        <Input placeholder={this.state.function} />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="X0"  onChange={this.onChangeVariableX0}>
        <Input placeholder={this.state.X0}/>
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
                        title={"Newton Output"}
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
  width: "80%", background: "#2196f3", color: "#2196f3", float: "inline-start", marginBlockStart: "2%"
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
      title: "Xi",
      dataIndex: "x",
      key: "kx"
  },
  {
    title: "Xi+1",
    dataIndex: "x1",
    key: "kx"
},
  {
      title: "Error",
      key: "kerror",
      dataIndex: "error"
  }
];