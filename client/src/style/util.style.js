import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";

export const PageWrapper = styled.main`
    background-color: ${({ theme }) => theme.bg};
    min-height: calc(100vh - 150px);
`

export const CpLoginBg = styled.main`
	background: linear-gradient(-45deg, #121212, #23a6d5, #38bbb1, #00dbc9);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }    
`

export const StyledLoginForm = styled(Box)`
    background-color: rgba(255, 255, 255, .3);
    backdrop-filter: blur(20px);
    border-radius: 7px;
`

export const CpPageWrapper = styled.main`
    background-color: ${({ theme }) => theme.cpBg};
    min-height: calc(100vh - 58px);
    width: calc(100% - ${({ open }) => open ? '200px' : '60px'});
    transition: .3s ease;
    margin-left: auto;
`

export const CpMainPage = styled(Paper)`
    border-radius: 7px;
    padding: 2rem;
`