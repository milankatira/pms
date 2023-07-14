// @mui
import { LoadingButton } from '@mui/lab';
import { alpha } from '@mui/material/styles';
import { Box, Button, Container, Typography, DialogActions } from '@mui/material';
// components
import Image from '../../../components/Image';
import Scrollbar from '../../../components/Scrollbar';
import { DialogAnimate } from '../../../components/animate';
//
import { FormValuesProps } from './BlogNewPostForm';

// ----------------------------------------------------------------------

type Props = {
  values: FormValuesProps;
  isOpen: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

export default function BlogNewPostPreview({
  values,
  isValid,
  isSubmitting,
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const { name, description } = values;

  return (
    <DialogAnimate fullScreen open={isOpen} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Preview Post
        </Typography>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Post
        </LoadingButton>
      </DialogActions>
      (
      <Scrollbar>
        <Container>
          <Box sx={{ mt: 5, mb: 10 }}>
            <Typography variant="h6" sx={{ mb: 5 }}>
              {name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 5 }}>
              {description}
            </Typography>
          </Box>
        </Container>
      </Scrollbar>
      )
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type PreviewHeroProps = {
  title: string;
  cover?: string;
};

function PreviewHero({ title, cover }: PreviewHeroProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          pt: { xs: 3, lg: 10 },
        }}
      >
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Container>

      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8,
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        }}
      />
      <Image alt="cover" src={cover} ratio="16/9" />
    </Box>
  );
}
