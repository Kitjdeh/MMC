  // const authcookie = getCookieToken();
  const store = useStore();
  // console.log(store.getState());
  // const authenticated = store.getState().authToken.isLogin;
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const getUserInfo = () => {
    console.log('1', authenticated)
    setAuthenticated(cookie.get("userId") !== undefined ? true : false);
    if (authenticated) {
      console.log('2', authenticated,"dispatch직전",userInfo)
      dispatch(userinfoAction.getUserInfo(userId));
    }
  }
  useEffect(() => {
    console.log('3', "getUseInfo직전")
    getUserInfo()
  }, [store.getState().authToken.isLogin])
  const userInfo = useSelector((state) => state.userinfo.userinfo);
  const userId = cookie.get("userId");
  console.log('4', "navbar렌더링", authenticated)
  console.log('5', userId, "navbar렌더링", userInfo, cookie.get("userId"))
 