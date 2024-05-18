import React from 'react';
import { Box, TextField, Button, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ maxWidth: 400, width: '100%', p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcykL0ty1BEXcrB8_d607Gh3CiuAsxp5o2WfJzA3Fu&s"
            alt="Logo da Empresa"
            style={{ width: 350, height: 75, marginBottom: 20 }}
          />
          <LockOutlinedIcon sx={{ fontSize: 40, mb: 2 }} />
        </Box>
        <TextField id="name" label="Name" variant="outlined" fullWidth margin="normal" />
        <TextField id="password" label="Password" type="password" variant="outlined" fullWidth margin="normal" />
        
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            disableRipple
            sx={{
              width: '355px',
              height: '35px',
              bgcolor: '#000000',
              color: '#fff',
              '&:hover': {
                bgcolor: '#000000',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <span>LOGIN</span>
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            disableRipple
            sx={{
              width: '355px',
              height: '35px',
              bgcolor: '#000000',
              color: '#fff',
              '&:hover': {
                bgcolor: '#000000',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <span>SIGN UP</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
