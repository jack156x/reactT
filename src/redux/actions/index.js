import axios from "axios";
import "../../mock"
import { ININ_DATA, CHANGEGOODSNUM, ADD_GOODS, UPDATE_GOODS, DELETE_GOODS, CHECKGOODS } from "../actionType";

//更新数据
export const InitData = (dispatch) => {
  axios.get("api/data").then(res => {
    dispatch({ type: ININ_DATA, list: res.data.data })
  })
}
//添加商品
export function addAction (item) {
  // 返回的就是一个action对象
  return {
    type: ADD_GOODS,
    goods: item
  }
}
//更新商品
export const updateGoodsAction = (item) => (dispatch) => {
  let goodItem = {
    type: UPDATE_GOODS,
    goods: item
  }
  dispatch(goodItem)
}
//删除商品
export function deleteGoodsAction (id) {
  let deleteGoods = {
    type: DELETE_GOODS,
    id
  }
  return (dispatch) => {
    dispatch(deleteGoods)
  }
}
//选择商品
export function checkGoods (goodsId, index) {
  let checkGoods = {
    type: CHECKGOODS,
    data: goodsId
  }
  return dispatch => {
    dispatch(checkGoods)
  }
}
// 切换商品数量
export function changeGoodNum (status, goodsId, index, e) {
  // 阻止事件冒泡、浏览器默认行为
  e.preventDefault();
  e.stopPropagation();
  let data = {
    status: status,
    goodsId: goodsId
  }
  let changeGoodsNum = {
    type: CHANGEGOODSNUM,
    data: data
  }
  return dispatch => {
    dispatch(changeGoodsNum)
  }
}
// 全选
export function checkAllGoods () {
  // 阻止事件冒泡、浏览器默认行为
  let checkAllGoods = {
    type: 'checkAllGoods',
    data: this.props.checkAll
  }
  return dispatch => {
    dispatch(checkAllGoods)
  }
}