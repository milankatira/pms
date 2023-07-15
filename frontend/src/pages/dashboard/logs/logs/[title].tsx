import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from '../../../../utils/axios';
// layouts
import Layout from '../../../../layouts';
// @types
import { Post } from '../../../../@types/blog';
// components
import Page from '../../../../components/Page';
import Markdown from '../../../../components/Markdown';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../../sections/@dashboard/logs';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { useSelector } from 'react-redux';
import { fetchAllProjects, getProject } from 'src/store/action/products.action';
import { useDispatch } from 'react-redux';
import { getLog } from 'src/store/action/logs.action';

// ----------------------------------------------------------------------

BlogPost.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogPost() {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { log } = useSelector((state: RootState) => state.logs);
  useEffect(() => {
    dispatch(getLog(title as unknown as string));

    return () => {
      dispatch(getLog(title as unknown as string));
    };
  }, []);

  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { title } = query;

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, []);
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
        {log && <BlogPostRecent posts={log.log} />}
      </Container>
    </Page>
  );
}
