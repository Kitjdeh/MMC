import React from 'react'
import { useDispatch } from 'react-redux';
import { adminAction } from './../redux/actions/adminAction';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useSelector } from 'react-redux';
import TablePagination from "../component/TablePaginationAdmin";

const Admin = () => {
 const dispatch=useDispatch();
 useEffect(() => {dispatch(adminAction.getPoints())}, [])

 const pointList = useSelector((state) => state.admin.points);
  return (
    <div>
    <div>미처리 입출금 리스트</div>
    <div>{pointList.length>0 ? 
        <TablePagination rowsPerPageOptions={[10, 50]} pointList={pointList}></TablePagination>
      : <div></div>}
    </div>
    </div>
  )
}

export default Admin