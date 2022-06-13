import './style/app.scss';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';

function App() {
    return (
        <main>
            <Container>
                <img className='block mx-auto w-16' src="/image/favicon.png" alt="" />
                <Button variant='contained'> teset </Button>
                <TextField size='small' label='name' />
            </Container>
        </main>
    )
}

export default App