// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';
import { useEffect } from 'react';
import { fetchDashboardLogs, fetchDashboardTotalDurationAndLogCount } from 'src/store/action/logs.action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'src/store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { convertToHoursAndMinutes } from 'src/utils/formatMinutes';
import { statusLogCounts } from 'src/utils/formatProject';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {

  const theme = useTheme();

  const { themeStretch } = useSettings();
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const { logCount, totalDuration, logAnalysis, dashboardLogs } = useSelector(
    (state: RootState) => state.logs
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const projectData = dashboardLogs && statusLogCounts(dashboardLogs);
  console.log(logCount, totalDuration, logAnalysis, 'numberOfLogs,totalDuration');
  useEffect(() => {
    dispatch(fetchDashboardLogs());
    dispatch(fetchDashboardTotalDurationAndLogCount());
  }, []);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Welcome back! \n ${user?.user?.email?.split('@')[0]}`}
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={convertToHoursAndMinutes(totalDuration)}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppWidgetSummary
              title="Total Installed"
              percent={0.2}
              total={logCount}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Current Download"
              chartColors={[
                theme.palette.primary.lighter,
                theme.palette.primary.light,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
              chartData={[
                {
                  label: 'paid',
                  value:
                    logAnalysis?.find(
                      (item: { status: { status: string } }) => item.status.status === 'paid'
                    )?.totalLogs || 0,
                },
                {
                  label: 'overdue',
                  value:
                    logAnalysis?.find(
                      (item: { status: { status: string } }) => item.status.status === 'overdue'
                    )?.totalLogs || 0,
                },
                {
                  label: 'unpaid',
                  value:
                    logAnalysis?.find(
                      (item: { status: { status: string } }) => item.status.status === 'unpaid'
                    )?.totalLogs || 0,
                },
                {
                  label: 'draft',
                  value:
                    logAnalysis?.find(
                      (item: { status: { status: string } }) => item.status.status === 'draft'
                    )?.totalLogs || 0,
                },
              ]}
            />
          </Grid>

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

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Paid"
                total={convertToHoursAndMinutes(
                  logAnalysis?.find(
                    (item: { status: { status: string } }) => item.status.status === 'paid'
                  )?.totalDuration
                )}
                icon={'eva:person-fill'}
                chartData={48}
              />
              <AppWidget
                title="Overdue"
                total={convertToHoursAndMinutes(
                  logAnalysis?.find(
                    (item: { status: { status: string } }) => item.status.status === 'overdue'
                  )?.totalDuration
                )}
                icon={'eva:email-fill'}
                color="warning"
                chartData={75}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
