// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
// sections
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';
import Loader from 'src/components/Loader/Loader';

// ----------------------------------------------------------------------

BlogNewPost.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();
  const { loading } = useSelector((state: RootState) => state.projects);
  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' },
          ]}
        />

        <BlogNewPostForm />
        {loading && <Loader />}
      </Container>
    </Page>
  );
}
