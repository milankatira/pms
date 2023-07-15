import { useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Button, Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { SkeletonPostItem } from '../../../components/skeleton';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { BlogPostCard } from '../../../sections/@dashboard/blog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDashboardData, fetchProjects } from 'src/store/action/products.action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { AppAreaInstalled } from 'src/sections/@dashboard/general/app';
import { statusCounts } from 'src/utils/formatProject';

BlogPosts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function BlogPosts() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { projects, dashboardData } = useSelector((state: RootState) => state.projects);

  const { themeStretch } = useSettings();

  const project = dashboardData && dashboardData.length >= 1 && statusCounts(dashboardData);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAllDashboardData());
  }, []);

  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="project"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'project', href: PATH_DASHBOARD.blog.root },
            { name: 'project list' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.blog.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Post
              </Button>
            </NextLink>
          }
        />

        <Grid container spacing={3}>
          {projects &&
            projects.map(
              (
                post: {
                  name: string;
                  description: string;
                  createdAt: Date;
                  status: string;
                  logCount: number;
                  _id: number;
                },
                index: number
              ) =>
                post ? (
                  <Grid key={post._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                    <BlogPostCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
            )}
        </Grid>
        <br />
        <Grid item xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chartLabels={
              project &&
              project.length >= 1 &&
              project.map((i: { projectName: string }) => i.projectName)
            }
            chartData={[
              {
                year: '2019',
                data: [
                  {
                    name: 'paid',
                    data:
                      project &&
                      project.length >= 1 &&
                      project?.map((i: { statusCount: number[] }) => i?.statusCount[0]),
                  },
                  {
                    name: 'unpaid',
                    data:
                      project &&
                      project.length >= 1 &&
                      project?.map((i: { statusCount: number[] }) => i?.statusCount[1]),
                  },
                  {
                    name: 'overdue',
                    data:
                      project &&
                      project.length >= 1 &&
                      project?.map((i: { statusCount: number[] }) => i?.statusCount[2]),
                  },
                  {
                    name: 'draft',
                    data:
                      project &&
                      project.length >= 1 &&
                      project?.map((i: { statusCount: number[] }) => i?.statusCount[3]),
                  },
                ],
              },
              {
                year: '2020',
                data: [
                  { name: 'paid', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                  { name: 'unpaid', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                ],
              },
            ]}
          />
        </Grid>
      </Container>
    </Page>
  );
}
