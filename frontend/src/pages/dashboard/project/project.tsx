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
import Loader from 'src/components/Loader/Loader';

BlogPosts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function BlogPosts() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { projects, dashboardData, loading } = useSelector((state: RootState) => state.projects);

  const { themeStretch } = useSettings();

  const project = dashboardData && dashboardData.length >= 1 && statusCounts(dashboardData);
  dashboardData &&
    dashboardData.length >= 1 &&
    console.log(statusCounts(dashboardData), 'helloo   ===========');
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
                New Project
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
                  <Grid key={post._id} item xs={12} sm={6} md={6}>
                    <BlogPostCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
            )}
        </Grid>
        <br />
        <Grid item xs={12} md={6} lg={8}>
          {project && project.length >= 1 && (
            <AppAreaInstalled
              title="Project log"
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
              ]}
            />
          )}
          {loading && <Loader />}
        </Grid>
      </Container>
    </Page>
  );
}
