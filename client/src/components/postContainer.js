import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BtnComponent as Btn } from './BtnComponent';
import { PostThumbnail } from './postThumbnail';

import { Login } from "../modals/login";
import { Signup } from "../modals/signup";
import { BsChevronDoubleDown, BsCheckCircle, BsHeartFill, BsKeyFill, BsFillImageFill } from 'react-icons/bs';

const Container = styled.section`

`

const InnerContainer = styled.div`
  position: relative;
  /* grid-column: 2 / 12; */
  width: 100%;
  height: max-content;
`

const ThumbnailContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  justify-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  
  width: 100%;
  height: max-content;
`

const SuggetionContainer = styled.div`
  grid-column: 1/ -1;

  position: relative;
  top : 200px;

  display: grid;
  justify-items: center;

  height: 400px;

  .msg {
    text-align: center;
    margin-bottom: 200px;
    color: #aaa;
  }

  svg {
    margin-bottom: 30px;
  }

  .msg p {
    font-size: 0.9rem;

    &:nth-child(2){
      font-size: 1.2rem;
      margin-bottom: 15px;
    }
  }
  
`

const BottomContainer = styled.section`
  position: absolute;
  bottom: -400px;

  /* z-index: 1; */

  margin-top: 100px;
  display: flex;
  justify-content: center;
  
  width: 100%;
  height: 250px;

  color: #888;

  user-select: none;

  .wrapper {
    position: relative;
    top : -88px;
    text-align: center;

    font-size: 1rem;

    svg {
      margin-bottom: 20px;
    }

    .to_top {
      margin-top: 8px;
      
      font-size: 0.9rem;
      text-decoration: underline;

      cursor: pointer;
    }
  }
`

export const PostContainer = ({ reqEndpoint, category, setResult }) => {

  const loginToken = window.sessionStorage.getItem('loginToken')
  const userId = window.sessionStorage.getItem('userId')

  const navigate = useNavigate()

  const [postsData, setPostsData] = useState([])
  const [pageLevel, setPageLevel] = useState(1);
  const [postEnd, setPostEnd] = useState(false)

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false)

  const viewmore = useRef()

  useEffect(() => {
    setPostEnd(false)
    console.log(reqEndpoint, "END")
  }, [reqEndpoint])

  useEffect(() => {
    (async () => {
      if (reqEndpoint) {
        setPostsData([])
        // ????????? ?????????
        setPageLevel(1)
        // ????????? ?????? ?????????
        setIsLoading(true)
        try {
          const res = await axios.get(`${reqEndpoint}&level=1`)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setIsLoading(false)
          }
        }
        catch (err) { }
      }
    })()
  }, [reqEndpoint])

  const getPage = async (level) => {
    if (reqEndpoint) {
      setIsLoading(true)
      try {
        const res = await axios.get(`${reqEndpoint}&level=${level}`)
        if (res.status === 200 && res.data.posts.length > 0) {
          setPostsData([...postsData, ...res.data.posts])
          setIsLoading(false)
        }
        if (res.data.posts.length === 0) {
          setPostEnd(true)
        }
      }
      catch (err) {
        // console.log(err)
      }
    }
  }

  const loadMore = () => {
    setPageLevel(pageLevel + 1)
  }

  useEffect(() => {
    getPage(pageLevel)
  }, [pageLevel])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && viewmore.current) {
        viewmore.current.click()
      }
    }, { threshold: 1 })

    if (viewmore.current) {
      observer.observe(viewmore.current)
    }
    if (setResult) {
      setResult(postsData)
    }
    // ?????? ??????????????? ????????? ????????? ?????????.
  }, [postsData])

  const SuggestionMsg = () => {
    // ????????? ???????????? ?????? ??????
    if (category === "favorites" || category === "my_pics") {
      if (!loginToken && !userId) {
        return (
          <SuggetionContainer>
            <div className="msg">
              <BsKeyFill size={'3rem'} />
              <p>???????????? ???????????????!</p>
              <p>????????? ?????? ?????????????????? ???????????? ??????????????????.</p>
            </div>
            <Btn action={() => setOpenLoginModal(true)}>???????????????</Btn>
          </SuggetionContainer>
        )
      }
    }

    // ???????????? ???????????? ??????
    if (!postsData.length && category === "favorites") {
      return (
        <SuggetionContainer>
          <div className="msg">
            <BsHeartFill size={'3rem'} />
            <p>?????? ???????????? ???????????? ????????????.</p>
            <p>???????????? ?????? ???????????? ??????????????????!</p>
          </div>
          <Btn action={() => navigate('/new_pics')}>????????? ?????? ????????? ????????? ??????</Btn>
        </SuggetionContainer>
      )
    }
    if (!postsData.length && category === "my_pics") {
      return (
        <SuggetionContainer>
          <div className="msg">
            <BsFillImageFill size={'3rem'} />
            <p>?????? ????????? ????????????.</p>
            <p>???????????? ??? ????????? ?????????????????????!</p>
          </div>
          <Btn action={() => navigate('/add_post')}>??????????????? ??????</Btn>
        </SuggetionContainer>
      )
    }
    return null
  }

  const modalHandler = (modal) => {
    if (modal === "login") {
      openLoginModal ? setOpenLoginModal(false) : setOpenLoginModal(true);
    }
    if (modal === "signup") {
      openSignupModal ? setOpenSignupModal(false) : setOpenSignupModal(true);
    }
  }

  return (
    <Container>
      {openLoginModal ? <Login closeFn={() => modalHandler("login")} setOpenLoginModal={setOpenLoginModal} setOpenSignupModal={setOpenSignupModal} /> : null}
      {openSignupModal ? <Signup closeFn={() => modalHandler('signup')} /> : null}
      <InnerContainer>
        <ThumbnailContainer>
          {
            postsData
              ? postsData.map((post, idx) => {
                return <PostThumbnail key={idx} data={post} idx={idx} action={() => navigate(`/posts/${post._id}`)} />
              })
              : null
          }
          <SuggestionMsg />
        </ThumbnailContainer>
        {
          postsData.length < 12
            ? null
            : (postEnd
              ? (
                <BottomContainer>
                  <div className='wrapper'>
                    <BsCheckCircle size={'2rem'} />
                    <div>????????? ????????? ??????????????????</div>
                    <div className='to_top' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>?????? ??????</div>
                  </div>
                </BottomContainer>
              )
              : (
                <BottomContainer >
                  <div className='wrapper'>
                    <BsChevronDoubleDown size={'2rem'} />
                    <div ref={viewmore} onClick={loadMore}>?????????</div>
                  </div>
                </BottomContainer>
              ))
        }
      </InnerContainer>
    </Container >
  );
};