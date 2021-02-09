
import React from 'react'
import { connect } from "react-redux"
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { InitData, checkGoods, changeGoodNum } from '../redux/actions'
import "../mock"
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  addNum (status, goodsId, index, e) {
    this.props.changeGoodNum(status, goodsId, index, e)
  }
  // 结算
  submit = () => {
    let submitList = []
    let checkGoodsList = this.props.list.filter(item => item.check)
    // eslint-disable-next-line array-callback-return
    checkGoodsList.map((item, index) => {
      let obj = {
        goodsId: item.id,
        goodsNum: item.number
      }
      submitList.push(obj)
    })
  }
  componentDidMount () {
    this.props.InitData()
  }
  render () {
    let { list } = this.props;
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <Table striped bordered hover responsive="lg">
                <thead>
                  <tr>
                    <th>全选</th>
                    <th>商品信息</th>
                    <th>商品参数</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>金额(元)</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    list.map((item, index) => {
                      // 调用子组件 循环的也是子组件
                      return (
                        <tr key={index}>
                          <td>
                            <div className="form-group form-check">
                              <input type="checkbox" className="form-check-input" />
                            </div>
                          </td>
                          <td>{item.productName}</td>
                          <td>{item.productInfo}</td>
                          <td>¥{item.price}</td>
                          <td>
                            <div className="input-group">
                              <div className="input-group-btn">
                                <button type="button" className="btn btn-default" onClick={(e) => this.addNum('reduce', item.id, index, e)}>-</button>
                              </div>
                              <Button variant="outline-dark" block>{item.number}</Button>
                              <div className="input-group-btn">
                                <button type="button" className="btn btn-default" onClick={(e) => this.addNum('add', item.id, index, e)}>+</button>
                              </div>
                            </div>
                          </td>
                          <td>¥{item.price * item.number}</td>
                          <td><Button variant="danger">删除</Button></td>
                        </tr>
                      )
                    }
                    )
                  }
                </tbody>
              </Table>
            </Col>
            <Col>
              <div className="panel panel-success">
                <div className="panel-body">
                  <Row md={4}>
                    <Col sm={5} md={7}>
                      {this.props.checkAll}
                      <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">全选</label>
                      </div>
                    </Col>
                    <Col sm={3} md={2}>
                      <div className="btn btn-default">已选商品 <span>0</span> 件</div>
                    </Col>
                    <Col sm={2} md={2}>
                      <div className="btn btn-default">合计：<span>{this.props.price.toFixed(2)}</span></div>
                    </Col>
                    <Col sm={2} md={1}>
                      <Button variant="primary" size="lg" block onClick={() => this.submit()}>结算</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //这里的list名称必须和上面的let {list}=this.props申明的变量必须一致否者获取不到数据
  let price = state.reducers.list.reduce((total, item) => total + (item.check ? parseFloat(item.price * item.number) : 0), 0)
  return {
    list: state.reducers.list,
    goodsList: state.reducers.list,
    checkAll: state.reducers.list.filter(item => item.check).length === state.reducers.list.length, // 根据已选的商品和商品总数量进行对对，决定全选状态
    price: price
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    InitData () {
      dispatch(InitData)
    },
    checkGoods (id, index) {
      dispatch(checkGoods(id, index))
    },
    changeGoodNum (status, goodsId, index, e) {
      dispatch(changeGoodNum(status, goodsId, index, e))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
