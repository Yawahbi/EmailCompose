import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Input, Portal, Button, Divider, Backdrop, IconButton, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import { FaPaperclip, FaTrashAlt, FaTimes, FaCompress, FaExpandAlt } from "react-icons/fa";
import Editor from '../components/Editor';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 1999,
  minHeight: 440,
  outline: 'none',
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  flexDirection: 'column',
  margin: theme.spacing(1),
  boxShadow: theme.customShadows.z20,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.paper,
}));

const InputStyle = styled(Input)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderBottom: `solid 1px ${theme.palette.divider}`,
}));

//-------------------------------------------------------------

const InitialeValues = {
  firstname: '',
  lastname: '',
  business_email: '',
  email: '',
  subject: '',
  message: '',
  files: ''
}

export default function MailCompose({ isOpenCompose, onCloseCompose }) {
  const [fullScreen, setFullScreen] = useState(false);
  const [values, setValues] = useState(InitialeValues);

  const isDesktop = useResponsive('up', 'sm');


  // handle Message (Rich text)
  const handleChangeMessage = (message) => {
    console.log(message)
    setValues({ ...values, message: message });
  };
  // handle Inputs (nom, prenom ,.....)
  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });

  };

  // handle Pieces Joints
  const handleChangeFiles = (e) => {
    setValues({ ...values, files: e.target.files });

  };

  const handleExitFullScreen = () => {
    setFullScreen(false);
  };

  const handleEnterFullScreen = () => {
    setFullScreen(true);
  };

  // handle Fermer
  const handleClose = () => {
    onCloseCompose();
    setFullScreen(false);
  };

  // handle Supprimer
  const handleReset = () => {
    setValues(InitialeValues);
    onCloseCompose();
    setFullScreen(false);
  };

  // handle Envoyer
  const handleSubmit = () => {


    // Ajouter signature
    const signature = `<p>${values.firstname} ${values.lastname},</p><p>${values.business_email}</p>`;
    const data = { ...values, message: values.message.concat(signature) }

    console.log(data)

    // send values to backend
    // ......
  };


  if (!isOpenCompose) {
    return null;
  }

  return (
    <Portal>
      <Backdrop open={fullScreen || !isDesktop} sx={{ zIndex: 1998 }} />
      <RootStyle
        sx={{
          ...(fullScreen && {
            top: 0,
            left: 0,
            zIndex: 1999,
            margin: 'auto',
            width: {
              xs: `calc(100% - 24px)`,
              md: `calc(100% - 80px)`,
            },
            height: 'fit-content'
          }),
        }}
      >

        {/* Header */}
        <Box sx={{ pl: 3, pr: 1, height: 60, display: 'flex', alignItems: 'center' }} >
          <Typography variant="h4" color='GrayText'>Contacter</Typography>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={fullScreen ? handleExitFullScreen : handleEnterFullScreen}>
            {fullScreen ? <FaCompress size={20} /> : <FaExpandAlt size={20} />}
          </IconButton>

          <IconButton onClick={handleClose}>
            <FaTimes size={20} />
          </IconButton>
        </Box>

        <Divider />

        {/* Inputs */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
          <InputStyle disableUnderline placeholder="Nom"
            name='firstname'
            value={values.firstname}
            onChange={handleChangeInput}
          />
          <InputStyle disableUnderline placeholder="Prénom"
            name='lastname'
            value={values.lastname}
            onChange={handleChangeInput}
            sx={{ ml: 1 }} />
        </Box>

        <InputStyle disableUnderline placeholder="Votre email"
          type='email'
          name='business_email'
          value={values.business_email}
          onChange={handleChangeInput}
        />
        <InputStyle disableUnderline placeholder="Envoyer à"
          type='email'
          name='email'
          value={values.email}
          onChange={handleChangeInput}
        />

        <InputStyle disableUnderline placeholder="Sujet"
          name='subject'
          value={values.subject}
          onChange={handleChangeInput}
        />

        {/* Message */}
        <Editor
          name="message"
          value={values.message}
          onChange={handleChangeMessage}
          signature={values}
        />

        <Divider />

        {/* Footer */}
        <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Button
            startIcon={<FaTrashAlt />}
            component="span"
            sx={{ p: 1, justifySelf: 'start' }}
            onClick={handleReset}
          />

          <div>
            <label htmlFor='files'>
              <Input accept="*" id='files' name='files' type="file" onChange={handleChangeFiles} style={{ display: 'none' }} inputProps={{ multiple: true }} />
              <Button
                startIcon={<FaPaperclip />}
                component="span"
                sx={{ p: 1, mr: 1 }}
              />
            </label>
            <Button variant="contained" onClick={handleSubmit}>Envoyer</Button>
          </div>

        </Box>
      </RootStyle>
    </Portal >
  );
}
