import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import { FormProvider, RHFTextField, RHFSelect, RHFEditor } from '../../../components/hook-form';

import BlogNewPostPreview from './BlogNewPostPreview';

import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { createProject, fetchAllProjects } from 'src/store/action/products.action';
import { useSelector } from 'react-redux';
import { createLog } from 'src/store/action/logs.action';

export type FormValuesProps = {
  name: string;
  description: string;
  status: string;
};

export default function BlogNewPostForm() {
  const { push } = useRouter();
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { projectList } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, []);

  const DURATION_OPTIONS = [30, 120, 240, 480, 960];

  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    projectId: Yup.string().required('project is required'),
    date: Yup.string().required('date is required'),
    status: Yup.string().required('date is required'),
  });

  const defaultValues = {
    projectId: '',
    duration: 30,
    note: '',
    date: '',
    status: '',
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
      console.log(data, 'data');
      dispatch(createLog(data));
      push(PATH_DASHBOARD.logs.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSelect
                  fullWidth
                  name="projectId"
                  label="projectId"
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
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
              >
                Preview
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={values.name && values.description ? true : false}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
