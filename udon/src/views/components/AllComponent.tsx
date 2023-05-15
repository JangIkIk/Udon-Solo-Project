import styled, { css } from 'styled-components';


//  타입정의
type ImgBaseProps = {
    fit?: string,
}



// 색상모음
export const colors = {
    hoverColor: "#C0FFFF",
    borderColor: "gray",
    buttonCreateColor: "#1478FF",
    buttonDeleteColor: "#FF607F",
    buttonPatchColor: "#7878FF",

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
    justify-content:center;
`
export const flex_row_align_center = css`
    display:flex;
    align-items:center;
`
export const flex_row_justify_center = css`
    display:flex;
    justify-content: center;
`
export const flex_column = css`
    display:flex;
    flex-direction: column;
`
export const flex_column_all_cneter = css`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
`
export const flex_column_align_cneter = css`
    display:flex;
    flex-direction: column;
    align-items:center;
`
export const flex_column_justify_cneter = css`
    display:flex;
    flex-direction: column;
    justify-content: center;
`

export const fixedBase = css `
    background-color: white;
    position: fixed;
    transform: translate(-50%,0);
    left: 50%;
    width: 100%;
    max-width: 1080px;
    min-width: 320px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`


// 스타일 태그

export const ImgBase = styled.img<ImgBaseProps>`
    width: 100%;
    height: 100%;
    object-fit: ${ props => props.fit ?? "cover"};
`


export const SpanFlex = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`
export const SpanFlexAlign = styled.span`
    display: flex;
    align-items: center;
`

export const DivFlexAlign = styled.div`
    display:flex;
    align-items:center;
`

// 커스텀 컴포넌트

export const BaseLayout = styled.div`
    font-size: 1.2rem;
    padding:1rem;
    height: 100%;
`


