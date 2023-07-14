// @mui
import {
  Button,
  DialogActions,
  DialogProps,
  Grid,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  MenuItem,
} from '@mui/material';
// @types
import BlogPostCard from './BlogPostCard';
import Iconify from 'src/components/Iconify';
import style from './BlogPostRecent.module.scss';
import { useEffect, useRef, useState } from 'react';
// ----------------------------------------------------------------------
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch } from 'src/redux/store';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { editProject } from 'src/store/action/products.action';
import { Card } from '@mui/material';
import { RHFSelect, RHFTextField, FormProvider } from 'src/components/hook-form';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  posts: {
    name: string;
    description: string;
    createdAt: Date;
    status: string;
    logCount: number;
    _id: number;
  };
};

export default function BlogPostRecent({ posts }: Props) {
  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  type FormValuesProps = {
    name: string;
    description: string;
    status: string;
  };

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = {
    name: posts.name,
    description: posts.description,
    status: posts.status,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log('hello');
      dispatch(editProject(posts._id as unknown as string, data));
      push(PATH_DASHBOARD.blog.posts);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

  return (
    <>
      <Grid container spacing={3}>
        <Button
          className={style.edit__button}
          size="small"
          startIcon={<Iconify icon="eva:edit-fill" />}
          onClick={handleClickOpen('paper')}
        >
          Change
        </Button>
        <Grid key={posts._id} item xs={12} sm={12} md={12}>
          <BlogPostCard post={posts} />
        </Grid>

        <Dialog open={open} onClose={handleClose} scroll={scroll} fullWidth>
          <DialogTitle sx={{ pb: 2 }}>Subscribe</DialogTitle>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers={scroll === 'paper'}>
              <Stack spacing={3}>
                <RHFTextField name="name" label="Post Title" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <RHFSelect
                  fullWidth
                  name="status"
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                Subscribe
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Dialog>
      </Grid>
    </>
  );
}
