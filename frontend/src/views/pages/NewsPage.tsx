import {useEffect, useState} from "react";
import styled from "styled-components";
import { BaseLayout, ImgBase, SpanFlex, baseBorder, flex_column} from "@components/AllComponent"
import axios from "axios";

interface NewsPageType {
    id: number,
    img: string,
    title: string,
    day: string,
    time: string,
}

const Layout = styled(BaseLayout)`
    

    .news-list{
        ${baseBorder}
        border-radius: 10px;
        padding: 1rem;
        display:flex;
        gap: 20px;

        .news-list-photo{
            border-radius: 50%;
            background-color: red;
            width: 5rem;
            overflow: hidden;
        }

        .news-list-content{
            ${flex_column}
            gap: 10px;
            & > div{
                display:flex;
                gap: 7px;
                & > p{
                    color: red;
                }
            }
        }
    }
`

function NewsPage(){
    const [news, setNews] = useState<NewsPageType []>([]);

    useEffect(()=>{
        axios.get<NewsPageType []>(`${process.env.REACT_APP_API_ROOT}/news`)
        .then( res => setNews(res.data))
    },[])

    console.log(news)
    return(
        <Layout>
            <ul>
                {news.map(( item )=>{
                    return(
                        <li key={item.id} className="news-list">
                            <div className="news-list-photo">
                                <ImgBase src={item.img} alt="그룹사진"></ImgBase>
                            </div>
                            <div  className="news-list-content">
                                <p>{item.title}</p>
                                <div>
                                    <p>새로운 소식이 있어요!</p>
                                    <SpanFlex>{item.day}</SpanFlex>
                                    <SpanFlex>{item.time}</SpanFlex>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
}

export default NewsPage;