import { useState } from 'react';

import MailCompose from './MailCompose';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';


const RootStyle = styled('div')(({ theme }) => ({
    height: '100vh',
    backgroundColor: 'gray',
}));

export default function Profile() {
    const [openCompose, setOpenCompose] = useState(false);
    const [item, SetItem] = useState({ email: 'zakaria@gmail.com' })

    return (
        <RootStyle>
            <Button
                variant="contained"
                color='secondary'
                onClick={() => setOpenCompose(true)}
                disabled={!(item?.email)}
            >Contacter</Button>
            <MailCompose isOpenCompose={openCompose} onCloseCompose={() => setOpenCompose(false)} />
        </RootStyle>
    );
}


