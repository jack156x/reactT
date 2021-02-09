/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { ININ_DATA, DELETE_GOODS, CHECKALLGOODS, CHANGEGOODSNUM, CHECKGOODS } from "../actionType"
import initStore from '../store'

const Redurcer = (state = initStore, actions) => {
  switch (actions.type) {
    case ININ_DATA: //初始数据
      {
        state.list = actions.list;
        return {
          ...state,
          list: [...state.list]
        }
      }
    case CHECKGOODS:
      let checkList = state.list
      checkList.map((item, index) => {
        if (item.goodsId === actions.data) {
          item.check = !item.check
          item.number === '0' ? item.number = '1' : ''
        }
      })
      return Object.assign({}, state, { list: [...checkList] })
    // 加减数量
    case CHANGEGOODSNUM:
      let changeList = state.list
      changeList.map((item, index) => {
        if (item.id === actions.data.goodsId) {
          actions.data.status === 'add' ? item.number++ : item.number--
          item.number === '0' ? item.check = false : '' // 如果当前商品选中并且减到0，自动取消选择
        }
      })
      return Object.assign({}, state, { list: [...changeList] })
    // 全选
    case CHECKALLGOODS:
      let checkAllList = state.list
      checkAllList.map((item, index) => {
        item.check = !actions.data
      })
      return Object.assign({}, state, { list: [...checkAllList] })
    case DELETE_GOODS:
      const DELETEList = JSON.parse(JSON.stringify(state))
      const deleteIndex = DELETEList.findIndex(item => item.id === actions.id)
      DELETEList.splice(deleteIndex, 1)
      return DELETEList
    default:
      let list = state.list
      list.map((item, index) => {
        item.check = true
      })
      return Object.assign({}, state, { list: [...list] })
  }
}
export default Redurcer