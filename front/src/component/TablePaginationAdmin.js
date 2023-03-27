import React, {useState,useEffect}  from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Cookies } from 'react-cookie';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { adminAction } from './../redux/actions/adminAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6edff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  textAlign: "center",
  minWidth: 60,
  maxWidth:400,
}));

const TablePaginationActions = (props)=> {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const CustomPaginationActionsTable=({pointList})=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const userInfo = useSelector((state)=>state.admin.user);
  const [inputs, setInputs] = useState({
    userId:"",
    identity: "",
    password: "",
    nickname: "",
    language: 0,
    name: "",
    email: "",
    phone: "",
    academicAbility: "",
    workplace: "",
    baekjoonId: "",
    award: "",
    lectureCount:10,
    point:0,
    temperature:0,
    profileImage:"",
  });
  const [flag, setFlag] = useState(false);
  const [point, setPoint] = useState(0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pointList.length) : 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if(flag){
      calculate(userInfo);
    }
  }, [userInfo])
  

  const dispatch=useDispatch();
  const acceptTrade = (e,row) =>{
    dispatch(adminAction.updatePoints(row.tradeId));
    setPoint(row.amount);
    dispatch(adminAction.getUserInfo(row.userId));
    setFlag(true);
  }

  const cancelTrade = (e,row) => {
    dispatch(adminAction.deletePoints(row.tradeId));
  }

  const calculate = (userInfo) => {
    let temp = userInfo;
    temp.point+=parseInt(point);
    setInputs(temp);
    dispatch(adminAction.modifyUser(temp));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? pointList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : pointList
          ).map((row) => (
            <TableRow
              key={row.tradeId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.depositAndWithdrawl === 0 ? "입금" : "출금"}
              </TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right" onClick={(e)=>acceptTrade(e,row)}><Item>승인</Item></TableCell>
              <TableCell align="right" onClick={(e)=>cancelTrade(e,row)}><Item>삭제</Item></TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={pointList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
export default CustomPaginationActionsTable;
