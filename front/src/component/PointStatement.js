import React,{useEffect} from 'react';
import { pointAction } from '../redux/actions/pointAction';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "./TablePagination.js";

const PointStatement = () => {
  const dispatch = useDispatch();
  const getDepositAndWithdraw = () => {
    dispatch(pointAction.getDepositAndWithdrawList(1));
  };
  const pointList = useSelector((state) => state.point.point);
  useEffect(() => getDepositAndWithdraw(), []);
  
  return (
    <div>{pointList.length>0 ? 
      <TablePagination rowsPerPageOptions={[10, 50]} pointList={pointList}></TablePagination>
    : <div></div>}
    </div>
  )
}

export default PointStatement