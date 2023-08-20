import styled from "styled-components";
import { BaseLayout } from "@components/AllComponent"

const Layout = styled(BaseLayout)`
    background-color:red;
    display:flex;
    flex-wrap: wrap;
    .groupphoto-each{
        width: 15rem;
        img{
            width:100%;
        }
    }
`

export const DetailPhoto = ()=>{
    return(
        <Layout>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
            <div className="groupphoto-each">
                <img src="https://lh3.googleusercontent.com/p/AF1QipPfAQqnnThRG0KOWFvQ-FLoTMZlMgNvHgKw6tvO=w1080-h608-p-no-v0"/>
            </div>
        </Layout>
    );
}

