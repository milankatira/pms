import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { BlogPostRecent } from '../../../../sections/@dashboard/blog';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { getProject } from 'src/store/action/products.action';

// ----------------------------------------------------------------------

BlogPost.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogPost() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { project } = useSelector((state: RootState) => state.projects);
  useEffect(() => {
    dispatch(getProject(title as unknown as string));
    return () => {
      dispatch(getProject(title as unknown as string));
    };
  }, []);

  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { title } = query;

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title as string) },
          ]}
        />
        {project && <BlogPostRecent posts={project} />}
      </Container>
    </Page>
  );
}
