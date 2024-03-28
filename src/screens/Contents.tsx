import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Contents.scss'
import company from "../../images/notice/company.jpg"
import axios from 'axios'
import MainURL from "../MainURL";
import Select from 'react-select';
import { stringify } from 'querystring';


export default function Words (props:any) {

  
  interface postList {
    id : number,
    word: string,
    meaning : string
  }

  const [postList, setPostList] = useState<postList[]>([]);
  const [refresh, setRefreash]  = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/studysave/getcontents`)
    if (res) {
      let copy: any = [...res.data];
      setPostList(copy);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

  
  const registerDelete = async (ID:any) => {
    try {
      const requestDelete = axios.post(`https://www.studentsclassic.com/study/worddelete`, {
        
      });
  
      let responsestDelete = await requestDelete;
      if (responsestDelete.data) {
        setRefreash(!refresh);
        alert('삭제되었습니다.');
      } else {
        alert('삭제되지 않았습니다. 다시 시도하세요');  
      }
  
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  

  return  (
    <div className="apply">

      <div className="inner">

        {
          postList?.map((item:any, index:any)=>{
            return(
              <div className='cover'>
                <div>{item.name}</div>
                <div>{JSON.stringify(item.content)}</div>
              </div>
           )
          })
        }
        

        
      </div>
      
    

    </div>
  );
}
