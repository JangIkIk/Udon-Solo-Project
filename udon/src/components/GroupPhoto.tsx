import styled from "styled-components";

const Layout = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    justify-content: center;

    .groupphoto-each{
        width: 15rem;
        img{
            width:100%;
        }
    }
`

export const GroupPhoto = ()=>{
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

