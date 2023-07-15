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
import { editProject, fetchAllProjects } from 'src/store/action/products.action';
import { Card } from '@mui/material';
import { RHFSelect, RHFTextField, FormProvider, RHFEditor } from 'src/components/hook-form';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { editLog, fetchLogs, getLog } from 'src/store/action/logs.action';
import { fDate, fInputDate } from '../../../utils/formatTime';

type Props = {
  posts: {
    _id: number;
    name: string;
    description: string;
    status: string;
    projectId: number;
    duration: number;
    note: string;
    date: Date;
  };
};

export default function BlogPostRecent({ posts }: Props) {
  const { log } = useSelector((state: RootState) => state.logs?.log);
  console.log(log, ' ========  log =====-----=====');
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
    status?: string;
    projectId?: number;
    duration?: number;
    note?: string;
    date?: Date;
  };

  const NewBlogSchema = Yup.object().shape({
    projectId: Yup.string().required('project is required'),
    date: Yup.string().required('date is required'),
    status: Yup.string().required('date is required'),
  });

  const defaultValues = {
    status: log.status,
    projectId: log.projectId,
    duration: log.duration,
    note: log.note,
    date: fInputDate(new Date(log.date)),
  };

  const methods = useForm({
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
      dispatch(editLog(posts._id as unknown as string, data));
      push(PATH_DASHBOARD.logs.posts);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];
  const DURATION_OPTIONS = [30, 120, 240, 480, 960];

  const { projectList } = useSelector((state: RootState) => state.projects);
  console.log(projectList, 'projectList', posts);

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
          {/* @ts-ignore */}
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers={scroll === 'paper'}>
              <Stack spacing={3}>
                <RHFSelect
                  fullWidth
                  name="projectId"
                  label="project"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  {projectList &&
                    projectList.map((option: { _id: number; name: string }) => (
                      <MenuItem
                        key={option._id}
                        value={option._id}
                        sx={{
                          mx: 1,
                          my: 0.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize',
                        }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </RHFSelect>

                <RHFSelect
                  fullWidth
                  name="duration"
                  label="duration"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  {DURATION_OPTIONS.map((option: number) => (
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
                      {option} min
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFSelect
                  fullWidth
                  name="status"
                  label="status"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  {STATUS_OPTIONS.map((option: string) => (
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
                <RHFEditor simple name="note" />
                <RHFTextField name="date" type="date" />
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
