import React,{useEffect} from 'react';
import { mypageAction } from '../redux/actions/mypageAction';
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from "./TablePagination.js";

const PointStatement = () => {
  const dispatch = useDispatch();
  const getDepositAndWithdraw = () => {
    dispatch(mypageAction.getDepositAndWithdrawList(1));  //userId로 변경해야됨
  };
  const pointList = useSelector((state) => state.mypage.point);
  useEffect(() => getDepositAndWithdraw(), []);
  
  return (
    <div>PointStatement</div>
  )
}

export default PointStatement