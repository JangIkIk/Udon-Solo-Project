import styled from "styled-components";
import { BaseLayout} from "@components/AllComponent"

const Layout = styled(BaseLayout)`
    background-color:red;
    padding: 1rem;

    .groupnews-each{
        display:flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid black;
    }

`

export const DetailNotice = ()=>{
    return(
        <Layout>
            <div className="groupnews-each">
                <span>{"[중요]"}</span>
                <span>필독 공지사항</span>
            </div>
            <div className="groupnews-each">
                <span>{"[중요]"}</span>
                <span>단톡방 개설</span>
            </div>
        </Layout>
    );
}

