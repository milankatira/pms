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
import { fetchProjects } from 'src/store/action/products.action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';


BlogPosts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};


export default function BlogPosts() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { projects } = useSelector((state: RootState) => state.projects);

  const { themeStretch } = useSettings();

  useEffect(() => {
    dispatch(fetchProjects());
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
      </Container>
    </Page>
  );
}
