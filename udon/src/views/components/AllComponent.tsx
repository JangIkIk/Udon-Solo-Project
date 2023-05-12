import styled, { css } from 'styled-components';


//  타입정의
type ImgCoverProps = {
    src: string,
    alt: string,
}



// 색상모음
export const colors = {
    hoverColor: "#C0FFFF",
    borderColor: "gray",
}

// css 기본속성
export const baseBorder = css`
    border: 1px solid ${colors.borderColor};
`

// 이벤트

export const baseHover = css`
    &:hover{
        cursor: pointer;
        background-color: ${colors.hoverColor};
    }
`

// 레이아웃 css - 가로세로기준

export const flex_row_all_cneter = css`
    display:flex;
    align-items:center;
    justify-conenter: center;
`
export const flex_row_align_center = css`
    display:flex;
    align-items:center;
`
export const flex_row_justify_center = css`
    display:flex;
    justify-contner: center;
`
export const flex_column = css`
    display:flex;
    flex-direction: column;
`
export const flex_column_all_cneter = css`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-conenter: center;
`
export const flex_column_align_cneter = css`
    display:flex;
    flex-direction: column;
    align-items:center;
`
export const flex_column_justify_cneter = css`
    display:flex;
    flex-direction: column;
    justify-conenter: center;
`



// 스타일 태그
export const ImgCover = ( {src, alt} : ImgCoverProps)=>{
    const Img = styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
    `
    return(
        <Img src={src} alt={alt}/>
    );
}


export const SpanFlex = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DivFlexAlign = styled.div`
    display:flex;
    align-items:center;
`

// 커스텀 컴포넌트

export const BaseLayout = styled.div`
    height: 100%;
`