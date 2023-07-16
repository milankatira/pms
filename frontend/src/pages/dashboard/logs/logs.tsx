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
import { BlogPostCard } from '../../../sections/@dashboard/logs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from 'src/store/action/products.action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { fetchDashboardLogs, fetchLogs } from 'src/store/action/logs.action';
import { statusLogCounts } from 'src/utils/formatProject';
import { AppAreaInstalled } from 'src/sections/@dashboard/general/app';

BlogPosts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function BlogPosts() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { logs, dashboardLogs } = useSelector((state: RootState) => state.logs);
  const projectData = dashboardLogs && statusLogCounts(dashboardLogs);
  const { themeStretch } = useSettings();

  useEffect(() => {
    dispatch(fetchLogs());
    dispatch(fetchDashboardLogs());
  }, []);

  console.log(
    projectData &&
      projectData.length >= 1 &&
      projectData?.map((i: { statusCount: number[] }) => i?.statusCount),
    ' ------  hello -----'
  );
  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="project"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'project', href: PATH_DASHBOARD.logs.root },
            { name: 'project list' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.logs.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Post
              </Button>
            </NextLink>
          }
        />

        <Grid container spacing={3}>
          {logs &&
            logs.map(
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
                    {/* @ts-ignore */}
                    <BlogPostCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
            )}
        </Grid>
        <br />

        <Grid item xs={12} md={6} lg={8}>
          {dashboardLogs && dashboardLogs.length >= 1 && (
            <AppAreaInstalled
              title="Project log"
              chartLabels={
                dashboardLogs &&
                dashboardLogs.length >= 1 &&
                dashboardLogs?.map((i: { _id: Date }) => i._id)
              }
              chartData={[
                {
                  year: '2019',
                  data: [
                    {
                      name: 'paid',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[0]),
                    },
                    {
                      name: 'unpaid',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[1]),
                    },
                    {
                      name: 'overdue',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[2]),
                    },
                    {
                      name: 'draft',
                      data:
                        projectData &&
                        projectData.length >= 1 &&
                        projectData?.map((i: { statusCount: number[] }) => i?.statusCount[3]),
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
          )}
        </Grid>
      </Container>
    </Page>
  );
}
